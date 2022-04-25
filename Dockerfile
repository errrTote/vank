FROM node:16

# Create app directory, this is in our container/in our image
WORKDIR /vank/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/main" ]