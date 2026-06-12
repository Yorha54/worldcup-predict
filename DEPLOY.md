# 公网部署

这个应用需要一个持续运行的 Node 服务，不能直接把 `index.html` 发给别人。

## Railway

1. 将此目录上传到一个 GitHub 仓库。
2. 在 Railway 新建项目并选择 **Deploy from GitHub repo**。
3. Railway 会自动识别根目录的 `Dockerfile`。
4. 给服务添加一个 Volume，挂载路径填写 `/data`。
5. 在服务设置中确认 **Serverless / App Sleeping 已关闭**，否则长时间无人访问时服务可能休眠，后台定时更新也会暂停。
6. 在 Networking 中生成公开域名。
7. 把生成的 `https://...up.railway.app` 链接发给其他人。

服务会在比赛中每 2 分钟更新，非比赛时每 3 小时更新资讯；下一场开球前会自动唤醒检查，不会因为三小时周期错过开赛。

`railway.toml` 已设置为持续重启策略；但是否全天运行仍取决于 Railway 项目余额充足且 Serverless 关闭。Volume 必须挂载到 `/data`，否则重新部署后实时比赛记录与已翻译资讯可能从初始快照重新开始。

## 环境变量

- `HOST=0.0.0.0`
- `PORT` 由平台自动提供；未提供时使用 `4173`
- `DATA_DIR=/data`

## 健康检查

部署后访问 `/health`，返回 `{"ok":true,...}` 即表示后台更新服务正常。

## 在 GitHub 更新新版本

通常不需要删除旧文件。进入 GitHub 仓库后：

1. 点击 **Add file → Upload files**。
2. 从本地 `world-cup-ai-predictor` 文件夹选择新版文件。
3. 同名文件会被新版覆盖，新文件会自动加入。
4. 点击页面底部 **Commit changes**，Railway 会自动重新部署。

完整更新建议上传这些生产文件：

- `index.html`
- `styles.css`
- `app.js`
- `server.js`
- `real-data.js`
- `schedule-data.js`
- `team-profiles.js`
- `team-profiles-14.js`
- `package.json`
- `Dockerfile`
- `railway.toml`
- `.dockerignore`

不要上传本机专用的 `updater.log`、`updater.pid`、`com.codex.worldcup-ai.plist` 和中文 `.command` 文件。

GitHub 普通网页不适合批量删除。最简单且风险最低的方法是直接上传同名新版覆盖旧版；确实需要清空仓库时，建议新建一个空仓库再上传完整生产文件，而不是逐个删除。
