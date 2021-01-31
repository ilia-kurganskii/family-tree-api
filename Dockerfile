FROM node:12.20.0-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npm run prisma:generate

COPY . .

RUN npm run build


FROM node:12.20.0-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /app/dist ./
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

ENV NODE_ENV production
EXPOSE 80

CMD [ "node", "./main.js" ]
