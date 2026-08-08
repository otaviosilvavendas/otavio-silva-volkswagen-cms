-- 1) Execute this in Supabase SQL Editor.
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text not null default '',
  intro text not null default '',
  price text not null default '',
  availability text not null default '',
  hero_image text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  features jsonb not null default '[]'::jsonb,
  specs jsonb not null default '[]'::jsonb,
  featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vehicles enable row level security;

drop policy if exists "Public can read vehicles" on public.vehicles;
create policy "Public can read vehicles" on public.vehicles for select to anon, authenticated using (true);

drop policy if exists "Authenticated can insert vehicles" on public.vehicles;
create policy "Authenticated can insert vehicles" on public.vehicles for insert to authenticated with check (true);

drop policy if exists "Authenticated can update vehicles" on public.vehicles;
create policy "Authenticated can update vehicles" on public.vehicles for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated can delete vehicles" on public.vehicles;
create policy "Authenticated can delete vehicles" on public.vehicles for delete to authenticated using (true);

insert into public.vehicles (slug,title,subtitle,intro,features,specs,featured)
values
('tiguan','Nova Tiguan','Tecnologia, espaço e performance para ir além.','A nova Tiguan combina presença, sofisticação e tecnologia em um SUV desenvolvido para quem espera mais.','[{"title":"4Motion","description":"Tração integral para mais confiança em diferentes condições."},{"title":"350 TSI","description":"Performance e resposta para uma condução envolvente."},{"title":"15 polegadas","description":"Multimídia ampla e conectada."},{"title":"Assistência","description":"Tecnologias que ajudam a tornar cada viagem mais confortável."}]','[{"label":"Motor","value":"2.0 350 TSI"},{"label":"Potência","value":"272 cv"},{"label":"Transmissão","value":"Automática de 8 velocidades"},{"label":"Tração","value":"4Motion"}]',true),
('taos','Taos','Mais espaço para viver cada momento.','Um SUV equilibrado para quem valoriza espaço, conforto, tecnologia e a experiência Volkswagen.','[{"title":"Espaço interno","description":"Conforto para passageiros e versatilidade para a rotina."},{"title":"Tecnologia","description":"Conectividade e recursos pensados para facilitar seu dia."},{"title":"Conforto","description":"Uma cabine desenvolvida para viagens mais agradáveis."},{"title":"Design","description":"Linhas marcantes e presença de SUV."}]','[{"label":"Categoria","value":"SUV"},{"label":"Motorização","value":"Turbo"},{"label":"Transmissão","value":"Automática"},{"label":"Capacidade","value":"5 ocupantes"}]',true),
('t-cross','T-Cross','Compacto por fora. Completo por dentro.','O SUV Volkswagen que combina versatilidade, segurança, tecnologia e praticidade para a cidade.','[{"title":"Versatilidade","description":"Dimensões que facilitam a rotina sem abrir mão do espaço."},{"title":"Segurança","description":"Recursos de assistência e proteção para seus trajetos."},{"title":"Tecnologia","description":"Conectividade para deixar tudo mais simples."},{"title":"Design","description":"Personalidade forte e assinatura Volkswagen."}]','[{"label":"Categoria","value":"SUV compacto"},{"label":"Motorização","value":"Turbo"},{"label":"Transmissão","value":"Automática"},{"label":"Ocupantes","value":"5"}]',true),
('nivus','Nivus','Design que chama atenção. Tecnologia que acompanha.','Um crossover Volkswagen com visual marcante, conectividade e uma condução que combina com a cidade.','[{"title":"Design fastback","description":"Silhueta esportiva e identidade marcante."},{"title":"Tecnologia","description":"Recursos digitais para uma experiência conectada."},{"title":"Conforto","description":"Interior pensado para o uso diário."},{"title":"Eficiência","description":"Conjunto equilibrado para diferentes trajetos."}]','[{"label":"Categoria","value":"Crossover"},{"label":"Motor","value":"Turbo 200 TSI"},{"label":"Transmissão","value":"Automática"},{"label":"Ocupantes","value":"5"}]',true),
('jetta-gli','Jetta GLI','Performance que transforma cada trajeto.','Um sedã esportivo para quem procura performance, tecnologia e acabamento premium.','[{"title":"Motor 2.0 TSI","description":"Performance e resposta para uma condução esportiva."},{"title":"Câmbio DSG","description":"Trocas rápidas e precisas."},{"title":"Acabamento premium","description":"Detalhes pensados para uma experiência superior."},{"title":"Tecnologia","description":"Recursos de conectividade e assistência ao motorista."}]','[{"label":"Motor","value":"2.0 TSI"},{"label":"Transmissão","value":"DSG"},{"label":"Tração","value":"Dianteira"},{"label":"Categoria","value":"Sedã esportivo"}]',true),
('polo','Polo','Tecnologia e personalidade para todos os dias.','Um hatch Volkswagen que entrega equilíbrio entre dirigibilidade, tecnologia, segurança e praticidade.','[{"title":"Dirigibilidade","description":"Acerto que favorece a condução urbana e rodoviária."},{"title":"Tecnologia","description":"Conectividade e recursos modernos."},{"title":"Segurança","description":"Soluções pensadas para proteger você."},{"title":"Praticidade","description":"Um Volkswagen versátil para a rotina."}]','[{"label":"Categoria","value":"Hatch"},{"label":"Motorização","value":"Turbo"},{"label":"Transmissão","value":"Automática"},{"label":"Ocupantes","value":"5"}]',true),
('tera','Tera','O novo SUV Volkswagen para a sua próxima história.','Design, tecnologia e versatilidade em um novo SUV Volkswagen pensado para uma nova geração de clientes.','[{"title":"Novo design","description":"Uma identidade SUV marcante e contemporânea."},{"title":"Tecnologia","description":"Recursos para conectar você ao seu dia."},{"title":"Versatilidade","description":"Praticidade para diferentes momentos."},{"title":"Volkswagen","description":"Engenharia e experiência em um novo produto."}]','[{"label":"Categoria","value":"SUV"},{"label":"Motorização","value":"Turbo"},{"label":"Transmissão","value":"Automática"},{"label":"Ocupantes","value":"5"}]',true)
on conflict (slug) do nothing;

-- Storage bucket for vehicle photos.
insert into storage.buckets (id,name,public) values ('vehicle-images','vehicle-images',true) on conflict (id) do nothing;

drop policy if exists "Public can view vehicle images" on storage.objects;
create policy "Public can view vehicle images" on storage.objects for select to anon, authenticated using (bucket_id='vehicle-images');

drop policy if exists "Authenticated can upload vehicle images" on storage.objects;
create policy "Authenticated can upload vehicle images" on storage.objects for insert to authenticated with check (bucket_id='vehicle-images');

drop policy if exists "Authenticated can update vehicle images" on storage.objects;
create policy "Authenticated can update vehicle images" on storage.objects for update to authenticated using (bucket_id='vehicle-images') with check (bucket_id='vehicle-images');

drop policy if exists "Authenticated can delete vehicle images" on storage.objects;
create policy "Authenticated can delete vehicle images" on storage.objects for delete to authenticated using (bucket_id='vehicle-images');
