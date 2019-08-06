const uuidv1 = require('uuid/v1');
const path = require('path');
var fs = require('fs');
var os = require('os');
const needTypes = ['cars', 'drivers'];

async function index(ctx) {
  const uid = uuidv1()
  const file = ctx.request.files.file
  const type = ctx.request.body.type
  if(!needTypes.includes(type)){
    throw new Error('Unvalid type')
  }
  const ext = file.name.split('.').pop()
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.resolve(__dirname, `../../../files/${type}/${uid}.${ext}`));
  reader.pipe(stream);
  
}
exports.car_info = index



