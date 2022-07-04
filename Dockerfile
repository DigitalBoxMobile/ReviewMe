FROM node:10-alpine

WORKDIR /reviewme

COPY . .

RUN npm install

CMD ["npm", "run", "start", "/config/config.json"]
