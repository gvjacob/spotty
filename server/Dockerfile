FROM node:current

RUN mkdir /usr/spotty

WORKDIR /usr/spotty/server

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
