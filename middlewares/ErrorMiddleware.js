async function errorMiddleware(ctx, next){
  try {
    await next();
  } catch(e) {
    if(e.data){
      console.log('存在e.data', e.data, e.status);
      
      ctx.body = e.data
      ctx.app.emit('error', e, ctx);
      return
    }
    console.log('如果存在e.data, 这里就不会再运行')
    ctx.body = {code: e.status, msg: e.message || e};

    if (e.status === 500) {
      // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
      ctx.app.emit('error', e, ctx);
    }
  }
} 

exports.errorMiddleware = errorMiddleware