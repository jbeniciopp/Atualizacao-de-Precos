FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

ENTRYPOINT ["npm", "run"]

CMD ["start"]