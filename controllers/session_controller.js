const {post} = require('../axios')
async function login(ctx) {
  console.log('aiy', ctx.params, ctx.request.body)
  const loginer = await post('login', ctx.request.body)
  ctx.body = loginer
}

exports.login = login 