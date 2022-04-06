<template>
	<view>
		<course-detail-header></course-detail-header>
		<view class="course-details" :style="{'height':`${pageHeight}px`}">
			<tab-bar :tabs="tabs" :itemWidth="87.5" @changeTab="changeTab" ref="tabBar"></tab-bar>
			<!-- 分类内容 -->
			<swiper :duration="500" circular :current="current" class="swiper-box" @change="changeSwiper">
				<swiper-item class="swiper-box" v-for="item in tabs" :key="item.id">
					<scroll-view :scroll-y="isScroll" class="scroll-box" :upper-threshold="0" @scrolltoupper="toupper">
						<view class="details-info">
							<course-info v-if="tabId == 1"></course-info>
							<course-section v-if="tabId == 2"></course-section>
							<course-comment v-if="tabId == 3"></course-comment>
							<course-package v-if="tabId == 4"></course-package>
							<view v-for="i in 100">{{i}}</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
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
export default {
	components:{
		'course-detail-header':courseDetailHeader,
		'course-info':courseInfo,
		'course-section':courseSection,
		'course-comment':courseComment,
		'course-package':coursePackage
	},
	setup(){
		let {proxy} = getCurrentInstance()
		let id = ref(0)
		let pageHeight = ref(0)	//页面视口可使用的高度
		let statusNavHeight = ref(0)	//状态栏+导航栏的高度
		let detailToTop = ref(0)	//详情区距离顶部距离
		let tabs = ref([		//tab栏标签
			{id:1,name:'详情'},
			{id:2,name:'章节'},
			{id:3,name:'评论'},
			{id:4,name:'套餐'},
		])
		let tabId = ref(1)		//选择的标签id
		let current = ref(0)	//轮播图索引
		let tabBar = ref(null)		//标签组件
		let isScroll = ref(false)//滚动区是否可以滚动
		
		//页面触底事件--------------------------------------------
		onReachBottom(()=>{
			console.log('触底事件')
			isScroll.value=true
		})
		// 滚动区滚动到顶部事件
		let toupper=()=>{
			isScroll.value=false
			uni.pageScrollTo({
				scrollTop:0
			})
		}
		//页面滚动实时监听事件
		onPageScroll((event)=>{
			console.log(event.scrollTop,detailToTop.value-statusNavHeight.value)
			if(event.scrollTop < detailToTop.value-statusNavHeight.value){
				isScroll.value = false
			}else{
				isScroll.value = true
			}
		})
		
		// 点击标签，改变轮播图，页面滚动到底部
		let changeTab=(id)=>{
			tabId.value=id,
			current.value=id-1
			uni.pageScrollTo({
				scrollTop:detailToTop.value
			})
			
		}
		//滑动轮播图,改变tabId和组件中保持选中的id
		let changeSwiper=(event)=>{
			tabId.value=event.detail.current+1
			tabBar.value.tabId=event.detail.current+1
		}
		return{
			id,
			tabs,
			tabId,
			tabBar,
			current,
			pageHeight,
			statusNavHeight,
			isScroll,
			detailToTop,
			
			changeTab,
			changeSwiper,
			toupper
		}
	},	
	methods:{
		//获取当前页面可使用高度
		getHeight(){
			let res=uni.getSystemInfoSync()
			let sys=res.platform				//平台信息
			// 获取状态栏+导航栏高度
			if(sys=='android'){
				this.statusNavHeight=res.statusBarHeight + 48
			}else if(sys='ios'){
				this.statusNavHeight=res.statusBarHeight + 44
			}
			this.pageHeight= res.screenHeight - this.statusNavHeight
		}
	},
	onLoad(option) {
		if(option.id){
			this.id=option.id
			console.log(this.id)
		}
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
		padding-bottom: 100rpx;
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
