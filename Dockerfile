FROM node:lts-iron

WORKDIR /app
COPY ./package*.json .
RUN yarn install

COPY . .

CMD ["yarn", "start"]
