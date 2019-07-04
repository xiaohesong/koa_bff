async function setHeader(ctx, next){
  console.log('这里是先设置header');
  
  if(ctx.method !== 'options'){
    let token = ctx.request.headers['user-token']
    if(!token){
      console.log('不存在token', ctx.method, ctx.path)
      ctx.request.headers['user-token'] = ctx.header['user-token']
    }
  }
  await next()
}

exports.userHeader = setHeader