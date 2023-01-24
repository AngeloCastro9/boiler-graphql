FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN npx prisma generate

CMD [ "yarn", "start:prod" ]

EXPOSE 8080
