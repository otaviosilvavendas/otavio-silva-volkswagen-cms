# Painel atualizável — Otávio Silva Volkswagen

O projeto agora pode usar Supabase como banco de conteúdo e armazenamento de fotos. Depois da configuração inicial, alterações feitas no painel não exigem uma nova implantação.

## Configuração única
1. Crie um projeto no Supabase.
2. Abra **SQL Editor** e execute `supabase/schema.sql`.
3. Em **Authentication > Users**, crie o usuário/e-mail que será usado no painel.
4. Copie a **Project URL** e a **Publishable key** do projeto.
5. Na Vercel, abra **Settings > Environment Variables** e cadastre:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
6. Faça uma única nova implantação da versão CMS.

## Depois disso
Acesse:
`/admin`

Entre com o usuário criado no Supabase.

Você poderá:
- criar modelos;
- alterar nome, descrição, preço e disponibilidade;
- editar ficha técnica;
- editar destaques;
- marcar modelos em destaque;
- enviar fotos;
- trocar a foto principal;
- excluir modelos.

### Regra principal
Depois da implantação única do CMS, **não é necessário fazer nova implantação para cadastrar ou alterar carros**. O site lê o conteúdo do banco em tempo de execução.

## Segurança
O painel usa autenticação do Supabase. O banco possui Row Level Security e as alterações ficam restritas a usuários autenticados.
