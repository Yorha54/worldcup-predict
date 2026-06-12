#!/bin/sh
set -eu
NODE_BIN="$(command -v node || true)"
if [ -z "$NODE_BIN" ] && [ -x "$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" ]; then
  NODE_BIN="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
fi
if [ -z "$NODE_BIN" ]; then
  echo "未找到 Node.js，无法启动实时更新服务。"
  exit 1
fi
cd "$(dirname "$0")"
exec "$NODE_BIN" server.js
