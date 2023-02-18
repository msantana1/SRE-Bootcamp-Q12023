FROM node:18-alpine

RUN mkdir -p /src/node_modules && chown -R node:node /src

WORKDIR /src

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8000

CMD [ "node", "index.js" ]
