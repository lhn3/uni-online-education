<template>
	<view class="content">
		<!-- #ifdef MP -->
		<!-- 小程序才显示的搜索框 -->
		<search-input></search-input>
		<!-- #endif -->
		
		<!-- 轮播图 -->
		<my-swiper></my-swiper>
		
		<!-- 分类 -->
		<category-box></category-box>
		
		<view class="main-list">
			<!-- 热门推荐 -->
			<swiper-course title="热门推荐" word="HOT" :all="true" :courseData="courseData"></swiper-course>
			<scroll-course title="近期上新" word="NEW" :all="true" :courseData="courseData"></scroll-course>
			<swiper-course title="免费精选" word="FREE" :all="true" :courseData="courseData"></swiper-course>
			<pay-course title="付费精品" word="NICE" :all="true" :courseData="courseData"></pay-course>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref} from "vue";
import { onShow,onReady,onNavigationBarButtonTap } from '@dcloudio/uni-app';
import categoryBox from './cpns/category-box.vue';
import swiperCourse from './cpns/swiper-course.vue';
import scrollCourse from './cpns/scroll-course.vue';
import payCourse from './cpns/pay-course.vue';
import courseData from '@/mock/courseData.js';
export default {
	components:{
		'category-box':categoryBox,
		'swiper-course':swiperCourse,
		'scroll-course':scrollCourse,
		'pay-course':payCourse
	},
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
		// 监听nav按钮点击
		onNavigationBarButtonTap((event)=>{
			if(event.index === 0){//扫一扫
				uni.scanCode({
					success:(res)=>{
						proxy.$message.toast('扫描成功','success')
						uni.navigateTo({
							url:`/pages/public/public?url=${res.result}`
						})
					},
					fail: () => {
						proxy.$message.toast('扫描失败','error')
					}
				})
			}
		})
		// #endif
		
		return{
			// #ifdef APP-PLUS
			resetSearchInfo,
			// #endif
			courseData
		}
	},
	onLoad(){
		// #ifdef APP-PLUS
		this.resetSearchInfo()
		// #endif
	}
	
}
</script>

<style lang="scss" scoped>
	.main-list{
		padding: 0 30rpx;
		box-sizing: border-box;
	}
</style>
