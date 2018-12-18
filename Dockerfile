# FROM daocloud.io/library/node:8.12.0
FROM keymetrics/pm2:latest-alpine

ARG app_env
ENV APP_ENV $app_env

# Set workspace
ENV WORK_ROOT /www/koa_bff
RUN mkdir -p $WORK_ROOT
WORKDIR $WORK_ROOT

RUN npm i pm2 -g

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules $WORK_ROOT

COPY example.env.${APP_ENV} .env.${APP_ENV}

# Bundle app source
COPY . .

CMD pm2 start pm2.config.js --env $APP_ENV
# CMD [ "pm2-runtime", "start", "pm2.config.js", "--env", "staging" ]
