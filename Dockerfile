FROM node:lts

EXPOSE 3000

WORKDIR /app
COPY . .

RUN npm ci
RUN npm i --global fastify-cli

CMD ["npm", "start"]