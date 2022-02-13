FROM node:12.20.0-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


FROM node:12.20.0-alpine
RUN mkdir -p /app/node_modules
RUN chown -R node:node /app
USER node
WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm install --production

COPY  --chown=node:node --from=builder /app/dist ./

ENV NODE_ENV production
EXPOSE 80

CMD [ "node", "./src/main.js" ]
