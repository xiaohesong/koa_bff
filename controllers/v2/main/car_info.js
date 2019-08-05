const XLSX = require('xlsx');
var formidable = require('formidable');
// const {get} = require('../../axios')

async function index(ctx) {

  const file = ctx.request.files.file
  console.log("ctx params is", file.name, file.path, "++")
  // const workbox = XLSX.read("example.xlsx", {path: "../../../files/cars/"})
  const workbox = XLSX.read(file.name, {path: file.path})

  var result = {};
	workbox.SheetNames.forEach(function(sheetName) {
		var worksheet = workbox.Sheets[sheetName];
		result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
	});	
  console.log("打印表信息",JSON.stringify(result, 2, 2));  //显示格式{"表1":[],"表2":[]}

  const sheetName = workbox.SheetNames.shift()
  const {A1, A2} = workbox.Sheets[sheetName]
  const aiyou = XLSX.utils.sheet_to_json(workbox.Sheets[sheetName])
  console.log('aiyou is', aiyou, "workbox.Sheets[sheetName]", workbox.Sheets[sheetName])
  // console.log('xlsx is', workbox, 'A1 is', JSON.stringify(A2))
  let title = '营运车辆管理'
  ctx.body = {result: title, A1, A2}
}
exports.car_info = index