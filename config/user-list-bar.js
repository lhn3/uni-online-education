import store from '@/store/index.js'

const rightIcon = 'iconfont icon-right'
const userInfo = store.state
export default ()=>{
	return [
		[
			{
				title: '头像',
				event: 'chooseImg',
				src:  userInfo.imageUrl || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.doubanio.com%2Fview%2Frichtext%2Flarge%2Fpublic%2Fp206989042.jpg&refer=http%3A%2F%2Fimg2.doubanio.com&app=2002&size=f9999,10000',
				rightIcon,
			},
			{
				title: '用户名',
				event: 'editUsername',
				text: userInfo.username,
				rightIcon,
			},
			{
				title: '手机号',
				event: 'editMobile',
				text: userInfo.mobile,
				rightIcon,
			}
		],
		
		[
			{
				title: '昵称',
				event: 'editName',
				text: userInfo.nickName,
				rightIcon,
			},
			{
				title: '性别',
				event: 'chooseSex',
				text:  userInfo.sex?'男':'女',
				rightIcon,
			}
		]
	]
} 