# design.md — Evento Estrutura Negócio Mentoria (NOL / Jorge Murilho)

## 1. Identidade & Tom
- **Cliente / Projeto:** NOL — Negócios Online Lucrativo / Evento "Estrutura Negócio Mentoria" (Jorge Murilho)
- **Setor:** Mentoria / Educação empreendedora (alto ticket)
- **Sensação visual (3 palavras):** premium, editorial, autoridade
- **Referência visual:** a CAPA DO LIVRO "Estrutura Negócio Mentoria" (preto + dourado metálico + branco). Decisão do Dede em 26/09: a paleta do site segue a capa do livro, não o navy do kit "Sistema de Vendas". Cores amostradas da capa (`livro jorge/livro jorge.pdf`, página 1).

## 2. Cores (amostradas da capa do livro)
| Papel | Hex | Uso |
|-------|-----|-----|
| Fundo (base) | `#070706` | preto quente da capa (`#050504`), hero e seções escuras |
| Fundo alt | `#100F0C` | seções escuras alternadas |
| Fundo cards | `#1B1812` | cards, cartões do flip, gradientes |
| Texto | `#F3F3F1` | branco da capa ("NEGÓCIO"), corpo sobre fundo escuro e fundo das seções claras |
| Texto suave | `#6F6866` | legendas sobre fundo claro (sobre escuro: texto a 68% de opacidade) |
| Texto sobre claro | `#17140E` | corpo e títulos nas seções claras |
| Dourado (primária) | `#D4A23F` | marca, ícones, eyebrows, números, bordas |
| Dourado brilho | `#EBC464` | destaque, preço, topo do degradê metálico |
| Dourado sombra | `#9C6727` | base do degradê metálico |
| Dourado sobre claro | `#8F6218` | eyebrows e detalhes em seções claras (contraste) |
| Borda | `rgba(212,162,63,.2)` | divisórias e hairlines sobre escuro |

Degradê metálico da capa (títulos dourados e botões): `#F3D27C → #D4A23F → #A87423` (botão: `#F0CB6E → #D4A23F → #B98424`).

## 3. Tipografia
- **⚠️ Nord não tem acentuação em português** (á,ã,é,ê,í,ó,õ,ú,ç — maiúsculas e minúsculas, confirmado via fontTools). Não usar em títulos/corpo de texto real, só onde o conteúdo é 100% numérico (hoje: só o preço "97").
- **Títulos:** Fraunces (Google Fonts, serifada, opsz variável) — peso 600, ecoa a serifa da capa do livro
- **Corpo / UI / botões / eyebrows / contagem regressiva / horários:** Archivo (Google Fonts) — pesos 400/500/700/800
- **Estrutura Display (fonte própria, criada em 26/09):** alfabeto condensado em caixa-alta desenhado a partir das letras reais da capa do livro (E S T R U A M N O I extraídas e vetorizadas do PDF; D, Z, P, C, Á, vírgula e ponto construídos na mesma geometria). Arquivos: `assets/fonts/EstruturaDisplay.woff/.ttf`, fontes de geração em `Ofertas/fonte-estrutura-display/` (`build_font.py`). Cobre só: A Á C D E I M N O P R S T U Z , . e espaço. Usar para headlines em dourado metálico; para qualquer outra letra, cair no fallback (`'Bebas Neue', Impact`) ou ampliar o alfabeto rodando o script de novo
- **Composição de headline (como a capa):** palavra dourada gigante, palavra pequena branca espaçada entre linhas douradas com pontos, palavra dourada gigante, divisor com losango, subtítulo espaçado com destaque dourado. Protótipo animado em `teste-header.html` (ciclo de 15s, camadas: clarão, poeira dourada, brilho, livro 3D, título letra por letra, etiquetas dos 4 pilares)
- **Escala:** h1 `56px` (mobile 34px) / h2 `36px` (mobile 26px) / h3 `24px` / body `17px`

## 4. Layout & Espaçamento
- **Largura máx. do conteúdo:** 1200px
- **Grid:** 12 colunas, mobile-first (single column < 920px)
- **Padding vertical das seções:** 96px desktop / 64px mobile
- **Border-radius:** 8px (sóbrio, não arredondado demais)
- **Sombras:** `0 8px 32px rgba(212,162,63,.12)` em cards sobre fundo escuro; `0 4px 24px rgba(7,7,6,.08)` sobre fundo claro

## 5. Componentes
- **Botão primário:** degradê metálico dourado, texto `#140F05` bold uppercase, brilho interno no topo, hover sobe 2px e clareia. Todos os botões de compra têm um brilho diagonal passando em loop infinito (3s por ciclo, atrás do texto), decisão do Dede em 26/09; manter a cor dourada do botão
- **Botão secundário / outline:** borda `#D4A23F` 1.5px, texto dourado, fundo transparente, hover preenche
- **Cards:** fundo translúcido sobre `#100F0C`, borda 1px dourada a 20%, raio 8px; ao rolar, acendem em dourado (borda, brilho e quadradinho do número)
- **Hero:** fundo preto com brilho dourado sutil, mockup 3D da capa do livro, título com palavra "mentoria" em degradê metálico, contagem regressiva com flip, CTA dourado

## 6. Motion / Animação
- **Topo do site (integrado em 26/09):** o hero usa a headline em Estrutura Display, livro 3D em camadas, poeira dourada, brilho e etiquetas dos 4 pilares. Ao fim do topo o fundo escurece até `#100F0C` (cor da seção seguinte) e uma faixa de palavras douradas deslizando (Estrutura, Vendas, Entrega, Escala, Mentoria, data e local, `.strip`) faz a passagem sem corte seco, com linha de luz dourada no topo da faixa
- **Estilo:** sutil — fade/slide on scroll, contagem regressiva com flip, título palavra por palavra, cards e frase enchendo de dourado conforme a rolagem, linha de progresso dourada na agenda, galeria das placas em faixa de largura total que passa sozinha em loop infinito (32px/s), pausa ao tocar/passar o mouse e aceita arrastar (mouse) ou deslizar (dedo)
- **Reduced-motion:** ignorar `prefers-reduced-motion` — Dede quer as animações tocando mesmo com movimento reduzido ligado no Windows

## 7. Imagens & Assets
- **Estilo das imagens:** fotográfico premium/editorial — Jorge Murilho, capa do livro, depoimentos em vídeo vertical
- **Assets prontos:** logo horizontal e monograma (recoloridos para `#D4A23F` nas cópias do site; originais intactos em `identidade visual/`), capa do livro, foto do Jorge, 2 vídeos de depoimento (720p em `assets/video/`), 6 fotos de mentorados com placas de reconhecimento no palco do evento (`assets/img/placas/`, originais de 15 a 29 MB em `Ofertas/fotos mentorados/`)
- **Ferramenta (se faltar imagem):** kie.ai (gpt-image-2)

## 8. Regras (Do / Don't)
- ✅ Preto + dourado + branco em toda a página, como a capa do livro. Não diluir com outras cores (nada de azul)
- ✅ CTA sempre visível: preço fixo de R$97 (sem popup de desconto, decisão do Dede em 26/09)
- ✅ Copy alinhada ao método e às frases do livro (4 pilares: Estrutura, Vendas, Entrega, Escala)
- ❌ Sem emoji/ícones decorativos no copy de venda (padrão premium do Dede)
- ❌ Sem travessão (—) no texto da página
- ❌ Sem afirmar faturamento ou número de vagas que não sejam confirmados
