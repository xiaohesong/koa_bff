const {get} = require('../../axios')

async function sts(ctx) {
  const result = await get('aliyun/sts', ctx.query, ctx.headers['user-token'])
  console.log('result sts is', result)
  ctx.body = result
  ctx.status = result.code
}
exports.sts = sts