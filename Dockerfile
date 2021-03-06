# FROM daocloud.io/library/node:8.12.0
FROM keymetrics/pm2:latest-alpine

RUN npm config set unsafe-perm true
RUN npm install pm2 -g

ARG app_env
ENV APP_ENV $app_env

ARG PM2_PUBLIC_KEY
ARg PM2_SECRET_KEY

ENV PM2_PUBLIC_KEY $PM2_PUBLIC_KEY
ENV PM2_SECRET_KEY $PM2_SECRET_KEY

# Set workspace
ENV WORK_ROOT /www/koa_bff
RUN mkdir -p $WORK_ROOT
WORKDIR $WORK_ROOT

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules $WORK_ROOT

COPY example.env.${APP_ENV} .env.production

# Bundle app source
COPY . .

RUN npm run build

ENV SERVER_PORT 80

EXPOSE $SERVER_PORT

#8 -- server 502
# CMD pm2 start pm2.config.js --no-daemon --env $APP_ENV

#4
CMD pm2-runtime pm2.config.js --env $APP_ENV
