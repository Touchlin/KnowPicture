export function format(data, type){
	if(/(y+)/.test(type)) {
		type = type.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	
	const obj = {
		 'm+': data.getMonth() + 1,
		 'd+': data.getDate(),
		 'H+': data.getHours(),
		 'M+': data.getMinutes(),
		 'S+': data.getSeconds()
	}
	for (let k in obj) {
		if (new RegExp(`(${k})`).test(type)) {
			// console.log(RegExp.$1)
			const str = obj[k] + ''
			 type = type.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
		}
	}
	
	return type
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length)
}