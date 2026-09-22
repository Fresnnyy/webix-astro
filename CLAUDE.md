# CLAUDE.md — webix-astro

Reglas de trabajo para agentes (Claude Code, Ghosty, Codex, Gemini, etc.) en este repo.
Escrito el 2026-09-22. Si algo cambia, se actualiza **aquí**, no en la memoria de una sesión.

---

## Regla 1 — El agente hace el commit Y el push. Siempre.

**No le pidas a Rossy que corra comandos de git.** El ciclo completo lo ejecuta el agente:

1. Editar
2. `git add` + `git commit`
3. `git push origin master` — el push **sí funciona desde el agente**; git resuelve las
   credenciales en su máquina (credential helper `store`). El agente **nunca necesita ver
   la contraseña ni el token**.
4. Verificar que quedó publicado (Regla 2).

Si el push necesita red y el entorno la tiene bloqueada, **el sistema le pide autorización
a Rossy** y ella la aprueba. Eso es el flujo correcto — no pasarle los comandos.

> **Por qué existe esta regla:** el 2026-09-22 un agente le entregó los tres comandos para
> copiar y pegar en la terminal. Ella respondió con razón: *"tú antes hacías estos push,
> ¿por qué ahora no?"*. Las versiones anteriores lo hacían solas. Además el agente había
> afirmado que no podía hacerlo "por las credenciales" **sin haberlo probado nunca**.
> No lo vuelvas a hacer.

**Rama:** `master` (no `main`).

---

## Regla 2 — Cómo se publica y cómo se verifica

- El sitio vive en **Netlify**, conectado a `github.com/Fresnnyy/webix-astro`.
- **Push a `master` → Netlify construye y publica sola** (1–3 minutos). No hace falta build
  local ni `netlify deploy`.
- **Verificación sin credenciales:** comparar el tamaño del archivo local con el
  `content-length` de `https://webix.com.mx/<ruta>/`. Si coinciden, se publicó. Añadir
  `?v=N` a la URL para saltar la caché.
- El panel de Netlify (Forms, Deploys) **solo lo ve Rossy** — requiere sus credenciales.
  No se lo pidas; no hace falta para publicar.

## Regla 3 — El volumen es exFAT y rompe cosas

- **`node_modules` se corrompe solo.** Si `npm run build` falla con
  `ERR_MODULE_NOT_FOUND`, correr `npm ci` (requiere red).
- **`core.filemode` debe estar en `false`.** Si no, todos los archivos aparecen como
  modificados y `git status` es inútil.
- **Archivos `._*` (AppleDouble):** ya están en `.gitignore`, no entran al repo.
  Si aparecen dentro de `.git` y rompen el índice (`non-monotonic index`), **verificar con
  `file` que de verdad son AppleDouble antes de tocarlos**.
- `dist/` y `.astro/` están ignorados.

## Regla 4 — Antes de decir "no puedo", probarlo

El 2026-09-22 un agente afirmó que no podía hacer un push "por las credenciales" sin
intentarlo. Era falso. **Probar primero.** Solo después de un intento fallido se declara
una limitación — y se declara con el error exacto en la mano.

## Regla 5 — No inventar datos. Nunca.

Rossy toma decisiones comerciales con estos números (precios, free tiers, capacidades).
- Verificar en la **fuente oficial** del proveedor y citar la liga.
- Si dos fuentes se contradicen, **decir que se contradicen** y dar las dos cifras.
- Si algo no se pudo verificar, **marcarlo**. No rellenar el hueco.

---

## Regla 6 — Toda página nueva lleva su icono

**Cada página que se cree dentro del proyecto Webix debe declarar su favicon.** Sin esto, el
navegador pide `/favicon.ico` por defecto y muestra **el cohete de Astro** (los archivos
`favicon.ico` / `favicon.svg` que vinieron con el template) — que no es nuestra marca.

```html
<link rel="icon" type="image/png" href="/img/icono_w.png" />
```

- En el sitio Astro ya lo pone `Layout.astro`.
- En páginas sueltas dentro de `public/` (como `public/brief/`) se declara a mano, con la
  ruta relativa correcta (`../img/icono_w.png` desde `/brief/`).
- Icono oficial: `/img/icono_w.png` (la W de Webix).

---

## Mapa del proyecto

- `src/` — sitio Astro (blog en MDX, páginas).
- `public/brief/index.html` — formulario de brief para clientas.
  - Netlify Forms (`name="brief-webix"`) + botón de WhatsApp (`WHATSAPP_NUMBER` en el JS).
  - **El maestro vive en `/Volumes/Webix/Webix/doctos/index.html`.** Se edita ahí y se copia a
    `public/brief/index.html`. Los dos deben quedar idénticos.
  - Los botones DEBEN tener `type="button"` — dentro de un `<form>`, sin `type` se vuelven
    botones de envío y rompen el multi-paso. (Bug real, 2026-09-22.)

## Documentación y decisiones

Todo en `/Volumes/Webix/Webix/doctos/`:

- `exploracion-agenda-y-arquitectura-v1.0.md` — el documento madre: situación, decisiones
  abiertas (A1–A4), costos, niveles de arquitectura, auditoría de huecos (H1–H9).
- `registro-horas.md` — horas por clienta. **Cada bloque de trabajo se anota ahí**, es el
  dato que decide si el plan de $333 MXN/mes es rentable.
- `brief-clienta-v1.0.md` — guion de la conversación con clientas (por WhatsApp).

## Pendientes vivos (2026-09-22)

- **H4:** hay dos teléfonos contradictorios (`+52-55-3314-5233` en el schema,
  `+52 56 5077 6884` en el footer). Decidir cuál es el bueno.
- **D5:** aclarar a cuántas clientas se les dio el mes gratis.
- El número de WhatsApp del brief es **personal y temporal** (el de la empresa está
  bloqueado por saldo). Reemplazar cuando se reactive.
- `npm ci` pendiente: el `node_modules` local sigue incompleto (el build local no corre).
- Los `favicon.ico` y `favicon.svg` **del template de Astro** siguen en `public/`. Algún día
  reemplazarlos por la marca Webix para que nada del sitio muestre el cohete.
