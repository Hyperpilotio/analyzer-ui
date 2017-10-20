FROM node:7-alpine

RUN apk add --update git

ADD . /app
WORKDIR /app

RUN npm install
RUN npm run build

ENV ANALYSIS_APP alpha

EXPOSE 3000
CMD npm run serve
