<template>
	<!-- 不能用v-if (i: 每个tab页的专属下标;  index: 当前tab的下标; 申明在 MescrollMoreItemMixin )-->
	<view v-show="i === index">
		<down-bar :params="params" :downCategoty="downCategoty" @changeCategory="changeCategory"></down-bar>
		<!-- 展示列表数据 -->
		<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->
		<mescroll-body :ref="'mescrollRef'+i"
			:down="downOption" 
			@down="downCallback" 
			:up="upOption"
			@up="upCallback">
			<!-- 数据列表 -->
			<view style="padding: 0 20rpx;box-sizing: border-box;">
				<course-item v-for="item in courseList" :item="item" :key="item.id"></course-item>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs,onMounted,nextTick} from "vue";
import downBar from "./down-bar.vue"
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
import {getCourseList} from '@/request/course-api.js'
export default{
	mixins: [MescrollMixin,MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
	components:{
		'down-bar':downBar
	},
	props:{
		i: Number, // 每个tab页的专属id (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
		index: { // 当前tab的id (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			type: Number,
			default(){
				return 1
			}
		},
		params:{
			type:Object,
			default:()=>({})
		},
		content:{
			type:String,
			default:''
		}
	},
	setup(props){
		const {proxy} = getCurrentInstance()
		let downCategoty = ref([
				{
					type:'sort',
					isAllCategory:false,
					name:'综合排序',
					active:false,		//是否被选择了,展示下拉框
					list:[
						{id:null,name:'综合排序'},
						{id:'hot',name:'热门排序'},
						{id:'new',name:'最新排序'}
					]
				},
				{
					type: 'isFree',
					isAllCategory:false,
					name: '全部课程',
					active: false, //是否被选中
					list: [
						{id: null,name: '全部课程'},
						{id: 0,name: '付费课程'},
						{id: 1,name: '免费课程'}
					]
				},
				{
					type:'label',
					isAllCategory:true,
					name:'全部排序',
					active:false,
					list:[]
				}
			])
			//搜索到的课程列表
			let courseList = ref([])
			//搜索条件对象
			let searchDate = reactive({
				content:null,
				sort:null,
				isFree:null,
				labelId:null,
				categoryId:null
			})
			// 初始化搜索内容
			onMounted(() => {
				if(props.content) searchDate.content=props.content;
				
				let paramsKeys = Object.keys(props.params)
				let searchDateKeys = Object.keys(searchDate)
				if(paramsKeys.length > 0){
					//遍历params中的键与searchDate中的是否相同相同则searchDate中的数据被覆盖
					paramsKeys.forEach(item=>{
						if(searchDateKeys.indexOf(item) != -1){
							searchDate[item]=props.params[item]
						}
					})
				}
			})
			
			//监听分类切换
			let changeCategory = (data) => {
				//重新整合搜索内容发送请求
				let content = props.content
				searchDate = {...searchDate,...data,content}
				// 调用重新加载第一页，会自动调用下拉刷新，
				//下拉刷新在调用上拉加载更多时，会将page.num设置为1，page.size设置为10
				proxy.mescroll.resetUpScroll()
			}
			
			let upOption = ref({
				auto:false,//不自动加载
				noMoreSize:4//列表已无数据可设置显示内容
			})

			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			let upCallback = async (page) => {
				// let pageNum = page.num; // 页码, 默认从1开始
				// let pageSize = page.size; // 页长, 默认每页10条
				
				console.log('整合搜索课程内容-----',searchDate)
				console.log(`搜索课程当前第${page.num}页`,page.size)
				let res = await getCourseList(searchDate,page.num,page.size)	//按照搜索内容搜索
				if(page.num==1){
					courseList.value = []
					// 回到顶部
					proxy.mescroll.scrollTo(0,100)
				}
				courseList.value = [...courseList.value,...res.records]
				//判断数组长度有没有大于会等于总长度
				proxy.mescroll.endBySize(courseList.value.length,res.total)
				proxy.mescroll.endErr()
				//搜索成功的条数
				// proxy.mescroll.endSuccess(1)
			}
		return{
			downCategoty,
			courseList,
			upOption,
			
			changeCategory,
			upCallback
		}
		
	}
}
</script>
<style>
</style>
