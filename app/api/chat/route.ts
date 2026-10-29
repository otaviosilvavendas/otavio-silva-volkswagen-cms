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
      await db('chat_messages', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ conversation_id: conversationId, sender: 'admin', message }) });
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
