#!/bin/bash
# Ciclo semanal del blog. Lo lanza launchd los martes por la mañana.
#
# Coge el siguiente tema pendiente de .claude/plan-editorial.json, se lo pasa
# al agente redactor y publica el resultado. Todo queda registrado en
# ~/.atep-analytics/logs/, que es donde hay que mirar si un martes no aparece
# el artículo.
#
# Para pararlo:
#   launchctl unload ~/Library/LaunchAgents/com.atep.blog-semanal.plist

set -uo pipefail

REPO="$HOME/Projects/Website-ATEP"
BASE="$HOME/.atep-analytics"
LOGDIR="$BASE/logs"
LOG="$LOGDIR/semanal-$(date +%Y-%m-%d).log"
BORRADORES="$BASE/borradores"

mkdir -p "$LOGDIR" "$BORRADORES"
exec >>"$LOG" 2>&1

echo "════════════════════════════════════════════════════════"
echo "  Ciclo semanal · $(date '+%d/%m/%Y %H:%M')"
echo "════════════════════════════════════════════════════════"

cd "$REPO" || { echo "✗ No encuentro el repositorio en $REPO"; exit 1; }

# Partimos siempre de main limpia: si hay trabajo a medias sin commitear, no
# tocamos nada. Publicar encima de cambios ajenos sería peor que no publicar.
if [ -n "$(git status --porcelain)" ]; then
  echo "✗ Hay cambios sin commitear. No publico para no mezclarlos."
  git status --short
  exit 1
fi

git checkout main --quiet || { echo "✗ No he podido cambiar a main"; exit 1; }
git pull --ff-only origin main --quiet || { echo "✗ No he podido actualizar main"; exit 1; }
echo "✓ Repositorio en main y al día."

PROMPT=$(cat <<'FIN'
Eres el encargado del ciclo semanal del blog de ATEP Consulting. Ejecuta estos
pasos en orden y no te salgas de ellos.

1. Lee `.claude/plan-editorial.json` y coge el PRIMER tema cuyo estado sea
   "pendiente". Si no queda ninguno, escribe "COLA VACÍA" y termina.

2. Lanza el agente `blog-writer` con el tema, su ángulo y su caso ancla, y
   pídele que deje el borrador en
   `~/.atep-analytics/borradores/borrador-<id>.json`. Recuérdale que debe
   apoyarse en ese caso real con sus cifras reales y que, si no puede, no lo
   escriba.

3. Si el agente no ha podido escribirlo, NO publiques nada: anota el motivo,
   marca el tema como "bloqueado" en el plan editorial y termina.

4. Si hay borrador, publícalo ejecutando exactamente:
   `node scripts/publicar-post.mjs ~/.atep-analytics/borradores/borrador-<id>.json --desplegar`

5. Si el publicador falla, NO insistas ni intentes forzarlo. Anota el error tal
   cual y termina: es mejor no publicar que publicar algo roto.

6. Si publica bien, marca ese tema como "publicado" en el plan editorial con la
   fecha de hoy y el slug, commitea ese cambio y súbelo a main.

7. Resume en dos líneas qué has publicado y en qué ruta.
FIN
)

claude -p "$PROMPT" \
  --allowedTools Read Write Edit Glob Grep Task "Bash(node:*)" "Bash(git:*)" \
  --add-dir "$BASE"

CODIGO=$?
echo
if [ $CODIGO -eq 0 ]; then
  echo "✓ Ciclo terminado sin errores · $(date '+%H:%M')"
else
  echo "✗ El ciclo ha terminado con código $CODIGO · $(date '+%H:%M')"
fi

# Los registros de más de dos meses se borran solos
find "$LOGDIR" -name 'semanal-*.log' -mtime +60 -delete 2>/dev/null

exit $CODIGO
