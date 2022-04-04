<template>
	<!-- 不能用v-if (i: 每个tab页的专属下标;  index: 当前tab的下标; 申明在 MescrollMoreItemMixin )-->
	<view v-show="i === index">
		<down-bar :params="params" :downCategoty="downCategoty" @changeCategory="changeCategory"></down-bar>
		<!-- 展示列表数据 -->
		<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->
		<mescroll-body :ref="'mescrollRef'+i" 
			@init="mescrollInit" 
			:down="downOption" 
			@down="downCallback" 
			:up="upOption" 
			@up="upCallback">
			<!-- 数据列表 -->
			<view v-for="i in 100">{{i}}</view>
		</mescroll-body>
	</view>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs,onMounted} from "vue";
import downBar from "./down-bar.vue"
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
export default{
	mixins: [MescrollMixin,MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
	components:{
		'down-bar':downBar
	},
	props:{
		i: Number, // 每个tab页的专属id (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
		index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
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
						{id:'new',name:'热门排序'},
						{id:'hot',name:'最新排序'}
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
			//监听分类切换
			let changeCategory=(id)=>{
				console.log('点击了分类：',id)
			}
			
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			let upCallback=(page)=> {
				// this.i: 每个tab页的专属下标
				// this.index: 当前tab的下标
				console.log('上拉加载',page.num,page.size,props.content)
			}
		return{
			downCategoty,
			
			changeCategory,
			upCallback
		}
		
	}
}
</script>
<style>
</style>
