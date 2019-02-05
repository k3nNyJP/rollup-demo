FROM node:8.15.0

WORKDIR /usr/local/src
ADD . /usr/local/src

RUN npm ci && npm run build

CMD ["npm", "start"]
