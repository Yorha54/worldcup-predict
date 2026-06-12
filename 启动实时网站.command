#!/bin/sh
set -eu
ROOT="$(cd "$(dirname "$0")" && pwd)"
AGENT="$HOME/Library/LaunchAgents/com.codex.worldcup-ai.plist"
mkdir -p "$HOME/Library/LaunchAgents"
cp "$ROOT/com.codex.worldcup-ai.plist" "$AGENT"
launchctl bootout "gui/$(id -u)/com.codex.worldcup-ai" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$AGENT"
launchctl kickstart -k "gui/$(id -u)/com.codex.worldcup-ai"
sleep 2
open "http://127.0.0.1:4173"
echo "实时更新服务已安装并在后台运行。"
echo "以后无需保持此窗口或网页开启。"
echo "电脑登录后服务会自动启动。"
sleep 3
