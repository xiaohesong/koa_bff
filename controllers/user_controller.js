exports.userById = userById;
exports.getUsers = getUsers;

const {get} = require('../axios')

function userById(ctx) {
  const {TEST} = process.env
  ctx.body = {id: ctx.params.id, test: TEST}
}

async function getUsers(ctx) {
  console.log('ctx --', ctx.path, ctx.query, ctx.header['skio-token'])
  // console.log("get('v1/users', ctx.query)", ) {"skio-tokener": ctx.header['skio-token']}
  const result = await get('v1/users', ctx.query )
  
  console.log('result is =', result, result.code === 401)
  // if (result.code !== 200) ctx.throw(result.code, JSON.stringify(result))
  // get('v1/users', ctx.query).then(data => console.log('我靠, data is', data))
  // ctx.throw(400, 'Error Message');
  ctx.body = result
}