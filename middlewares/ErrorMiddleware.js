const ERROR_502 = 'Network Error'

async function errorMiddleware(ctx, next){
  try {
    await next();
  } catch(error) {
    handleError(error, ctx)
  }
} 

function handleError(error, ctx) {
  console.log('出现异常，开始捕获', error.status);
  
  // console.log('KOA_BFF error is', error.response)
  if (error.response) {
    // console.log("Error Response", error.response);
    checkReturnStatus(error.response, ctx)
    // return error.response
  } else if (error.request) {
    console.log('middleware request error', error.message)
    // console.log("Request Error", error.request, error.message);
    if (error.message === ERROR_502) {
      // console.log(`服务器异常${error.message}`, 5)
      ctx.status = 502
      ctx.body = `服务器异常${error.message}`
      return
      // throw error.message
    }
    throw error
  } else {
    console.log('Error', error.message, error.status);
    ctx.status = 510
    ctx.body = `Not Response Error And Request Error, ${error.message}`
    return // throw error
  }
}


function checkReturnStatus(res, ctx) {
  console.log('koa bff checkReturnStatus', res.status, res.data);
  let result = {code: res.status, msg: `${res.status}, ${res.statusText}`, data: ''}
  // throw JSON.stringify(result)
  ctx.status = res.status
  ctx.body = result
  return
  switch (res.status) {
    case 500:
      result.data = '服务器内部错误'
      ctx.throw(res.status, JSON.stringify(result))
    case 404:
      result.data = '请求的资源不存在,请确认是否存在该资源!'
      ctx.throw(res.status, JSON.stringify(result))
    case 400:
      const msg = (res.data && res.data.msg) || '请求参数存在问题'
      result.data = msg
      ctx.throw(res.status, JSON.stringify(result))
    case 401:
      // console.log("登录会话过期,请重新登录", 5)
      result.data = '登录会话过期，请重新登陆'
      ctx.throw(res.status, JSON.stringify(result))
    case 403:
      result.data = '无权限访问'
      ctx.throw(res.status, JSON.stringify(result))
    default:
      result.data = `未捕获${res.status}错误，如出现请反馈!`
      ctx.throw(res.status, JSON.stringify(result))
  }
  // ctx.throw(res.status, JSON.stringify(result))
}

exports.errorMiddleware = errorMiddleware