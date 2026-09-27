# design.md — Evento Estrutura Negócio Mentoria (NOL / Jorge Murilho)

## 1. Identidade & Tom
- **Cliente / Projeto:** NOL — Negócios Online Lucrativo / Evento "Estrutura Negócio Mentoria" (Jorge Murilho)
- **Setor:** Mentoria / Educação empreendedora (alto ticket)
- **Sensação visual (3 palavras):** premium, editorial, autoridade
- **Referência visual:** identidade "Sistema de Vendas Jorge Murilho" em `identidade visual/Identidade Sistema de vendas/` (logo, paleta, fontes já prontos — usar exatamente essa marca, não recriar)

## 2. Cores
| Papel | Hex | Uso |
|-------|-----|-----|
| Fundo (base) | `#0A1B3D` | navy escuro, fundo principal (hero, seções de venda) |
| Fundo alt | `#E5E6E6` | seções alternadas claras (método, prova social) |
| Texto | `#E5E6E6` | corpo sobre fundo escuro |
| Texto suave | `#6F6866` | legendas/muted, texto sobre fundo claro |
| Primária | `#E2C28A` | marca, dourado — títulos de destaque, ícones, bordas |
| Destaque | `#E2C28A` | CTAs (botão de compra) |
| Borda | `#6F6866` | divisórias, hairlines em cards |

Texto sobre fundo claro (`#E5E6E6`) usa `#383028` (marrom escuro quase preto) em vez de `#E5E6E6`.

## 3. Tipografia
- **⚠️ Nord não tem acentuação em português** (á,ã,é,ê,í,ó,õ,ú,ç — maiúsculas e minúsculas, confirmado via fontTools). Não usar em títulos/corpo de texto real, só onde o conteúdo é 100% numérico.
- **Títulos:** Fraunces (Google Fonts, serifada, opsz variável) — peso 600, ecoa a serifa da capa do livro
- **Corpo / UI / botões / eyebrows:** Archivo (Google Fonts) — pesos 400/500/700
- **Números (contagem regressiva, preço, numeração dos pilares 01-04):** Nord — pesos Book/Bold, self-hosted em `assets/fonts/`
- **Escala:** h1 `56px` (mobile 34px) / h2 `36px` (mobile 26px) / h3 `24px` / body `17px`

## 4. Layout & Espaçamento
- **Largura máx. do conteúdo:** 1200px
- **Grid:** 12 colunas, mobile-first (single column < 768px)
- **Padding vertical das seções:** 96px desktop / 56px mobile
- **Border-radius:** 8px (sóbrio, não arredondado demais)
- **Sombras:** `0 8px 32px rgba(226,194,138,.12)` em cards sobre fundo escuro; `0 4px 24px rgba(10,27,61,.08)` sobre fundo claro

## 5. Componentes
- **Botão primário:** fundo `#E2C28A`, texto `#0A1B3D` bold, hover escurece 8%
- **Botão secundário / outline:** borda `#E2C28A` 1.5px, texto `#E2C28A`, fundo transparente, hover preenche com `#E2C28A` e texto vira `#0A1B3D`
- **Cards:** fundo `#12244d` (navy um tom mais claro) sobre seções escuras, borda 1px `#E2C28A` a 20% opacidade, raio 8px
- **Hero:** fundo navy, selo/medalha dourado (`5. Logo 3D e Fundo/Logo.png`) como elemento de autoridade, headline Nord Black centralizada, contagem regressiva até 02/10 9h, CTA dourado abaixo da dobra

## 6. Motion / Animação
- **Estilo:** sutil — fade/slide on scroll, contagem regressiva com flip, título palavra por palavra, cards e frase enchendo de dourado conforme a rolagem
- **Reduced-motion:** ignorar `prefers-reduced-motion` — Dede quer as animações tocando mesmo com movimento reduzido ligado no Windows

## 7. Imagens & Assets (para gerar com IA)
- **Estilo das imagens:** fotográfico premium/editorial — Jorge Murilho palestrando, capa do livro "Estrutura Negócio Mentoria", ambiente de evento corporativo
- **Assets prontos:** logo (vetor/PNG light e dark), selo 3D dourado, capa do livro em `oferta evento/livro jorge.pdf`
- **Ferramenta (se faltar imagem):** kie.ai (gpt-image-2)

## 8. Regras (Do / Don't)
- ✅ Contraste alto navy + dourado em toda a página — é a marca, não diluir com outras cores
- ✅ CTA sempre visível: preço fixo de R$97 (sem popup de desconto, decisão do Dede em 26/09)
- ✅ Copy 100% alinhada ao método do livro (8 capítulos = pilares da mentoria)
- ❌ Sem emoji/ícones decorativos no copy de venda (padrão premium do Dede)
- ❌ Sem cores fora da paleta de 5 tons acima
