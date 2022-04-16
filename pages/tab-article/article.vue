<template>
	<view>
		<view class="tab">
			<tab-bar :tabs="tabs" :itemWidth="75" @changeTab="changeTab"></tab-bar>
		</view>
		<article-item></article-item>
		文章
		<view v-for="i in 100" :key="i">{{i}}</view>
	</view>
</template>

<script>
import { getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick } from "vue";
import { onNavigationBarSearchInputClicked,onReachBottom,onPageScroll } from '@dcloudio/uni-app';
import {getCategory} from '@/request/course-api.js'
export default {
	setup(){
		let {proxy} = getCurrentInstance()
		let tabId = ref(null)
		let tabs = ref([])
		
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
		}
		return{
			tabs,
			
			changeTab
		}
	}
}
</script>

<style lang="scss">
// .tab{
// 	position: fixed;
// 	top: 44;
// 	left: 0;
// 	z-index: 999;
// }

</style>
