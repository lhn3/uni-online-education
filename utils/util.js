/**
 * toast 提示
 */
export const msg = (title = '', param={}) => {
	if(!title) return;
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}

/**
 * 检查登录
 * @return {Boolean}
 */
export const isLogin = (options={}) => {
	const token = uni.getStorageSync('mxgEducationToken');
	if(token){ // 加上!先暂时表示已经登录
		return true;
	}
	// options.nav只要传的不是 false，默认跳转到登录页
	if(options.nav !== false){
		// console.log('options.nav', options.nav)
		uni.navigateTo({
			url: '/pages/auth/login'
		})
	}
	return false;
}

// 节流，是否正在运行，防止多次请求
let _throttleRunning = false
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms  
 */
export const throttle = (fn, delay=500) => {
	// 正在运行，这次结束
	if(_throttleRunning){
		return;
	}
	//标识正在运行
	_throttleRunning = true;
	
	// 延时delay毫秒后运行，结束后标识运行结束
	setTimeout(() => {
		fn();
		_throttleRunning = false;
	}, delay);
}

/**
 * 获取当前页面的路由地址+参数
 */
export const routePath = () => {
	// 获取所有页面对象
	const pages = getCurrentPages();
	// 获取当前页面实例
	const page = pages[pages.length - 1];
	
	// 当前路由参数对象 {id: 2, name: 'xx'}
	// 在小程序或app中，使用 page.options ; H5端使用 page.$route.query
	const query = page.options || page.$route.query;
	// 将参数对象转换为 key1=value1&key2=value2形式
	let queryStr = '';
	query && Object.keys(query).forEach((key)=>{
		queryStr += `${key}=${query[key]}`
	});
	// 当前路由地址+参数 pages/course/course-details.vue?key1=value1&key2=value2
	return queryStr ? `${page.route}?${queryStr}`: page.route;
}

/**
 * 校验格式数据格式
 * @param 要校验的数据
 * @param 什么类型格式
 */
export const checkStr = (str, type) => {
	switch (type) {
		case 'mobile': //手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case 'tel': //座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case 'card': //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		case 'mobileCode': //6位数字验证码
			return /^[0-9]{6}$/.test(str)
		case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
			return /^([a-zA-Z0-9_]){6,18}$/.test(str)
		case 'payPwd': //支付密码 6位纯数字
			return /^[0-9]{6}$/.test(str)
		case 'postal': //邮政编码
			return /[1-9]\d{5}(?!\d)/.test(str);
		case 'QQ': //QQ号
			return /^[1-9][0-9]{4,9}$/.test(str);
		case 'weixin': //微信号
			return /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(str);
		case 'email': //邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case 'money': //金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);
		case 'URL': //网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
		case 'IP': //IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
		case 'date': //日期时间
			return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/
				.test(str)
		case 'number': //数字
			return /^[0-9]$/.test(str);
		case 'english': //英文
			return /^[a-zA-Z]+$/.test(str);
		case 'chinese': //中文
			return /^[\\u4E00-\\u9FA5]+$/.test(str);
		case 'lower': //小写
			return /^[a-z]+$/.test(str);
		case 'upper': //大写
			return /^[A-Z]+$/.test(str);
		case 'HTML': //HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
		default:
			return true;
	}
}

/**
 * @desc 格式化日期字符串
 * @param { Nubmer} - Date日期 , 时间不能大于当前时间，大于当前时间会返回“刚刚”。
 * @returns { String } 格式化后的日期字符串
     // 2012年01月10日 12:46
     //刚刚
    //16分钟前
    //今天10:10
    //昨天10:10
    //02月10日 10:10:11
    //2012年10月10日 10:10:11
 */
export const dateFormat = (date)=>{
	if(!date) return ''
	//new Date 在 ios safari浏览器有兼容性问题处理如下：ios不支持2027-2-22 16:23，需要改为2027/2/22 16:23 
	// ? 兼容 ios safari : 兼容其他浏览器
	let $this = new Date( date ) == 'Invalid Date' ? new Date( date.replace(/-/g,"/") ) : new Date(date)
	var timestamp = parseInt(Date.parse($this)) / 1000 //- 8 * 60 * 60; //（本地时间）东八区减去8小时;

	function zeroize( num ) {
			return (String(num).length == 1 ? '0' : '') + num;
	}
	var curTimestamp = parseInt(new Date().getTime() /1000); //当前时间戳
	var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
	var curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
	var tmDate = new Date( timestamp * 1000 );  // 参数时间戳转换成的日期对象

	var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
	var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
	
	
	if ( timestampDiff < 60 ) { // 一分钟以内
			return "刚刚";
	} else if( timestampDiff < 3600 ) { // 一小时前之内
			return Math.floor( timestampDiff / 60 ) + "分钟前";
	} else if ( curDate.getFullYear() == Y && curDate.getMonth()+1 == m && curDate.getDate() == d ) {
			return '今天 ' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
	} else {
			var newDate = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
			if ( newDate.getFullYear() == Y && newDate.getMonth()+1 == m && newDate.getDate() == d ) {
					return '昨天 ' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
			} else if ( curDate.getFullYear() == Y ) {
					// return  zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
					return  zeroize(m) + '月' + zeroize(d) + '日';
			} else {
					// return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
					return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日';
			}
	}
}
/**
 * @param {format} 转换后的日期格式，默认yyyy-MM-dd hh:mm:ss
 */
export function format(date, format = "yyyy-MM-dd hh:mm:ss" ){
		if(!date) return ''
		//new Date 在 ios safari浏览器有兼容性问题处理如下：
		// ? 兼容safari : 兼容其他浏览器
		let $this = new Date( date ) == 'Invalid Date' ? new Date( date.substr(0, 19) ) : new Date(date)

		let o = {
			'M+': $this.getMonth() + 1,
			'd+': $this.getDate(),
			'h+': $this.getHours(),
			'm+': $this.getMinutes(),
			's+': $this.getSeconds(),
			'q+': Math.floor(($this.getMonth() + 3) / 3),
			'S': $this.getMilliseconds()
		}
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, ($this.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
					format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
			}
		}
		return format
}
