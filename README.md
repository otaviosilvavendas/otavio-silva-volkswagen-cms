# Otávio Silva | Volkswagen — CMS Edition

O site agora possui uma camada de conteúdo administrável.

## O que muda
Depois da configuração inicial do Supabase e de uma única nova implantação, você poderá atualizar:
- modelos;
- preços;
- disponibilidade;
- fotos;
- ficha técnica;
- destaques;
- descrição;
- modelo em destaque.

Essas alterações não exigem nova implantação do site.

## Painel
`/admin`

## Configuração
Consulte `README_CMS.md` e execute `supabase/schema.sql` no SQL Editor do Supabase.

## Variáveis da Vercel
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Observação
O ambiente desta geração não possui acesso ao registry npm usado para baixar os pacotes Supabase, portanto a compilação local completa não pôde ser executada aqui. O projeto mantém fallback para o conteúdo atual quando as variáveis Supabase não estão configuradas.
