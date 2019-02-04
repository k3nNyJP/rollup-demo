FROM node:8.15.0

ADD . /usr/local/src
WORKDIR /usr/local/src

RUN npm ci && npm run build

CMD ["npm", "start"]
