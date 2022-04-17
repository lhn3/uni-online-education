<template>
	<view>
		<view class="tab">
			<tab-bar ref="tabRef" :tabs="tabs" @changeTab="changeTab"></tab-bar>
		</view>
		
		<!-- 左右滑动切换切换(swiper)+上拉加载下拉刷新(mescroll) -->
		<swiper :duration="1000" :style="{'height':swiperHeight+'px'}" :current="current" @change="swiperChange">
			<swiper-item v-for="(item,index) in tabs" :key="item.id">
				<!-- 每个组件一个index，数据只加载当前current的 -->
				<question-swiper ref="articleRef" :i="index" :index='current' :tabs="tabs"></question-swiper>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick } from "vue";
import { onNavigationBarSearchInputClicked } from '@dcloudio/uni-app';
import questionSwiper from './cpns/question-swiper';
export default {
	components:{
		'question-swiper':questionSwiper
	},
	setup(){
		let {proxy} = getCurrentInstance()
		let swiperHeight = ref(0)
		let tabs = ref([
			{id:1,name:'热门回答'},
			{id:2,name:'最新回答'},
			{id:3,name:'等待回答'}
		])
		let tabRef = ref(null)
		let current = ref(0)
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
		
		onMounted(()=>{
			swiperHeight.value = uni.getSystemInfoSync().windowHeight - 40
		})
		
		//监听nav搜索点击
		onNavigationBarSearchInputClicked(()=>{
			proxy.navTo("/pages/search/search")
		})
		
		//tab切换
		let changeTab=(id)=>{
			current.value = id - 1
		}
		
		//swiper切换时
		const swiperChange=(e)=>{
			current.value = e.detail.current //展示当前选择的数据
			tabRef.value.tabId = e.detail.current + 1
		}
		
		return{
			swiperHeight,
			tabs,
			tabRef,
			current,
			
			changeTab,
			swiperChange
			
		}
	}
}
</script>

<style lang="scss">

</style>
