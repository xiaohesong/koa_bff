const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const cars = require('./controllers/v2/main/car_info')
const getClientEnvironment = require('./config/env')
getClientEnvironment(process.env.NODE_ENV)

const middlewares = require('./middlewares')
const config = require('./config');
const routes = require('./routes');

const app = new Koa();
const router = new Router();

// app.use(middlewares.skioHeader)
app.use(middlewares.crossOrigin)
app.use(middlewares.errorMiddleware);



// app.use(views(path.join(__dirname, './view'), {
//   extension: 'ejs'
// }))

// app.use( async ( ctx ) => {
//   let title = 'hello koa2'
//   await ctx.render('index', {
//     title,
//   })
// })

app.use(bodyParser());

app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024	// 设置上传文件大小最大限制，默认2M
  }
}));

app.use(middlewares.logMiddleware)

app.on('error', err => {
  console.error('server error', err)
});


router.get('/', home)

// router.post('/car_info', koaBody(), cars.index)

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
