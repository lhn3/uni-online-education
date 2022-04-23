<template>
	<view>
		<course-detail-header :course="courseDetail"></course-detail-header>
		<view class="course-details" :style="{'height':`${pageHeight}px`}">
			<tab-bar :tabs="tabs" :itemWidth="87.5" @changeTab="changeTab" ref="tabBar"></tab-bar>
			<!-- 分类内容 -->
			<swiper :duration="500" circular :current="current" class="swiper-box" @change="changeSwiper">
				<swiper-item class="swiper-box" v-for="item in tabs" :key="item.id">
					<scroll-view :scroll-y="isScroll" class="scroll-box" :upper-threshold="0" @scrolltoupper="toupper">
						<view class="details-info">
							<course-info v-if="tabId == 1" :detailUrls="courseDetail.detailUrls"></course-info>
							<course-section v-if="tabId == 2" ref="sectionRef" :chapterList="courseSection" @openVideo="openVideo" :isBuy="isBuy" :isFree="courseDetail.isFree"></course-section>
							<course-comment v-if="tabId == 3" :commentList="courseComment"></course-comment>
							<course-package v-if="tabId == 4" :groupList="coursePackage"></course-package>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 购买/观看按钮 -->
		<bottom-btn :btnText="isBuy || courseDetail.isFree == 1?'立即观看':'立即购买'" @clickBottom="clickBottom"></bottom-btn>
		
		<!-- 分享组件 -->
		<!-- #ifdef APP-PLUS -->
		<my-share ref="myShare" :shareDate="courseDetail"></my-share>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS -->
		<my-share ref="myShare" :providerList="providerList" :shareDate="courseDetail"></my-share>
		<!-- #endif -->
		
		<!-- 试看组件 -->
		<view class="video-box mask" @touchmove.stop.prevent="()=>{}" v-if="freeVideo">
			<view class="name">
				<text>{{videoText}}</text>
				<text class="iconfont icon-close" @click="closeVideo"></text>
			</view>
			<video id="playVideo" class="video" :src="videoUrl"></video>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick} from "vue";
import { onNavigationBarButtonTap,onReachBottom,onPageScroll } from '@dcloudio/uni-app';
import courseDetailHeader from './cpns/course-detail-header.vue'
import courseInfo from './cpns/course-info.vue'
import courseSection from './cpns/course-section.vue'
import courseComment from './cpns/course-comment.vue'
import coursePackage from './cpns/course-package.vue'
import bottomBtn from './cpns/bottom-btn.vue'
import {getCourseDetail,getCourseSection,getCourseComment,getCoursePackage,getCourseIsBuy} from '@/request/course-api.js'
export default {
	components:{
		'course-detail-header':courseDetailHeader,
		'course-info':courseInfo,
		'course-section':courseSection,
		'course-comment':courseComment,
		'course-package':coursePackage,
		'bottom-btn':bottomBtn
	},
	setup(){
		let {proxy} = getCurrentInstance()
		let tabs = ref([		//tab栏标签
			{id:1,name:'详情'},
			{id:2,name:'章节'},
			{id:3,name:'评论'},
			{id:4,name:'套餐'}
		])
		let tabBar = ref(null)		//标签组件
		let myShare = ref(null)		//分享组件
		let sectionRef = ref(null)		//章节组件
		let providerList = ref([	//h5分享页面数据
			{id: 'weixin',name: '微信好友',sort:0,icon: '/static/share/weixin.png'},
			{id: 'weixin',name: '朋友圈',type:'WXSenceTimeline',sort:1,icon: '/static/share/pengyouquan.png'},
			{id: 'sinaweibo',name: '新浪微博',sort:2,icon: '/static/share/weibo.png'},
			{id: 'qq',name: 'QQ好友',sort:3,icon: '/static/share/qq.png'},
			{id: 'copy',name: '复制链接',sort: 4,icon: '/static/share/link.png'}
		])
		let state = reactive({
			id:null,
			pageHeight:0,		//页面视口可使用的高度
			statusNavHeight:0,	//状态栏+导航栏的高度
			detailToTop:0,		//详情区距离顶部距离
			tabId:0,			//选择的标签id
			current:0,			//轮播图索引
			isScroll:false,		//滚动区是否可以滚动
			isBuy:false,		//是否已经购买此课程
			freeVideo:false,	//试看组件是否展示
			videoUrl:null,		//试看视频地址
			videoText:"",		//试看视频标题
			videoContext:null,	//播放实例
			
			courseDetail:{},	//课程详情
			courseSection:[],	//章节
			courseComment:[],	//评论
			coursePackage:[]	//套餐
		})
		
		//页面触底事件--------------------------------------------
		onReachBottom(() => {
			state.isScroll = true
		})
		// 滚动区滚动到顶部事件
		let toupper = () => {
			state.isScroll = false
			uni.pageScrollTo({
				scrollTop:0
			})
		}
		//页面滚动实时监听事件(头部页面展示出时也禁用分类区滚动)
		onPageScroll((event) => {
			if(event.scrollTop < state.detailToTop - state.statusNavHeight){
				state.isScroll = false
			}else{
				state.isScroll = true
			}
		})
		
		// 点击标签，改变轮播图，页面滚动到底部
		let changeTab = (id) => {
			state.tabId = id,
			state.current = id - 1
			uni.pageScrollTo({
				scrollTop:state.detailToTop
			})
			
		}
		//滑动轮播图,改变tabId和组件中保持选中的id
		let changeSwiper = (event) => {
			state.tabId = event.detail.current + 1
			tabBar.value.tabId = event.detail.current + 1
		}
		//监听导航栏按钮点击
		onNavigationBarButtonTap((e)=>{
			if(e.type="share"){
				myShare.value.isShow=!myShare.value.isShow
			}
		})
		
		// 点击视频或立即观看进入试看组件或观看页面---------------------------------------------
		//立即购买按钮
		let clickBottom = () => {
			if(state.isBuy || state.courseDetail.isFree == 1){
				console.log('立即观看')
				proxy.navTo('/pages/course/course-play?id='+state.id)
			}else{
				console.log('立即购买')
				if(proxy.$utils.isLogin()){
					// proxy.navTo('/pages/order/confirm-buy?detail='+encodeURIComponent(JSON.stringify(state.courseDetail)))
					proxy.navTo('/pages/order/confirm-buy?detail='+JSON.stringify(state.courseDetail))
				}
			}
		}
		// 点击视频
		let openVideo = async (itemInfo) => {
			// 判断单个视频是否免费，判断此课程是否免费,并且没买的情况下
			console.log(itemInfo)
			if((itemInfo.section.isFree || state.courseDetail.isFree) && !state.isBuy){
				uni.request({
					url:itemInfo.section.videoUrl,
					method:'GET',
					success:(res)=> {
						state.videoUrl = res.data.data.url	//设置播放url
					},
					complete: () => {
						state.videoText = itemInfo.section.name		//播放标题
						state.freeVideo = true				//弹出框
						nextTick(()=>{
							state.videoContext.play()			//手动播放
						})
					}
				})
			}else if(state.isBuy){
				//判断是否购买课程，购买了课程就进入观看页面(非试看组件)
				sectionRef.value.actSect=itemInfo.section.name	//修改子组件中数据
				proxy.navTo('/pages/course/course-play?id='+state.id)
			}else{
				proxy.$message.toast('课程尚未购买，无法观看')
			}

		}
		// 关闭试看组件
		let closeVideo = () => {
			state.freeVideo = false
			state.videoContext.stop()
			state.videoUrl = ''
			state.videoText = ''
		}
		return{
			tabs,
			tabBar,
			myShare,
			sectionRef,
			providerList,
			...toRefs(state),
			
			changeTab,
			changeSwiper,
			toupper,
			clickBottom,
			openVideo,
			closeVideo
		}
	},	
	methods:{
		//获取当前页面可使用高度
		getHeight(){
			let res = uni.getSystemInfoSync()
			let sys = res.platform				//平台信息
			// 获取状态栏+导航栏高度
			if(sys == 'android'){
				this.statusNavHeight = res.statusBarHeight + 48
			}else if(sys = 'ios'){
				this.statusNavHeight = res.statusBarHeight + 44
			}
			// -40手机原因
			// #ifdef APP-PLUS
			this.pageHeight = res.screenHeight - this.statusNavHeight-40
			// #endif
			// #ifndef APP-PLUS
			this.pageHeight = res.screenHeight - this.statusNavHeight
			// #endif
			
		},
		// 获取页面数据
		async getPageInfo(id){
			this.courseDetail = await getCourseDetail(id)
			// 修改页面标题
			uni.setNavigationBarTitle({
				title:this.courseDetail.title
			})
			this.courseSection = await getCourseSection(id)
			this.courseComment = await getCourseComment(id)
			this.coursePackage = await getCoursePackage(id)
			// 判断是否登录了
			if(this.$utils.isLogin(false)){
				this.isBuy = (await getCourseIsBuy(id)).isBuy
			}
		}
	},
	onLoad(option) {
		if(option.id){
			this.id=option.id
			// 获取页面信息
			this.getPageInfo(this.id)
		}
		//获取当前页面可使用高度
		this.getHeight()
		
		// 禁用app端点击状态栏回到顶部
		// #ifdef APP-PLUS
		let webView=this.$scope.$getAppWebview()
		webView.setStyle({"scrollToTop":false})
		// #endif
	},
	onReady() {
		// 获取详情到顶部距离的高度
		let view=uni.createSelectorQuery().in(this).select(".course-details")
		view.fields({
			rect:true
		},data=>{
			this.detailToTop=data.top
		}).exec()
		//获取播放实例
		this.videoContext=uni.createVideoContext('playVideo',this)
	},
	// 小程序分享
	onShareAppMessage(res){
		return{
			title:this.courseDetail.title,
			path:this.$utils.routePath()
		}
	}
}
</script>

<style lang="scss">
.course-details {
	overflow: hidden;
	.swiper-box, .scroll-box {
		height: 100%;
	}
	.details-info {
		// 被隐藏的80rpx（标签选项卡高度）
		padding-bottom: 200rpx;
	}
}

.video-box {
	z-index: 100;
	text-align: center;
	.name{
		color: #FFFFFF;
		position: relative;
		top: 380rpx;
		/* #ifdef MP */
		top: 300rpx;
		/* #endif */
		font-size: 38rpx;
		font-weight: bold;
	}
	.icon-close{
		margin-left: 20rpx;
	}
	.video {
		width: 750rpx;
		height: 420rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
