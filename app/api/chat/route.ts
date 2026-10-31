import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminPassword = process.env.CHAT_ADMIN_PASSWORD;

async function db(path: string, init: RequestInit = {}) {
  if (!base || !serviceKey) throw new Error('O chat ainda não está conectado ao banco de dados.');
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
  if (!response.ok) throw new Error(`Falha no banco de dados (${response.status}): ${raw.slice(0, 300)}`);
  return raw ? JSON.parse(raw) : null;
}
function clean(value: unknown, max = 2000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}
function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
function adminOk(request: NextRequest) {
  return Boolean(adminPassword && request.headers.get('x-chat-admin-password') === adminPassword);
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = clean(body.action, 30);
    if (action === 'start') {
      const id = clean(body.conversationId, 50);
      if (!isUuid(id)) return NextResponse.json({ error: 'Identificador de conversa inválido.' }, { status: 400 });
      const existing = await db(`chat_conversations?id=eq.${id}&select=id`);
      if (!existing.length) await db('chat_conversations', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ id, visitor_name: clean(body.name, 100) || 'Visitante do site', status: 'open' }) });
      return NextResponse.json({ success: true });
    }
    if (action === 'send') {
      const conversationId = clean(body.conversationId, 50);
      const message = clean(body.message, 2000);
      if (!isUuid(conversationId) || !message) return NextResponse.json({ error: 'Escreva uma mensagem para enviar.' }, { status: 400 });
      const found = await db(`chat_conversations?id=eq.${conversationId}&select=id,status`);
      if (!found.length || found[0].status !== 'open') return NextResponse.json({ error: 'Esta conversa não está disponível.' }, { status: 404 });
      await db('chat_messages', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ conversation_id: conversationId, sender: 'visitor', message }) });
      await db(`chat_conversations?id=eq.${conversationId}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ last_message: message, updated_at: new Date().toISOString() }) });
      return NextResponse.json({ success: true });
    }
    if (action === 'messages') {
      const conversationId = clean(body.conversationId, 50);
      if (!isUuid(conversationId)) return NextResponse.json({ error: 'Conversa inválida.' }, { status: 400 });
      const rows = await db(`chat_messages?conversation_id=eq.${conversationId}&select=id,sender,message,created_at&order=created_at.asc&limit=300`);
      return NextResponse.json({ messages: rows });
    }
    if (action === 'whatsapp-diagnostic') {
      if (!adminOk(request)) return NextResponse.json({ error: 'Senha de atendimento inválida.' }, { status: 401 });
      const token = process.env.WHATSAPP_ACCESS_TOKEN;
      const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
      const version = process.env.WHATSAPP_GRAPH_API_VERSION || 'v26.0';
      if (!token || !phoneId) {
        return NextResponse.json({
          ok: false,
          tokenConfigured: Boolean(token),
          phoneNumberIdConfigured: Boolean(phoneId),
          error: 'Falta WHATSAPP_ACCESS_TOKEN ou WHATSAPP_PHONE_NUMBER_ID nas variáveis de produção.'
        }, { status: 503 });
      }
      const url = new URL(`https://graph.facebook.com/${version}/${encodeURIComponent(phoneId)}`);
      url.searchParams.set('fields', 'id,is_on_biz_app,platform_type');
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        return NextResponse.json({
          ok: false,
          tokenConfigured: true,
          phoneNumberIdConfigured: true,
          httpStatus: response.status,
          errorCode: result?.error?.code ?? null,
          errorSubcode: result?.error?.error_subcode ?? null,
          error: result?.error?.message || 'A Meta recusou a consulta. Verifique validade e permissões do token.'
        }, { status: 502 });
      }
      return NextResponse.json({
        ok: true,
        tokenConfigured: true,
        phoneNumberIdConfigured: true,
        phoneNumberId: result?.id || phoneId,
        isOnBizApp: result?.is_on_biz_app ?? null,
        platformType: result?.platform_type ?? null,
        coexistence: result?.is_on_biz_app === true && result?.platform_type === 'CLOUD_API'
          ? 'confirmed'
          : result?.is_on_biz_app === false
            ? 'not_enabled'
            : 'inconclusive'
      });
    }
    if (action === 'admin-list') {
      if (!adminOk(request)) return NextResponse.json({ error: 'Senha de atendimento inválida.' }, { status: 401 });
      const rows = await db('chat_conversations?select=id,visitor_name,visitor_phone,channel,status,last_message,created_at,updated_at&order=updated_at.desc&limit=100');
      return NextResponse.json({ conversations: rows });
    }
    if (action === 'admin-messages') {
      if (!adminOk(request)) return NextResponse.json({ error: 'Senha de atendimento inválida.' }, { status: 401 });
      const conversationId = clean(body.conversationId, 50);
      if (!isUuid(conversationId)) return NextResponse.json({ error: 'Conversa inválida.' }, { status: 400 });
      const rows = await db(`chat_messages?conversation_id=eq.${conversationId}&select=id,sender,message,created_at&order=created_at.asc&limit=300`);
      return NextResponse.json({ messages: rows });
    }
    if (action === 'reply') {
      if (!adminOk(request)) return NextResponse.json({ error: 'Senha de atendimento inválida.' }, { status: 401 });
      const conversationId = clean(body.conversationId, 50);
      const message = clean(body.message, 2000);
      if (!isUuid(conversationId) || !message) return NextResponse.json({ error: 'Escreva uma resposta.' }, { status: 400 });
      const info = await db(`chat_conversations?id=eq.${conversationId}&select=channel,visitor_phone,status`);
      const conv = info?.[0];
      if (!conv || conv.status !== 'open') return NextResponse.json({ error: 'Esta conversa não está disponível.' }, { status: 404 });
      let externalId: string | null = null;
      if (conv.channel === 'whatsapp') {
        const token = process.env.WHATSAPP_ACCESS_TOKEN;
        const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        const version = process.env.WHATSAPP_GRAPH_API_VERSION || 'v26.0';
        const to = String(conv.visitor_phone || '').replace(/[^0-9]/g, '');
        if (!token || !phoneId || !to) return NextResponse.json({ error: 'Integração WhatsApp incompleta nas variáveis privadas da Vercel.' }, { status: 503 });
        const sent = await fetch('https://graph.facebook.com/' + version + '/' + phoneId + '/messages', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
          body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body: message } }),
          cache: 'no-store'
        });
        const result = await sent.json().catch(() => ({}));
        if (!sent.ok) return NextResponse.json({ error: result?.error?.message || 'A Meta não aceitou o envio pelo WhatsApp.' }, { status: 502 });
        externalId = result?.messages?.[0]?.id || null;
      }
      await db('chat_messages', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ conversation_id: conversationId, sender: 'admin', message, external_message_id: externalId }) });
      await db(`chat_conversations?id=eq.${conversationId}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ last_message: message, updated_at: new Date().toISOString() }) });
      return NextResponse.json({ success: true });
    }
    if (action === 'close') {
      if (!adminOk(request)) return NextResponse.json({ error: 'Senha de atendimento inválida.' }, { status: 401 });
      const conversationId = clean(body.conversationId, 50);
      if (!isUuid(conversationId)) return NextResponse.json({ error: 'Conversa inválida.' }, { status: 400 });
      await db(`chat_conversations?id=eq.${conversationId}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: 'closed', updated_at: new Date().toISOString() }) });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Ação não reconhecida.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Erro ao processar o chat.' }, { status: 500 });
  }
}
