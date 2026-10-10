# The chat server as a container (26.1010). travish.com runs it beside the site
# and sends www.travish.com/chat/ to it; see README.md.
#
# Node's current long-term-support line, slim Debian. The tag names a release
# LINE (it moves with each Node 24 patch, so a rebuild picks up security fixes);
# pin a full version or an @sha256 digest to freeze one exact build.
FROM node:24-trixie-slim

ENV NODE_ENV=production
# The port inside the container. Not 80: the server runs as an ordinary user.
ENV PORT=8081
# Empty = served at the root. travish.com starts it with BASE_PATH=/chat.
ENV BASE_PATH=

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY server.js index.html ./
COPY static ./static

# The `node` user ships with the image; nothing here needs root.
USER node
EXPOSE 8081
CMD ["node", "server.js"]
