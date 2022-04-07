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
							<course-section v-if="tabId == 2" :chapterList="courseSection"></course-section>
							<course-comment v-if="tabId == 3" :commentList="courseComment"></course-comment>
							<course-package v-if="tabId == 4" :groupList="coursePackage"></course-package>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<bottom-btn btnText="立即购买" @clickBottom="clickBottom"></bottom-btn>
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
import {getCourseDetail,getCourseSection,getCourseComment,getCoursePackage} from '@/request/course-api.js'
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
		let state = reactive({
			id:0,
			pageHeight:0,		//页面视口可使用的高度
			statusNavHeight:0,	//状态栏+导航栏的高度
			detailToTop:0,		//详情区距离顶部距离
			tabId:0,			//选择的标签id
			current:0,			//轮播图索引
			isScroll:false,			//滚动区是否可以滚动
			
			courseDetail:{},	//课程详情
			courseSection:{},	//章节
			courseComment:{},	//评论
			coursePackage:{}	//套餐
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
		
		//立即购买按钮
		let clickBottom = () => {
			console.log('立即购买')
		}
		return{
			tabs,
			tabBar,
			...toRefs(state),
			
			changeTab,
			changeSwiper,
			toupper,
			clickBottom
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
			this.pageHeight = res.screenHeight - this.statusNavHeight
		},
		// 获取页面数据
		async getPageInfo(){
			this.courseDetail = await getCourseDetail(this.id)
			this.courseSection = await getCourseSection(this.id)
			this.courseComment = await getCourseComment(this.id)
			this.coursePackage = await getCoursePackage(this.id)
		}
	},
	onLoad(option) {
		if(option.id){
			this.id=option.id
			// 获取页面信息
			this.getPageInfo()
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
