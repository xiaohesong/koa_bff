const XLSX = require('xlsx');

function readExcel(path){
	const workbox = XLSX.readFile(path)
	const sheetName = workbox.SheetNames[0]
	const object = XLSX.utils.sheet_to_json(workbox.Sheets[sheetName])
	console.log('READFILE is', object)
	return object
}

exports.readExcel = readExcel