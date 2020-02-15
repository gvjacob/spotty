FROM node:current

RUN mkdir /usr/spotty

WORKDIR /usr/spotty/client

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
