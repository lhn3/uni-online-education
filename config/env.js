// h5端主机 名（域名）前缀
let HOST_H5 = 'https://www.mengxuegu.com/#/'

if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
	HOST_H5 = 'https://static-3f6cc99f-e041-4662-9069-5c1175816bf6.bspapp.com/#/'
}else{
    console.log('生产环境')
}

export {
	HOST_H5
}
