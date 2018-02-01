FROM node:8-alpine

RUN apk add --update git

ADD . /app
WORKDIR /app

RUN yarn
RUN yarn build
RUN yarn build-server

ENV ANALYSIS_APP alpha

EXPOSE 3000
CMD yarn serve
