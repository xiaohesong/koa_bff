const axios = require('axios');
const {readExcel} = require('./excel');

function init(cookie = 'acw_tc=781bad2215647164759254537e53922c9bb4a017ddf233e12458f634c12ee8'){
	function query(path){
		const PATH='https://zjyz.zjt.gov.cn';
		return axios.get(`${PATH}${encodeURI(path)}`, {
			headers: {
				'User-Agent': 'User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3871.0 Safari/537.36',
				Cookie: cookie,
				Host: 'zjyz.zjt.gov.cn'
			}
		}).then(d => d.data)
	}

	function crawler(type, filePath){
		let ar = []
		const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

		async function generator(){
			
			const datas = readExcel(filePath)
			
			for(let item of datas){
				await sleep(1500);
				const querier= (function(item) {
					switch(type){
						case 'cars':
							return `{"serviceName":"ZJYG_VHCL_BASEINFO5","CPHM": "${JSON.stringify(item['车牌号'])}"}`
						case 'drivers':
							return `{"serviceName":"ZJYG_PER_BASEINFO1","XM":"${JSON.stringify(item['姓名'])}","ZGZH":"${JSON.stringify(item['资格证号'])}"}`
						default:
							return null
					}
				})(item)
				const path = `/service/queryData.action?query=${querier}`
				ar.push(query(path))
			}
			return ar
		}
	
		async function run() {
				await generator()
				Promise.all(ar).then(d => {
					d.forEach(i => console.log(i.aaData))
				})
		}
	
		run()
	}
	
	return crawler
}

exports.init = init