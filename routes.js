exports = module.exports = [{
  method: 'GET',
  path: '/api/user',
  moduleFunc: 'user.userById'
}, {
  method: 'POST',
  path: '/api/user',
  moduleFunc: 'user.createUser'
}];