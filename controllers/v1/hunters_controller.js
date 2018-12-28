const {get, put} = require('../../axios')

async function hunters(ctx) {
  const {query} = ctx
  const result = await get('v1/contracts', query, ctx.headers['skio-token'])
  ctx.status = 200
  ctx.body = result
}
exports.hunters = hunters

async function show(ctx) {
  const result = await get(`/v1/contracts/${ctx.params.id}`, undefined, ctx.headers['skio-token'])
  ctx.body = result
  ctx.status = 200
}
exports.show = show

async function update(ctx) {
  const result = await put(`/v1/contracts/${ctx.params.id}`, ctx.request.body, ctx.headers['skio-token'])
  ctx.body = result
  ctx.status = 200
}
exports.put = update
