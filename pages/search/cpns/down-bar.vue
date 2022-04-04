<template>
	<view class="down-bar row sticky-box" @touchmove.stop.prevent="()=>{}">
		<view class="one" v-for="item in infos" :key="item.type">
			<view class="center" @click="changeTab(item)" :class="{'active': item.name == tabName}">
				<text>{{item.name}}</text>
				<text class="iconfont icon-down1" v-if="item.active"></text>
				<text class="iconfont icon-up" v-if="!item.active"></text>
			</view>
			<view class="item-list" v-if="item.active">
				<category class="category" v-if="item.isAllCategory"></category>
				<view class="name" :class="{'active':i.name == tabName}" v-else v-for="i in item.list" :key="i.id" @click="changeCild(item,i)">
				{{i.name}}
				</view>
			</view>
			<!-- 蒙层 -->
			<view class="cover" v-if="item.active" @click="closeCategory"></view>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs,onMounted} from "vue";
import category from '@/pages/tab-category/category.vue'
export default {
	components: { category },
	props:{
		info:{
			type:Array,
			default:()=>[
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
			]
		}
	},
	setup(props,{emit}){
		let tabName=ref()	//选中的标签
		let infos = ref()
		onMounted(()=>{
			infos.value=JSON.parse(JSON.stringify(props.info))
			tabName.value=infos.value[0].name
		})
		
		//选择大标签
		let changeTab = (item) =>{
			tabName.value = item.name
			let act = item.active
			infos.value.forEach(i=>{
				i.active=false
			})
			item.active=!act
		}
		// 选择子标签
		let changeCild = (item,itemChild) =>{
			item.active=false
			if(tabName.value == itemChild.name ) return;
			tabName.value = itemChild.name
			item.name = itemChild.name
			//发送事件
			emit('changeCategory',{[item.type]:itemChild.id})
		}
		// 点击遮罩层关闭分类选择
		let closeCategory=()=>{
			infos.value.forEach(i=>{
				i.active=false
			})
		}
		return{
			infos,
			tabName,
			
			changeTab,
			changeCild,
			closeCategory
		}
	}
}
</script>

<style lang="scss">
	
	.down-bar {
		z-index: 100;
		background-color: #FFFFFF;
		font-size: 30rpx;
		line-height: 80rpx;
	}
	
	.item-list {
		z-index: 100;
		background-color: #FFFFFF;
		position: absolute;
		left: 0;
		right: 0;
		.name {
			padding-left: 115rpx;
		}
		.category {
			height: 580rpx!important;
		}
	}
	// 被点击之后的效果 
	.active {
		color: $mxg-color-primary;
	}
	
	// 粘顶
	.sticky-box {
		position: -webkit-sticky;
		position: sticky; /* 其他浏览器 */
		top: var(--window-top);
	}
	/*蒙层*/
	.cover {
		z-index: 99;
		position: fixed;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.2 !important;
	}
</style>
