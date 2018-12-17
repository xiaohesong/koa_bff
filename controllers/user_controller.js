exports.userById = userById;
exports.getUsers = getUsers;

function userById(ctx) {
  ctx.body = {id: ctx.params.id}
}

function getUsers(ctx) {
  let result = [1, 2, 3, 4, 5].map(item => ({
    id: item,
    name: `name${item}`
  }))
  ctx.body = result
}