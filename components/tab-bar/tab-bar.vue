<template>
	<view class="tab-bar" @touchmove.stop.prevent="()=>{}">
		<scroll-view class="noScorll bar-view" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view class="bar-item" :style="{width: `${itemWidth}px`}" :class="{current: item.id == tabId}"
				v-for="item in tabs" :key="item.id"
				@click="changeTabs(item.id)"
				>
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,watch,onMounted} from "vue";
export default {
	props:{
		tabs:{
			type:Array,
			default:()=>[]
		},
		itemWidth:{
			type:Number,
			default:100
		}
	},
	emits:['changeTab'],
	setup(props,{emit}){
		let tabId=ref()
		
		onMounted(()=>{
			tabId.value=props.tabs[0].id
		})
		
		let changeTabs=(id)=>{
			if(tabId.value != id){
				tabId.value=id
				emit('changeTab',id)	
			}
		}
		return{
			tabId,
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
			width: 150rpx;
			
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
