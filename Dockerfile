FROM node:10.6

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
COPY . .
EXPOSE 3000
CMD npm run start