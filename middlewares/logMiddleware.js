exports.logMiddleware = logMiddleware

async function logMiddleware(ctx, next){
  const start = Date.now()
  // console.time(`Execute ${ctx.method} ${ctx.path} Request Spent`)
  await next()
  const end = Date.now()
  console.log(`Execute ${ctx.method} ${ctx.path} Request Spent ${end - start} ms`)
}