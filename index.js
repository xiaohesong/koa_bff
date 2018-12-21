const Koa = require('koa');
const Router = require('koa-router');
bodyParser = require('koa-bodyparser');

// const getClientEnvironment = require('./config/env')
// getClientEnvironment(process.env.NODE_ENV)

const middlewares = require('./middlewares')
const config = require('./config');
const routes = require('./routes');

const app = new Koa();
const router = new Router();

// app.use(middlewares.skioHeader)
app.use(middlewares.crossOrigin)
app.use(middlewares.errorMiddleware);

app.use(bodyParser());

app.use(middlewares.logMiddleware)
router.get('/', home)

routes.forEach(item => {
  router[item.method](item.path, item.cb)
})

function home(ctx){
  const {NODE_ENV, INFO} = process.env
  // console.log('Root path ctx is', ctx.body, 'params is', ctx.params, 'query is', ctx.query)
  ctx.body = {a: 'aaa', name: 'home', text: '你好，我是首页', env: `env-${NODE_ENV}-info-${INFO}`}
}

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
