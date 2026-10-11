# The chat server as a container (26.1010). travish.com runs it beside the site
# and sends www.travish.com/chat/ to it; see README.md.
#
# Node's current long-term-support line, on Alpine. The tag names a release
# LINE (it moves with each Node 24 patch, so a rebuild picks up security fixes);
# pin a full version or an @sha256 digest to freeze one exact build.
#
# Alpine, not Debian (26.1010): the travish.com droplets run Docker 20.10.7,
# whose default seccomp filter refuses the clone3 system call that Debian's
# newer glibc (trixie and bookworm) uses to start threads. Node then dies on
# its first thread, "Assertion failed: (0) == (uv_thread_create(...))", exit
# 139, in a crash loop, while the same image runs fine on newer Docker (CI).
# Alpine's C library (musl) does not use clone3, so it runs on both. Docker
# fixed this in 20.10.10; once both droplets are past that, either base works.
# Every dependency is plain JavaScript, so nothing here needs glibc.
FROM node:24-alpine

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
