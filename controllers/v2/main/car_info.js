const uuidv1 = require('uuid/v1');
const path = require('path');
var fs = require('fs');
const { query } = require('../../../mysql/mysql')
const { init } = require('../../../tools/crawler')
const needTypes = ['cars', 'drivers'];

let crawler;

async function insertFile({file, type, uid}) {
  let sql = `INSERT INTO files set origin_name='${file.name}', name='${uid}.xlsx', type='${type}';`
  let result = await query( sql )
  return result
}

async function processFile(uid) {
  let sql = `update files set status='processing' where name='${uid}.xlsx';`
  let result = await query( sql )
  return result
}

async function searchFile(uid, ...args){
  let sql = `select ${args.join(',')} from files where name='${uid}.xlsx';`
  let result = await query( sql )
  return result
}

async function startCrawler(uid) {
  crawler = init(uid)
  await processFile(uid)
  const {type} = (await searchFile(uid, 'type', 'id')).shift()
  const filePath = path.resolve(__dirname, `../../../files/${type}/${uid}.xlsx`)
  console.log('这里得filePath是', filePath);
  await crawler(type, filePath)
}

async function index(ctx) {
  const uid = uuidv1()
  const file = ctx.request.files.file
  const type = ctx.request.body.type
  const fileName = file.name
  insertFile({uid, file, type})


  if(!needTypes.includes(type)){
    throw new Error('Unvalid type')
  }
  saveFile({file, type, uid})

  setTimeout(startCrawler, 6000, uid)

  ctx.body = {
    message: `已接收到${fileName}, 即将处理, ${uid}`,
    status: true
  }
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



