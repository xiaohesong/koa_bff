const uuidv1 = require('uuid/v1');
const path = require('path');
var fs = require('fs');
const needTypes = ['cars', 'drivers'];


const { query } = require('../../../mysql/mysql')
async function selectAllData( ) {
  let sql = 'SELECT * FROM user'
  let dataList = await query( sql )
  return dataList
}

async function getData() {
  let dataList = await selectAllData()
  console.log( "dataList", dataList )
}

async function index(ctx) {
  const uid = uuidv1()
  const file = ctx.request.files.file
  const type = ctx.request.body.type

  getData()

  if(!needTypes.includes(type)){
    throw new Error('Unvalid type')
  }
  saveFile({file, type, uid})
  
}

function saveFile({file, type, uid}) {
  const basicPath = `../../../files/`
  const filesPath = buildFolder(basicPath)
  if (!fs.existsSync(filesPath)){
    console.log('不存在的地址', filesPath);
    fs.mkdirSync(filesPath);
  }
  const typePath = buildFolder(`${basicPath}${type}`)
  if (!fs.existsSync(typePath)){
    console.log('不存在的地址', typePath);
    fs.mkdirSync(typePath);
  }
  const ext = file.name.split('.').pop()
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.resolve(__dirname, `${basicPath}${type}/${uid}.${ext}`));
  reader.pipe(stream);
}

function buildFolder(url) {
  return path.resolve(__dirname, `${url}`)
}

exports.car_info = index



