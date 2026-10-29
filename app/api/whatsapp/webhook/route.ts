import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function db(path: string, init: RequestInit = {}) {
  if (!base || !serviceKey) throw new Error('Banco de dados não configurado.');
  const response = await fetch(`${base}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });
  const raw = await response.text();
  if (!response.ok) throw new Error(`Falha no banco de dados (${response.status}): ${raw.slice(0, 250)}`);
  return raw ? JSON.parse(raw) : null;
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function GET(request: NextRequest) {
  const token = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  if (!token) return new NextResponse('Webhook não configurado.', { status: 503 });
  const mode = request.nextUrl.searchParams.get('hub.mode');
  const suppliedToken = request.nextUrl.searchParams.get('hub.verify_token');
  const challenge = request.nextUrl.searchParams.get('hub.challenge');
  if (mode === 'subscribe' && suppliedToken && safeEqual(suppliedToken, token) && challenge) {
    return new NextResponse(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
  return new NextResponse('Verificação inválida.', { status: 403 });
}

function messageText(message: any): string {
  if (message?.type === 'text') return String(message.text?.body || '').trim();
  if (message?.type === 'button') return String(message.button?.text || 'Resposta por botão').trim();
  if (message?.type === 'interactive') {
    return String(message.interactive?.button_reply?.title || message.interactive?.list_reply?.title || 'Resposta interativa').trim();
  }
  if (message?.type === 'location') {
    const loc = message.location;
    return loc ? `Localização recebida: ${loc.latitude}, ${loc.longitude}` : 'Localização recebida';
  }
  return `O cliente enviou uma mensagem do tipo ${String(message?.type || 'desconhecido')}.`;
}

export async function POST(request: NextRequest) {
  try {
    const appSecret = process.env.META_APP_SECRET;
    if (!appSecret) return NextResponse.json({ error: 'META_APP_SECRET não configurado.' }, { status: 503 });
    const rawBody = await request.text();
    const signature = request.headers.get('x-hub-signature-256') || '';
    const expected = `sha256=${createHmac('sha256', appSecret).update(rawBody).digest('hex')}`;
    if (!signature || !safeEqual(signature, expected)) {
      return NextResponse.json({ error: 'Assinatura do webhook inválida.' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    if (payload?.object !== 'whatsapp_business_account') return NextResponse.json({ received: true });

    for (const entry of payload.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value || {};
        for (const message of value.messages || []) {
          const phone = String(message.from || '').replace(/\D/g, '');
          const text = messageText(message).slice(0, 2000);
          if (!phone || !text) continue;
          const contact = (value.contacts || []).find((c: any) => String(c.wa_id || '').replace(/\D/g, '') === phone);
          const name = String(contact?.profile?.name || phone).trim().slice(0, 100);
          const existing = await db(
            `chat_conversations?channel=eq.whatsapp&visitor_phone=eq.${encodeURIComponent(phone)}&status=eq.open&select=id&order=updated_at.desc&limit=1`
          );
          let conversationId = existing?.[0]?.id;
          if (!conversationId) {
            conversationId = crypto.randomUUID();
            await db('chat_conversations', {
              method: 'POST',
              headers: { Prefer: 'return=minimal' },
              body: JSON.stringify({
                id: conversationId,
                visitor_name: name,
                visitor_phone: phone,
                channel: 'whatsapp',
                status: 'open',
                last_message: text,
              }),
            });
          }
          const externalId = String(message.id || '').slice(0, 200);
          await db('chat_messages', {
            method: 'POST',
            headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
            body: JSON.stringify({
              conversation_id: conversationId,
              sender: 'visitor',
              message: text,
              external_message_id: externalId || null,
            }),
          });
          await db(`chat_conversations?id=eq.${conversationId}`, {
            method: 'PATCH',
            headers: { Prefer: 'return=minimal' },
            body: JSON.stringify({ visitor_name: name, visitor_phone: phone, last_message: text, updated_at: new Date().toISOString() }),
          });
        }
      }
    }
    return NextResponse.json({ received: true });
  } catch {
    // Return a retryable status so Meta can redeliver events if processing fails.
    return NextResponse.json({ error: 'Não foi possível processar o evento do WhatsApp.' }, { status: 500 });
  }
}
