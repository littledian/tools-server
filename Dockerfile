FROM node:16.14.2-alpine3.15 AS builder

WORKDIR /usr/src/app

COPY package.json ./
RUN npm set-script prepare ""
RUN npm install glob rimraf
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:16.14.2-alpine3.15

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
RUN npm set-script prepare ""
RUN npm install --only=production
COPY . .
COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
