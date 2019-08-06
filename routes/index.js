const {user, session, v1, aliyun, users, v2} = require('../controllers')
// console.log('aliyun is', aliyun, v2);

exports = module.exports = [
  {method: 'get', path: '/aliyun/sts', cb: aliyun.sts},
  {method: 'get', path: '/users/:id', cb: user.userById}, 
  {method: 'get', path: '/users', cb: user.getUsers},
  {method: 'get', path: '/v1/users/queryExcludeTrust', cb: v1.users.queryExcludeTrust},
  {method: 'post', path: '/login', cb: session.login},
  {method: 'get', path: '/hunters', cb: v1.hunters.hunters},
  {method: 'post', path: '/hunters', cb: v1.hunters.postHunters},
  {method: 'get', path: '/hunters/:id', cb: v1.hunters.show},
  {method: 'put', path: '/hunters/:id', cb: v1.hunters.put},
  {method: 'get', path: '/v1/contracts/export', cb: v1.hunters.export},

  {method: 'post', path: '/car_info', cb: v2.main.cars.car_info},
]; 