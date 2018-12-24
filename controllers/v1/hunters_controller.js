const {get} = require('../../axios')

async function hunters(ctx) {
  const {query} = ctx
  const result = await get('v1/contracts', query, ctx.headers['skio-token'])
  ctx.status = result.code
  ctx.body = result
}
exports.hunters = hunters