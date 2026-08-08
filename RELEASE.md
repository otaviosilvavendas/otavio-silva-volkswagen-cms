# Build 8 — Vercel-safe release

## Correção desta versão
A Vercel reportou erro de parser em `app/sitemap.ts`. Para eliminar essa classe de erro, os metadata routes TypeScript de sitemap/robots/manifest foram substituídos por arquivos estáticos em `public/`.

Arquivos agora usados:
- `public/sitemap.xml`
- `public/robots.txt`
- `public/manifest.webmanifest`

As páginas dos modelos e os componentes de conversão permanecem na estrutura anterior.

## Publicação
Envie somente este ZIP para a Vercel Drop.

## Build 10 — Supabase environment compatibility

- The Supabase client now accepts `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the variable already configured in Vercel).
- Backward compatibility with `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is preserved.
- Public vehicle loading uses the same fallback.
- No public-site routes or admin functionality were removed.
