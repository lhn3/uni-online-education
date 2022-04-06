<template>
	<view>
		<course-detail-header></course-detail-header>
		<view class="course-details" :style="{'height':`${pageHeight}px`}">
			<tab-bar :tabs="tabs" :itemWidth="87.5" @changeTab="changeTab" ref="tabBar"></tab-bar>
			<!-- 分类内容 -->
			<swiper :duration="500" circular :current="current" class="swiper-box" @change="changeSwiper">
				<swiper-item class="swiper-box" v-for="item in tabs" :key="item.id">
					<scroll-view :scroll-y="true" class="scroll-box" v-show="item.id==tabId">
						<view class="details-info">
							<view v-for="i in 50" :key="i">{{item.name}}-{{i}}</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick} from "vue";
import { onNavigationBarButtonTap } from '@dcloudio/uni-app';
import courseDetailHeader from './cpns/course-detail-header.vue'
export default {
	components:{
		'course-detail-header':courseDetailHeader
	},
	setup(){
		let {proxy} = getCurrentInstance()
		let id = ref()
		let pageHeight = ref()	//页面视口可使用的高度
		let statusNavHeight = ref()	//状态栏+导航栏的高度
		let tabs = ref([		//tab栏标签
			{id:1,name:'详情'},
			{id:2,name:'章节'},
			{id:3,name:'评论'},
			{id:4,name:'套餐'},
		])
		let tabId = ref(1)
		let current = ref(0)
		let tabBar = ref()
		
		
		// 点击标签，改变轮播图
		let changeTab=(id)=>{
			tabId.value=id,
			current.value=id-1
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
			
			changeTab,
			changeSwiper
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
