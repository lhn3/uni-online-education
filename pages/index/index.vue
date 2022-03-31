<template>
	<view class="content">
		<!-- #ifdef MP -->
		<!-- 小程序才显示的搜索框 -->
		<search-input></search-input>
		<!-- #endif -->
		<!-- 轮播图 -->
		<my-swiper></my-swiper>
	</view>
</template>

<script>
import {getCurrentInstance,ref} from "vue";
import { onShow,onReady } from '@dcloudio/uni-app';
export default {
	setup(){
		const { proxy } = getCurrentInstance();
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
		// #endif
		return{
			// #ifdef APP-PLUS
			resetSearchInfo
			// #endif
		}
	},
	onLoad(){
		// #ifdef APP-PLUS
		this.resetSearchInfo()
		// #endif
	}
	
}
</script>

<style lang="scss">
page{
	// background-color: #009926;
}

</style>
