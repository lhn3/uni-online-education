<template>
	<view class="cantainer">
		<view class="tab">
			<tab-bar ref="tabRef" :tabs="tabs" :itemWidth="75" @changeTab="changeTab"></tab-bar>
		</view>
		<!-- <article-item></article-item> -->
		
		<!-- 左右滑动切换切换(swiper)+上拉加载下拉刷新(mescroll) -->
		<swiper :duration="1000" :style="{'height':swiperHeight+'px'}" :current="current" @change="swiperChange">
			<swiper-item v-for="(item,index) in tabs" :key="item.id">
				<!-- 每个组件一个index，数据只加载当前current的 -->
				<article-swiper ref="articleRef" :i="index" :index='current' :tabs="tabs"></article-swiper>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick } from "vue";
import { onNavigationBarSearchInputClicked,onReachBottom,onPageScroll } from '@dcloudio/uni-app';
import articleSwiper from './cpns/article-swiper';
import {getCategory} from '@/request/course-api.js'
export default {
	components:{
		'article-swiper':articleSwiper
	},
	setup(){
		let {proxy} = getCurrentInstance()
		let tabRef = ref(null)
		let articleRef = ref(null)
		let tabs = ref([])
		let tabId = ref(null)
		let current = ref(0)
		let swiperHeight = ref(500)
		
		// APP端搜索提示内容
		// #ifdef APP-PLUS
		let arr = ['APP · 微信小程序', 'Java · SpringBoot ' , 'springCloud · SpringSecurity' , 'Vue · React']
		let i = 0
		let resetSearchInfo=()=>{
			let webView = proxy.$scope.$getAppWebview();
			setInterval(()=>{
				i > arr.length - 1 ? i=0:'';
				webView.setStyle({"titleNView":{"searchInput":{"placeholder":arr[i++]}}})
			},3000)
		}
		resetSearchInfo()
		// #endif
		
		onMounted(async ()=>{
			swiperHeight.value = uni.getSystemInfoSync().windowHeight - 40
			let res = await getCategory()
			tabs.value = res
			tabId.value = res[0].id
		})
		
		//监听nav搜索点击
		onNavigationBarSearchInputClicked(()=>{
			proxy.navTo("/pages/search/search")
		})
		
		//标签点击事件
		const changeTab = (id) => {
			tabId.value = id
			current.value = id - 1
		}
		
		//swiper切换时
		const swiperChange=(e)=>{
			current.value = e.detail.current
			tabId.value = e.detail.current + 1
			tabRef.value.tabId = tabId.value
		}
		return{
			tabRef,
			articleRef,
			tabs,
			tabId,
			current,
			swiperHeight,
			
			changeTab,
			swiperChange
		}
	}
}
</script>

<style lang="scss">
page .cantainer{
	height: 100%;
	overflow: hidden;
}

</style>
