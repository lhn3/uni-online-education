<template>
	<view class="tab-bar" @touchmove.stop.prevent="()=>{}">
		<scroll-view class="noScorll bar-view" scroll-x scroll-with-animation :scroll-left="move">
			<view class="bar-item" :style="{width: `${itemWidth}px`}" :class="{current: item.id == tabId}"
				v-for="(item,index) in tabs" :key="item.id"
				@click="changeTabs(item.id,index)"
				>
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,watch,onMounted,nextTick} from "vue";
export default {
	props:{
		//[{id:1,name:'默认标签'}]
		tabs:{
			type:Array,
			default:()=>[]
		}
	},
	setup(props,{emit}){
		let tabId = ref()
		let itemWidth = ref(100)	//每个标签的宽度
		let move = ref(0)
		
		watch(() => props.tabs, (newValue)=>{
			if(newValue.length == 0) return;
			tabId.value=newValue[0].id
			if(newValue.length < 5){	//如果tabs小于5个就平均分配
				itemWidth.value = uni.upx2px(750/newValue.length)
			}else{
				itemWidth.value = uni.upx2px(750/5)
			}
		},{
			deep:true,
			immediate:true
		})
		
		//计算item的位置
		let tabPosition=(index)=>{
			if(index > 2){
				move.value = (index-2) * itemWidth.value
			}else{
				move.value = 0
			}
		}
		
		let changeTabs=(id,index)=>{
			if(tabId.value == id) return;
			tabPosition()
			
			if(tabId.value != id){
				tabId.value=id
				emit('changeTab',id,index)	
			}
		}
		return{
			tabId,
			itemWidth,
			move,
			
			tabPosition,
			changeTabs
		}
	}
}
</script>

<style lang="scss">
.tab-bar {
	width: 100%;
	height: 80rpx;
	background-color: #FFFFFF;
	border-bottom: 1px solid #efeff4;
	.bar-view {
		width: 100%;
		text-align: center;
		/* +++ */
		white-space: nowrap;
		.bar-item {
			/* flex: 1; */
			display: inline-block;
			font-size: 30rpx;
			line-height: 80rpx;
			position: relative;
			&:after {
				position: absolute;
				content: '';
				width: 0;
				height: 0;
				border-bottom: 6rpx solid $mxg-color-primary;
				border-radius: 20rpx;
				left: 50%;
				bottom: 6rpx;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		.current {
			color: $mxg-color-primary;
			&:after {
				width: 60rpx;
			}
		}
	}
}
</style>
