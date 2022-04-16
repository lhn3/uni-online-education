<template>
	<view class="content">
		<!-- 小程序才显示的搜索框 -->
		<!-- #ifdef MP -->
		<search-input @toSearch="toSearch"></search-input>
		<!-- #endif -->
		
		<!-- 轮播图 -->
		<my-swiper :banners="banners"></my-swiper>
		
		<!-- 下拉刷新 -->
		<mescroll-body ref="mescrollRef" 
		@init="mescrollInit" 
		@down="downCallback" 	
		@up="upCallback" 
		:down="downOption" 
		:up="upOption">
		<!-- 分类 -->
			<category-box :categoryList="category"></category-box>
			
			<view class="main-list">
				<!-- 热门推荐 -->
				<swiper-course title="热门推荐" word="HOT" :all="true" :courseData="hotCourse" :params="{sort:'hot'}"></swiper-course>
				<scroll-course title="近期上新" word="NEW" :all="true" :courseData="newCourse" :params="{sort:'new'}"></scroll-course>
				<swiper-course title="免费精选" word="FREE" :all="true" :courseData="freeCourse" :params="{isFree:1}"></swiper-course>
				<pay-course title="付费精品" word="NICE" :all="true" :courseData="payCourse" :params="{isFree:0}"></pay-course>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs} from "vue";
import {onNavigationBarButtonTap,onPullDownRefresh,onReachBottom,onNavigationBarSearchInputClicked } from '@dcloudio/uni-app';
import categoryBox from './cpns/category-box.vue';
import swiperCourse from './cpns/swiper-course.vue';
import scrollCourse from './cpns/scroll-course.vue';
import payCourse from './cpns/pay-course.vue';
import courseData from '@/mock/courseData.js';
import {getBanners,getCategory,getCourseList} from '@/request/course-api.js'
// 导入messcroll插件
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import mescrollBody from "@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue";
export default {
	mixins:[MescrollMixin],
	components:{
		'category-box':categoryBox,
		'swiper-course':swiperCourse,
		'scroll-course':scrollCourse,
		'pay-course':payCourse,
		'mescroll-body':mescrollBody
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
		resetSearchInfo()
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
		
		//监听nav搜索点击
		onNavigationBarSearchInputClicked(()=>{
			proxy.navTo("/pages/search/search")
		})
		
		//获取页面数据
		const state = reactive({
			banners:[],
			category:[],
			hotCourse:[],
			newCourse:[],
			freeCourse:[],
			payCourse:[]
		})
		const getPageInfo=async ()=>{
			// 获取页面信息
			let banners = await getBanners()	//轮播图数据
			let category = await getCategory()	//分类数据
			let hotCourse = await getCourseList({sort:'hot'})	//热门课程
			let newCourse = await getCourseList({sort:'new'})	//近期上新
			let freeCourse = await getCourseList({isFree:1})	//免费课程
			let payCourse = await getCourseList({isFree:0})	//付费课程
			state.banners=banners
			state.category=category
			state.hotCourse=hotCourse.records
			state.newCourse=newCourse.records
			state.freeCourse=freeCourse.records
			state.payCourse=payCourse.records
		}
		
		//----------------------------------------------------------------------------------------
		//下拉刷新
		//onPullDownRefresh(async ()=>{})//原生
		let downOption = reactive({//下拉刷新参数
			offset:60
		})
		//const downCallback=async ()=>{}//下拉刷新 : page.num=1 + upCallback()

		//触底加载更多
		//onReachBottom(()=>{})//原生
		let upOption = reactive({//上拉加载参数
			page:{
				num:0,	//默认第零页，每次调用upCallback，num+1
				size:10
			}
		})
		// 上拉加载更多
		const upCallback=async (page)=> {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			console.log(`当前第${page.num}页`)
			// 如果是第一页就是下拉刷新
			//此组件默认会调用一次下拉刷新(onload就不用调用了)
			if(page.num==1){
				await getPageInfo()
			}else{
				let res = await getCourseList({isFree:0},page.num,page.size)
				state.payCourse = [...state.payCourse,...res.records]
				//判断数组长度有没有大于会等于总长度
				proxy.mescroll.endBySize(state.payCourse.length,res.total)
			}
			proxy.mescroll.endErr()
		}
		//小程序点击搜索框前往搜索页面
		const toSearch=()=>{
			proxy.navTo("/pages/search/search")
		}
		return{
			courseData,
			getPageInfo,
			...toRefs(state),
			// downCallback,
			downOption,
			upCallback,
			upOption,
			toSearch
		}
	}
}
</script>

<style lang="scss" scoped>
	.main-list{
		padding: 0 30rpx;
		box-sizing: border-box;
	}
</style>
