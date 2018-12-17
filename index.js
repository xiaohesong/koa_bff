const config = require('./config')
const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json')

const app = new Koa();
const router = new Router();

app.use(json())

router.get('/', list)
// server.listen(config.port, config.hostname, () => {
//     console.log(`Server running at http://${config.hostname}:${config.port}/`);
// });

function list(ctx){
  console.log('ctx is', ctx, 'params is', ctx.params)
  ctx.body = {a: 'a', name: 'list'}
}

app.use(router.routes());

app.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
