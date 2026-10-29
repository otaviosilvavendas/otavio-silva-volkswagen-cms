-- Execute once in the Supabase SQL Editor to enable the CompreVolks live chat.
create table if not exists public.chat_conversations (
  id uuid primary key,
  visitor_name text not null default 'Visitante do site',
  status text not null default 'open' check (status in ('open','closed')),
  last_message text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.chat_messages (
  id bigint generated always as identity primary key,
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  sender text not null check (sender in ('visitor','admin')),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index if not exists chat_conversations_updated_at_idx on public.chat_conversations(updated_at desc);
create index if not exists chat_messages_conversation_created_idx on public.chat_messages(conversation_id, created_at);
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;
-- All chat reads/writes go through the server API using the service-role key.
-- Do not create public/anon policies for these tables.
