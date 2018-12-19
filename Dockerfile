# FROM daocloud.io/library/node:8.12.0
FROM keymetrics/pm2:latest-alpine

RUN npm config set unsafe-perm true
RUN npm install pm2 -g

ARG app_env
ENV APP_ENV $app_env

# Set workspace
ENV WORK_ROOT /www/koa_bff
RUN mkdir -p $WORK_ROOT
WORKDIR $WORK_ROOT

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules $WORK_ROOT

COPY example.env.${APP_ENV} .env.${APP_ENV}

# Bundle app source
COPY . .

ENV SERVER_PORT 80

EXPOSE $SERVER_PORT

#5 -- server 503
# CMD pm2 start pm2.config.js --env $APP_ENV

# 6 -- server 503
# CMD pm2 pm2.config.js --env $APP_ENV

#7  -- server 502
# CMD pm2-runtime start pm2.config.js --env $APP_ENV

#8 -- server 502
# CMD pm2 start pm2.config.js --no-daemon --env $APP_ENV

#9 -- server 502 --dev
# CMD ["pm2", "start", "pm2.config.js", "--no-daemon"]

# CMD [ "pm2-runtime", "start", "pm2.config.js", "--env", "staging" ]
# CMD npm run $APP_ENV

#3 -- server 502
# CMD ["pm2-runtime", "pm2.config.js"]

#4
CMD pm2-runtime pm2.config.js --env $APP_ENV