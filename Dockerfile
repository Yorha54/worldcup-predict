FROM node:22-alpine

WORKDIR /app
COPY . .

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4173
ENV DATA_DIR=/data

RUN mkdir -p /data && chown -R node:node /app /data
USER node

EXPOSE 4173
CMD ["node", "server.js"]
