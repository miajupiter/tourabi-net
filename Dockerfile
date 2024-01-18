FROM node:20.10-alpine3.19

WORKDIR /app
COPY ./package*.json .
RUN yarn install

COPY . .

RUN  yarn build

CMD ["yarn", "start"]
