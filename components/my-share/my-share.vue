<template>
	<view v-show="isShow">
		<!-- 遮罩蒙层 -->
		<view @click="showHandler" class="mask" @touchmove.stop.prevent="()=>{}"></view>
		<view class="share-body">
			<scroll-view scroll-x class="share-scroll noScorll">
				<view class="share-item" @click="share(item)"
					v-for="(item, index) in providerList" :key="index"
				>
					<image :src="item.icon"></image>
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
			
			<view class="share-cancel" @click="showHandler">取消</view>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick,watch} from "vue";
export default {
	props:{
		// #ifndef APP-PLUS
		providerList:{
			type:Array,
			default:()=>[]
		},
		// #endif
		shareDate:{
			type:Object,
			default:()=>({})
		}
	},
	setup(props){
		let {proxy} = getCurrentInstance()
		let isShow = ref(false)
		let state = reactive({
			title:"share",
			shareText:"分享给你就给老子点开看！", 
			href:"https://www.baidu.com/",
			image:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2020-06-04%2F5ed8a4d5881c6.jpg&refer=http%3A%2F%2Fpic1.win4000.com",
			shareType:0,//0图文，1文字，2图片
			providerList:[]//提供商	
		})
		// 初始化分享数据
		watch(()=>props.shareDate,(newValue)=>{
			if(Object.keys(newValue).length>0){
				if(newValue.title) state.title = newValue.title;
				if(newValue.mainImage) state.image = newValue.mainImage;
				state.href = proxy.$env.HOST_H5 + proxy.$utils.routePath()
			}
		})
		// #ifdef APP-PLUS
		onMounted(()=>{
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [] // 提供商
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({name: '微信好友',id: 'weixin',sort:0,icon: '/static/share/weixin.png'})
								data.push({name: '朋友圈',id: 'weixin',type:'WXSceneTimeline',sort:1,icon: '/static/share/pengyouquan.png'})
								break;
							case 'sinaweibo':
								data.push({name: '新浪微博',id: 'sinaweibo',sort:2,icon: '/static/share/weibo.png'})
								break;
							case 'qq':
								data.push({name: 'QQ好友',id: 'qq',sort:3,icon: '/static/share/qq.png'})
								break;
							default:
								break;
						}
					}
					data.push({name: '复制链接',id: 'copy',sort: 4,icon: '/static/share/link.png'})
					state.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					uni.showModal({
						content:'获取分享通道失败',
						showCancel:false
					})
				}
			});
		})
		// #endif
		
		//关闭分享弹窗
		const showHandler=()=>{
			isShow.value=false
		}
		
		//点击不同分享进行分享动作
		const share=(e)=>{
			//#ifndef APP-PLUS
			proxy.$message.toast('分享失败！','error')
			isShow.value = false
			// #endif
			//#ifdef APP-PLUS
			console.log('分享通道:'+ e.id +'； 分享类型:' + state.shareType);
			// 复制链接
			if(e.id === 'copy') {
				uni.setClipboardData({
					data: state.href,
					success: () => {
						uni.hideToast()// 隐藏默认提示
						proxy.$message.toast('已复制到剪贴板')
					}
				});
				isShow.value=false
				return
			}
			
			// 加载中
			uni.showLoading()
			if(!state.shareText && (state.shareType === 1 || state.shareType === 0)){
				uni.showModal({
					content:'分享内容不能为空',
					showCancel:false
				})
				uni.hideLoading()
				return;
			}
			
			if(!state.image && (state.shareType === 2 || state.shareType === 0)){
				uni.showModal({
					content:'分享图片不能为空',
					showCancel:false
				})
				uni.hideLoading()
				return;
			}
			
			let shareOPtions = {
				provider: e.id,
				scene: e.type && e.type === 'WXSceneTimeline' ? 'WXSceneTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
				type: state.shareType,
				success: (e) => {
					console.log('success', e);
					uni.showModal({
						content: '已分享',
						showCancel:false
					})
				},
				fail: (e) => {
					console.log('fail', e)
					uni.showModal({
						content: e.errMsg,
						showCancel:false
					})
				},
				complete:()=>{
					console.log('分享操作结束!')
				}
			}
			
			switch (state.shareType){
				case 0:
					shareOPtions.summary = state.shareText;
					shareOPtions.imageUrl = state.image;
					shareOPtions.title = state.title;
					shareOPtions.href = state.href;
					break;
				case 1:
					shareOPtions.summary = state.shareText;
					break;
				case 2:
					shareOPtions.imageUrl = state.image;
					break;
				case 5:
					shareOPtions.imageUrl = state.image ? state.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
					shareOPtions.title = '欢迎体验uniapp';
					shareOPtions.miniProgram = {
						id:'gh_33446d7f7a26',
						path:'/pages/tabBar/component/component',
						webUrl:'https://uniapp.dcloud.io',
						type:0
					};
					break;
				default:
					break;
			}
			
			if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
				// proxy.compress().then(res=>{
				// 	shareOPtions.imageUrl = res
				// });
			}
			if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
				shareOPtions.href = state.href;
				shareOPtions.title = state.title;
			}
			// 隐藏加载中
			uni.hideLoading()
			uni.share(shareOPtions);
			// #endif
		}
		return{
			isShow,
			// #ifdef APP-PLUS
			...toRefs(state),
			// #endif
			
			showHandler,
			share
		}
	},
	methods:{
		compress(){//压缩图片 图文分享要求分享图片大小不能超过20Kb
			console.log('开始压缩');
			let img = this.image;
			return new Promise(async (res) => {
				// var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
				// console.log('after' + localPath);
				if(img.startsWith('http')) {
					//下载网络图片到本地，返回本地存储的临时文件
					img = await this.fileDownload(img)
				}
				// 压缩size
				plus.io.resolveLocalFileSystemURL(img, (entry) => {
				// plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
					entry.file((file) => {// 可通过entry对象操作图片 
						console.log('getFile:' + JSON.stringify(file));
						if(file.size > 20480) {// 压缩后size 大于20Kb
							plus.zip.compressImage({
								src: img,
								dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
								width: '10%',
								height: '10%',
								quality: 1,
								overwrite: true
							}, (event) => {
								// console.log('success zip****' + event.size);
								let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
								res(newImg);
							}, function(error) {
								uni.showModal({
									content:'分享图片太大,需要请重新选择图片!',
									showCancel:false
								})
							});
						}
					});
				}, (e) => {
					console.log('Resolve file URL failed: ' + e.message);
					uni.showModal({
						content:'分享图片太大,需要请重新选择图片!',
						showCancel:false
					})
				});
			})
		},
		fileDownload(url){
			return new Promise((resolve,reject)=>{
				uni.downloadFile({
					url,
					success:(res)=>{
						resolve(res.tempFilePath)
					},
					fail:()=>{
						this.$message.toast('图片下载失败！','error')
					}
				})
			})
		}
	}
}
</script>

<style lang="scss">
.mask {
	z-index: 99;
	position: fixed;
	top: 0;
	left:0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0, 0.6);
}

.share-body {
	z-index: 100;
	position: fixed;
	left:50;
	width: 100%;
	bottom: 0;
	margin: auto;
	.share-scroll {
		border-radius: 30rpx 30rpx 0 0;
		background-color: #f7f7f7;
		width: 100%;
		height: 200rpx;
		display: flex;
		white-space: nowrap;
		padding-top: 45rpx;
		.share-item {
			display: inline-flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 25%;
			image{
				width: 60rpx;
				height: 60rpx;
			}
			view {
				color: $mxg-text-color-grey;
				font-size: 25rpx;
				padding-top: 10rpx;
			}
		}
	}
	.share-cancel {
		background-color: #fff;
		text-align: center;
		width: 100%;
		padding: 25rpx 0;
	}
}
</style>
