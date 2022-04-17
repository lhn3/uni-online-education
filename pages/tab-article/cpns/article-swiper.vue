<template>
	<view>
		<!-- top="xxx"下拉布局往下偏移,防止被悬浮菜单遮住 -->
		 <mescroll-uni 
		 :ref="'mescrollRef'+i" 
		 @init="mescrollInit" 
		 height="100%" 
		 bottom="80"
		 :down="downOption" 
		 @down="downCallback" 
		 :up="upOption" 
		 @up="upCallback" 
		>
			<!-- 数据列表 -->
			<article-item v-for="q in 10" :key="q"></article-item>
		</mescroll-uni>
	</view>
</template>

<script>
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
import mescrollUni from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue";
import { getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick } from "vue";
export default {
	components:{
		'mescroll-uni':mescrollUni
	},
	mixins: [MescrollMixin,MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
	props:{
		i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
		index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			type: Number,
			default(){
				return 0
			}
		},
		tabs: { // 为了请求数据,演示用,可根据自己的项目判断是否要传
			type: Array,
			default(){
				return []
			}
		}
	},
	setup(props){
		let {proxy} = getCurrentInstance()
		let downOption = ref({auto:false})// 不自动加载 (mixin已处理第一个tab触发downCallback)
		let upOption = ref({
					auto:false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
					}
				},)
		
		 /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		let upCallback=(page) => {
			//联网加载数据
			let keyword = props.tabs[props.i].name
			console.log(keyword,page.num,page.size)
			proxy.mescroll.endSuccess(1);
			proxy.mescroll.endBySize(1,1);
		}
		return {
			downOption,
			upOption,
			
			upCallback
		}
	}
}
</script>

<style lang="scss"></style>
