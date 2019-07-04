const {get} = require('../../axios')

async function queryExcludeTrust(ctx) {
  const result = await get(`v1/users/queryExcludeTrust`, ctx.query, ctx.headers['user-token'])
  ctx.body = result
}
exports.queryExcludeTrust = queryExcludeTrust