-- Execute this migration once in the Supabase SQL Editor before enabling the WhatsApp webhook.
alter table public.chat_conversations
  add column if not exists channel text not null default 'website',
  add column if not exists visitor_phone text;

alter table public.chat_conversations
  drop constraint if exists chat_conversations_channel_check;
alter table public.chat_conversations
  add constraint chat_conversations_channel_check check (channel in ('website', 'whatsapp'));

alter table public.chat_messages
  add column if not exists external_message_id text;

create unique index if not exists chat_messages_external_message_id_uidx
  on public.chat_messages(external_message_id)
  where external_message_id is not null;

create index if not exists chat_conversations_channel_phone_status_idx
  on public.chat_conversations(channel, visitor_phone, status, updated_at desc);
