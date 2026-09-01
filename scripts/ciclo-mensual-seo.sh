#!/bin/bash
# Revisión mensual de SEO. La lanza launchd el día 2 de cada mes.
#
# El día 2 y no el 1 a propósito: Search Console va con dos o tres días de
# retraso, así que el día 1 el mes que acaba de cerrar todavía está incompleto.
#
# Este ciclo SÍ cambia cosas en la web, pero solo las que superan el umbral de
# evidencia que lleva escrito el agente: mínimo 30 impresiones, nada que se
# tocara hace menos de 8 semanas, y como mucho tres cambios por ejecución.
#
# Para pararlo:
#   launchctl unload ~/Library/LaunchAgents/com.atep.seo-mensual.plist

set -uo pipefail

REPO="$HOME/Projects/Website-ATEP"
BASE="$HOME/.atep-analytics"
LOGDIR="$BASE/logs"
LOG="$LOGDIR/seo-mensual-$(date +%Y-%m).log"

mkdir -p "$LOGDIR" "$BASE/informes"
exec >>"$LOG" 2>&1

echo "════════════════════════════════════════════════════════"
echo "  Revisión mensual de SEO · $(date '+%d/%m/%Y %H:%M')"
echo "════════════════════════════════════════════════════════"

cd "$REPO" || { echo "✗ No encuentro el repositorio en $REPO"; exit 1; }

if [ -n "$(git status --porcelain)" ]; then
  echo "✗ Hay cambios sin commitear. No toco nada para no mezclarlos."
  git status --short
  exit 1
fi

git checkout main --quiet || { echo "✗ No he podido cambiar a main"; exit 1; }
git pull --ff-only origin main --quiet || { echo "✗ No he podido actualizar main"; exit 1; }
echo "✓ Repositorio en main y al día."

PROMPT=$(cat <<'FIN'
Toca la revisión mensual de SEO de atepconsulting.com. Lanza el agente
`seo-analyst` y dile que haga su trabajo completo:

1. Sacar los datos con `node ~/.atep-analytics/informe-seo.mjs`.
2. Revisar las decisiones anteriores de `.claude/seo-decisiones.json` cuya
   fecha de revisión ya haya llegado, y comprobar con datos si funcionaron.
   Si alguna empeoró las cosas, revertirla.
3. Decidir y aplicar como mucho TRES cambios nuevos, respetando sus umbrales:
   mínimo 30 impresiones en 28 días y nada que se tocara hace menos de 8
   semanas.
4. Anotar cada cambio en `.claude/seo-decisiones.json` con su evidencia y su
   fecha de revisión.
5. Dejar el informe del mes en `~/.atep-analytics/informes/AAAA-MM.md`.
6. Si ha cambiado algo: ejecutar `npm run build`, y si pasa, commitear y subir
   a main. Si la build falla, revertir y explicarlo en el informe.

Si no hay evidencia suficiente para ningún cambio, que no cambie nada y lo diga
en el informe. No cambiar es una decisión válida y frecuente.
FIN
)

claude -p "$PROMPT" \
  --allowedTools Read Write Edit Glob Grep Task "Bash(node:*)" "Bash(npm:*)" "Bash(git:*)" \
  --add-dir "$BASE"

CODIGO=$?
echo
if [ $CODIGO -eq 0 ]; then
  echo "✓ Revisión terminada · $(date '+%H:%M')"
  echo "  Informe del mes: $BASE/informes/$(date +%Y-%m).md"
else
  echo "✗ La revisión ha terminado con código $CODIGO · $(date '+%H:%M')"
fi

exit $CODIGO
