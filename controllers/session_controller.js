const {post, get} = require('../axios')
async function login(ctx) {
  const loginer = await post('login', ctx.request.body)
  if(loginer.code !== 200){
    ctx.body = loginer
    return
  }
  
  ctx.request.headers['user-token'] = loginer.data.token
  ctx.set('user-token', loginer.data.token)
  const sysConfig = await get(`sysConfig`, undefined, loginer.data.token)
  
  if (sysConfig.code !== 200) {
    ctx.body = sysConfig
    return
  }
  ctx.status = 200
  ctx.body = {code: 200, login: loginer.data, sysConfig: sysConfig.data}
}

exports.login = login 