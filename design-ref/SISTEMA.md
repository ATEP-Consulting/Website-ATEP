# Sistema visual — rediseño 2026

Documento vivo. Rama `rediseno-2026`.

**Regla de trabajo (3 sep 2026):** nada se aplica al código de la web hasta
que Pablo lo aprueba viéndolo en `/lab`. El primer intento se aplicó directo a
`Home.jsx` y hubo que revertirlo; el banco existe precisamente para no repetir
eso. La web real está hoy **exactamente como en `main`**.

## Por qué existe esto

El problema no era conversión ni percepción: la web le parecía **anticuada y
genérica**. Lo genérico no estaba en el contenido sino en la capa de
utilidades — la paleta `neutral` de Tailwind sin tocar, `.btn-primary` con
`rounded-lg shadow-md`, titulares en `text-4xl lg:text-5xl`.

Un rediseño anterior (rama `redesign`, ago 2026) se descartó porque se validó
como maqueta entera. Este se valida **pantalla a pantalla en el banco**.

## Dirección elegida: Mosa

**La variante Hirael se retiró el 3 de septiembre de 2026**: Pablo se quedó con
Mosa. Si hiciera falta recuperarla, sólo existe fuera del repositorio (no
llegó a commitearse).

Descartada la vía "disciplina de Hirael sobre la paleta ATEP": Pablo la vio
aplicada y no le convenció. La referencia es
[Mosa AI](https://www.nextjsshop.com/templates/mosa-ai/preview).

Su lenguaje, tal y como se lee en las capturas:

- **Casi negro** (`#050505`), tarjetas `#0A0A0A` con borde de 1px al 8-12 % de
  blanco. Sin sombras.
- **Grotesca grande** para titulares, peso 400, tracking ligeramente negativo.
  Titulares **a dos tonos**: primera mitad en blanco, segunda en gris.
- **Monoespaciada** para etiquetas de sección (con punto delante: `● Benefits`),
  títulos de tarjeta, navegación y botones (mayúsculas, muy espaciadas).
- **Botones rectangulares** de radio pequeño: primario blanco con texto oscuro
  y chevron `›`; secundario translúcido.
- **Navegación segmentada** arriba: cajas con borde unidas entre sí.
- **Hero a sangre** con imagen cinematográfica y el texto abajo a la izquierda;
  a la derecha, fila de respaldo ("Backed by" → nuestros clientes).
- Secciones: tarjetas con miniatura, pestañas subrayadas, pasos numerados con
  filete vertical, carrusel de testimonios con contador `1/6`, acordeón de FAQ
  con `+`/`−` circulares, pie con newsletter y columnas en mono.

Las demás páginas seguirán esta misma dirección.

### El problema pendiente: la imagen

Mosa funciona por **fotografía cinematográfica comprada** — una montaña con
niebla que no tiene nada que ver con la tecnología. No la tenemos: hay 8 casos
en `casesData.js` y sólo 4 con captura, y el resto de `public/images/` son
fotos de banco genéricas.

En el banco, el fondo del hero es un montaje lento de esas 4 capturas de
producto, desenfocadas a 30px hasta leerse como ambiente. Sostiene la
composición, pero **no tiene la profundidad de una fotografía real**, y esa
diferencia se va a notar en cada sección que lleve imagen. Está sin resolver.

Descartado: metraje o fotografía de banco "de tecnología" (código en verde,
servidores, circuitos). Es el cliché exacto del sector y nos alejaría del
objetivo, que era no parecer genéricos.

## Marca y modos (3 sep 2026)

- **Logo real**: `public/new-logo-atep.svg` (el SVG, no el PNG), en la barra,
  en el pie y en la placa del cierre. Fuera el icono genérico.
- **Granate corporativo** como único acento, en los dos modos:
  `#9f1239` (marca) con `#7a0d2c` de hover. Sobre negro se sube a `#c4173f`
  para que aguante el contraste; es el mismo color, corregido por fondo.
  Va en: puntos de etiqueta, subrayado de pestaña activa, filete de la placa,
  halos, icono abierto del FAQ y botones primarios. **No** va en fondos.
- **Modo claro y modo noche** en las dos variantes. Toda la piel cuelga de
  variables (`--fg`, `--bg0`, `--surface`, `--brand`…), así que invertir el
  tema es redefinir ~12 valores en `.mo.is-light` / `.hi.is-dark` y el resto
  del CSS no se entera. Atajo del banco: tecla `T`.
- El **velo de las fotos** es más fuerte en claro: el titular pasa a ser tinta
  oscura sobre la imagen y con el velo de oscuro no llegaba a contraste
  suficiente. Es legibilidad, no gusto.

### Aviso para quien toque estos ficheros

El CSS de cada piel vive dentro de una plantilla de JavaScript. **Un backtick
en un comentario cierra la cadena y tumba la página entera**, sin error de
compilación. Ha pasado tres veces. Los scripts de edición llevan un
`assert` que cuenta los backticks antes de escribir: no lo quites.

## Dónde vive cada cosa

- `src/pages/lab/` — el banco. **Autocontenido a propósito**: no usa tokens ni
  clases del sitio, así que trabajar aquí no toca una línea de la web real.
  `Lab.jsx` (contenedor), `HomeMosa.jsx` (la home), `MegaNav.jsx`, `Btn.jsx`,
  `ProjectPlate.jsx`, `content.js` (contenido real) y `mosaCss.js` (la piel).
- `src/App.jsx` — ruta `/lab` **sólo en desarrollo**: en producción el ternario
  se pliega a `null`, el `import()` desaparece y el chunk no se genera.
  Verificado con una build de producción.

Atajos del banco: `A`, `B`, y espacio para alternar.

## Transiciones entre secciones

Revelado por scroll: los elementos suben 18px y aparecen en 700 ms, con la
misma curva que todo lo demás. En cascada, 80 ms entre hermanos. Se marca en
el JSX con `data-reveal` (entra el elemento) o `data-stagger` (entran sus
hijos) y lo activa `useScrollReveal.js`.

Tres cosas que no son opcionales:

- **Un solo `IntersectionObserver`** para toda la página, no uno por elemento.
- **Se revela una vez**: se deja de observar al entrar. Volver a animar al
  subir marea y hace la página lenta de leer.
- **El estado oculto vive detrás de la clase `reveal-ready`**, que pone el
  propio hook. Si el JavaScript falla, la clase no aparece y **el contenido se
  ve entero**. Sin esa salvaguarda, un error de JS deja la web en blanco de la
  primera sección hacia abajo. Verificado quitando la clase a mano: 0 elementos
  ocultos.
- Con `prefers-reduced-motion` no se observa nada y no se esconde nada.

### ⚠️ Al portar esto a la web real

`react-snap` **ejecuta el JavaScript** antes de guardar el HTML. Es decir:
capturaría la página con `reveal-ready` puesto y todo lo que esté por debajo
del pliegue a `opacity: 0`. Eso llegaría así al HTML servido y a lo que ve un
crawler. Antes de portar el revelado hay que resolverlo — por ejemplo,
detectando el user-agent `ReactSnap` (como ya se hace en `main.jsx` para
Analytics) y no armando el observador durante el prerender.

## Port a la web real (4 sep 2026)

El banco (`/lab`) se retiró: la piel vive ahora en `src/styles/redesign.css`,
acotada bajo la clase `.rd` que pone `MainLayout`. Modo claro =
`[data-theme="light"] .rd`, el mismo atributo que ya usaba `ThemeContext`.

Portado: cabecera con mega menú y menú móvil, pie, home, índice de servicios,
plantilla de las 9 fichas, índice y ficha de casos, índice y artículo de blog,
contacto, compañía, legales y 404. Más las piezas compartidas: tarjeta de
artículo, banner de cookies, flotante de WhatsApp y formulario.

Componentes que quedaron sin uso y se retiraron: `CaseCard`, `ServiceCard`,
`ImageHero`, `ScrollCue`, `CountingNumber`, `ClientsMarquee`, `CaseStripe` y
`Reveal` (sustituido por `useScrollReveal`).

**Los flotantes van dentro de `MainLayout`, no en `App.jsx`**: fuera del
ámbito `.rd` no ven las variables de la piel y se quedan sin fondo ni color.

### Auditoría de color (4 sep 2026)

Se revisó que no quedara nada de la paleta anterior —crema `#f5f1e8`, marino
`#0b1f3a` y sus derivados— midiendo los colores **realmente pintados** en 13
páginas × 2 modos. Aparecieron dos cosas:

1. **`tokens.css` pintaba `html` y `body`** con el crema. No se veía en las
   capturas porque el árbol de `.rd` lo tapa, pero asomaba en el rebote del
   scroll, por debajo del contenido en páginas cortas y en el fondo que usa
   el navegador antes de pintar. Corregido en `redesign.css`, que se importa
   después, más `color-scheme` para que las barras de scroll acompañen.
2. **Diez tokens del diseño anterior seguían heredándose** dentro de `.rd`
   (`--bg`, `--navy`, `--muted`, `--rule`, `--accent`…). Ahora se reasignan a
   la paleta nueva dentro de `.rd`: es una **red de seguridad**, no un
   parche. Si algún resto se escapa se verá raro, pero nunca con los colores
   del diseño viejo.

Resultado: **cero colores de la paleta anterior pintados en toda la web, en
los dos modos.** `ContactForm`, `Snackbar` y `CookiesPolicy` todavía nombran
tokens antiguos; renderizan bien gracias al puente, pero conviene migrarlos
cuando se toquen.

Componentes retirados por quedar sin uso: `ThemeToggle` y `LanguageSwitcher`
(sustituidos por los controles de la cabecera) y `CTA`.

### El fallo del revelado al navegar (4 sep 2026)

Síntoma: entrando en el blog desde la home el texto salía vacío; con F5 se
veía. Causa: `MainLayout` **no se vuelve a montar al navegar**, así que el
`IntersectionObserver` sólo observaba los elementos de la primera página. Los
de la página siguiente nunca se observaban y se quedaban en `opacity: 0`.

Arreglado re-armando el observador en cada cambio de ruta
(`useScrollReveal(rootRef, [pathname])`), y observando sólo lo que aún no se
ha revelado (`:not(.is-in)`) para no repetir trabajo.

**Si alguna vez se añade otra capa de revelado, esta es la trampa**: cualquier
efecto que dependa del DOM de la página y viva en el layout necesita la ruta
como dependencia.

### Scroll suave (4 sep 2026)

`scroll-behavior: smooth` en `html`, nativo del navegador: cero JavaScript y
cero coste por fotograma. Se descartó una librería de scroll con inercia
(tipo Lenis): da más "peso", pero secuestra el scroll del sistema, se lleva
mal con lectores de pantalla y añade trabajo justo donde el sitio va más
justo, que es móvil.

Dos matices que hacen que se note bien:

- **Al cambiar de página NO se anima.** `ScrollToTop` fuerza
  `behavior: "instant"`. Con animación se ve la página nueva desplazándose
  desde donde estabas en la anterior, con medio contenido volando por
  delante. El scroll suave es para moverse dentro de una página, no entre
  páginas.
- **`scroll-margin-top` en todo lo que tenga `id`**, calculado con la altura
  de la barra. Sin eso, un anclaje deja el título de la sección debajo de la
  cabecera fija.

Con `prefers-reduced-motion` vuelve a `auto`.

### El modo claro: la portada sigue siendo oscura (4 sep 2026)

El modo claro estaba construido como una **inversión mecánica** del oscuro y
por eso no funcionaba: la foto del hero se lavaba hasta casi blanco y encima
iba tinta oscura. Poco contraste, sin profundidad, y la barra —que arriba del
todo va integrada en el fondo— se quedaba sin borde sobre una imagen clara y
movida. Pablo lo detectó en la cabecera, pero el problema era de criterio.

**Una portada fotográfica sólo funciona con la foto oscura y el texto en
blanco.** Así que en modo claro el "cover" conserva el tratamiento oscuro
—hero de todas las páginas, hero legal y CTA de cierre— y es el CUERPO el que
se aclara. Da una diferencia real entre modos en vez de una copia desvaída.

La barra acompaña sola porque ya tenía los estados: **arriba y cerrada** va
sobre el cover, así que hereda su paleta oscura y el texto sale blanco;
**condensada o con un menú abierto** está sobre el cuerpo claro y vuelve a la
píldora blanca con tinta oscura.

Dos afinados más, de los que en oscuro funcionan y al invertirlos no:

- El **botón fantasma** es "blanco al 10%" sobre negro, que da un gris
  elegante. Invertido es "negro al 10%" sobre blanco, que da un gris sucio.
  En claro va transparente con borde.
- Las **fotos del cuerpo** se lavaban y las tarjetas quedaban desvaídas: se
  les subió el contraste y se suavizó el velo.

### Cuidado al renombrar clases

Ha mordido tres veces: al renombrar `.rd-rows` → `.rd-index`, se quedaron
reglas apuntando al nombre viejo (`.rd-row-badge`, `.mo-case .mo-btn`) y
dejaron de aplicarse **sin dar ningún error**. Los síntomas fueron una
etiqueta que desbordaba 196px en móvil y un botón pegado al párrafo.

Al renombrar cualquier clase, comprobar después que no queda ninguna regla
con el nombre anterior:

    grep -n "nombre-viejo" src/styles/redesign.css src/**/*.jsx

Y el ritmo vertical se lleva con márgenes **superiores**, no inferiores: así
quitar o añadir un elemento no deja un hueco huérfano.

### Lo que NO se tocó

Rutas, `SEO.jsx`, `generate-seo-files.mjs`, los eventos de `analytics.js`, la
lógica de envío de `ContactForm` (EmailJS + `/api/contact`) y el renderizador
de artículos del blog (negritas, titulares y listas en markdown), que es lo
que hace que lo que publica el agente semanal se vea bien sin tocar nada.

### Pendiente de contenido

- **Testimonios**: la sección está diseñada y probada, pero no hay ninguno
  real. No se publica con testimonios inventados.
- **FAQ de la home**: hay una versión escrita en el banco, sin revisar por
  Pablo y sin traducir al inglés.

## Línea roja

No se tocan: rutas y URLs, `SEO.jsx`, `scripts/generate-seo-files.mjs`, los
eventos de `analytics.js` ni la lógica del formulario de contacto.
**`npm run build` completo antes de cada commit**: react-snap falla en silencio
con según qué CSS y deja rutas sin generar, que con el 404 real de
`vercel.json` significa páginas caídas.
