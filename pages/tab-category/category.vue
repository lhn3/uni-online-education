<template>
	<view class="category">
		<scroll-view class="left noScorll" scroll-y >
			<view class="title">
				<view :class="{'activeTitle':activeTitle == item.id}" v-for="item in state" :key="item.id" @click="selectTitle(item.id,item.labelList)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y >
			<view class="tag">
				<view :class="{'activeLabel':activeLabel == item.id}" v-for="item in labelList" :key="item.id" @click="selectLabel(item)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs,onMounted} from "vue";
import { onShow,onReady,onNavigationBarButtonTap } from '@dcloudio/uni-app';
import {getCategory} from '@/request/course-api.js'
export default {
	props:{
		value:{	//当分类作为子组件使用并被传递参数时
			type:Object,
			default:()=>null
		}
	},
	setup(props,{emit}){
		const {proxy} = getCurrentInstance()
		const state = ref([])
		let activeTitle = ref()
		let labelList= ref([])
		let activeLabel = ref()
		
		onMounted(async ()=>{
			let res = await getCategory()
			state.value = res
			//作为子组件传入在标签前加一个不限
			if(props.value != null){
				state.value.forEach(item=>{
					item.labelList.unshift({id:0,name:'不限',cName:item.name,cId:item.id})
				})
				if(Object.keys(props.value).length>0){
					// 保持选择
					res.forEach(item=>{
						if(item.id == props.value.categoryId) {
							activeTitle.value = item.id
							labelList.value = item.labelList
						}
					})
				}else{
					activeTitle.value = res[0].id
					labelList.value = res[0].labelList
				}
			}else{
				activeTitle.value = res[0].id
				labelList.value = res[0].labelList
			}
		})
		
		//选择了某个标题
		const selectTitle=(id,List)=>{
			activeTitle.value = id
			labelList.value = List
		}
		//选择了某个标签
		const selectLabel=(item)=>{
			if (activeLabel.value == item.id) return;
			activeLabel.value = item.id
			if(props.value != null){	//搜索页点击标签不跳转页面只发送事件
				item.categoryId=activeTitle.value	//强行加一个父级id
				emit('searchCate',item)
			}else{
				let params = JSON.stringify({labelId:item.id,name:item.name,categoryId:activeTitle.value}) 
				proxy.navTo('/pages/search/search?data='+params)
			}
		}

		onNavigationBarButtonTap(()=>{
			proxy.navTo('/pages/search/search')
		})
		
		return {
			state,
			activeTitle,
			labelList,
			activeLabel,
			selectTitle,
			selectLabel
		}
	}
}
</script>

<style lang="scss">
page {
	height: 100%;
}
.category {
	display: flex;
	height: 100%;
	.left {
		background-color: #F8F9FB;
		width: 200rpx;
		border-radius: 0 25rpx 25rpx 0;
		.title {
			view {
				text-align: center;
				font-size: 30rpx;
				color: #888888;
				width: 200rpx;
				line-height: 40rpx;
				padding: 55rpx 30rpx;
				position: relative;
				&:before { // 在分类前加上|
					position: absolute;
					content: '';
					width: 0;
					height: 0;
					border-right: 6rpx solid $mxg-color-primary;
					border-radius: 30rpx;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					transition: .3s;
				}
			}
			.activeTitle {
				color: $mxg-color-primary;
				font-size: 33rpx;
				font-weight: bold;
				&:before {
					height: 50rpx;
				}
			}
		}
	}
	.right {
		background-color: #fff;
		padding-left: 15rpx;
		margin: 0; // 铺满
		.tag {
			display: flex;
			flex-wrap: wrap; 
			padding-top: 35rpx;
			padding-left: 10rpx;
			view {
				font-size: 25rpx;
				line-height: 60rpx;
				border: 1px solid #999;
				border-radius: 30rpx;
				min-width: 160rpx;
				text-align: center;
				padding: 0 5rpx;
				margin: 15rpx 5rpx;
			}
			.activeLabel{
				background-color: $mxg-color-primary ;
				color: #fff;
			}
		}
	}
}
</style>
