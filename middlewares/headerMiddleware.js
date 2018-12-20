async function setHeader(ctx, next){
  console.log('这里是先设置header');
  
  if(ctx.method !== 'options'){
    let token = ctx.request.headers['skio-token']
    if(!token){
      console.log('不存在token', ctx.method, ctx.path)
      ctx.request.headers['skio-token'] = ctx.header['skio-token']
    }
  }
  await next()
}

exports.skioHeader = setHeader