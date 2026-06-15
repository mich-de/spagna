#!/usr/bin/env bash
set -e

echo ""
echo "  +------------------------------------------+"
echo "  |   ~ Sol & Local - Costa del Sol 2026    |"
echo "  |   Dashboard di viaggio premium           |"
echo "  +------------------------------------------+"
echo ""

echo "  [>] Libero porte 3000 e 3001..."
for port in 3000 3001; do
  pid=$(fuser "$port"/tcp 2>/dev/null || lsof -ti :"$port" 2>/dev/null || true)
  if [ -n "$pid" ]; then
    kill -9 "$pid" 2>/dev/null || true
    echo "  [x] Kill processo su porta $port (PID $pid)"
  fi
done

sleep 1

echo "  [>] Pulizia cache di compilazione..."
npm run clean

echo ""
echo "  [v] Avvio del server in corso..."
echo "  [>] Apri http://localhost:3000 nel browser"
echo ""
npm run dev
