const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config');
const routes = require('./routes');
const getClientEnvironment = require('./config/env')
getClientEnvironment(process.env.NODE_ENV)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const app = new Koa();
const router = new Router();

require('dotenv').config();
console.log('require(dotenv).config();', require('dotenv').config())
router.get('/', home)


routes.forEach(item => {
  router[item.method](item.path, item.cb)
})

function home(ctx){
  console.log('ctx is', ctx, 'params is', ctx.params, 'query is', ctx.query)
  ctx.body = {a: 'aaa', name: 'home', text: '你好，我是首页'}
}

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
