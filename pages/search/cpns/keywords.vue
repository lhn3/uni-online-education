<template>
	<view class="keyword">
		<view class="title">热门搜索</view>
		<view class="tag-list">
			<view v-for="item in hotWords" :key="item" @click="clickWord(item)">
				{{item}}
			</view>
		</view>
		<view class="title space-between" v-if="historyWords.length > 0">
			<text>历史搜索</text>
			<text @click="clearHistory">清空</text>
		</view>
		<view class="tag-list">
			<view v-for="item in historyWords" :key="item" @click="clickWord(item)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,watch,onMounted} from "vue";
export default {
	emits:['changeContent'],
	props:{
		historyWord:{
			type:String,
			default:''
		}
	},
	setup(props,{emit}){
		const { proxy } = getCurrentInstance();
		let hotWords=ref(['Python','Java','Web前端','小程序','uniapp','js高级','算法'])
		let historyWords=ref([])
		
		onMounted(()=>{
			//获取历史搜索
			historyWords.value=uni.getStorageSync('historyWords')
			console.log(uni.getStorageSync('historyWords'))
		})
		
		//监听搜索关键字添加历史搜索
		watch(()=>props.historyWord,(newValue)=>{
			if(historyWords.value.indexOf(newValue) !=-1){
				for(let i=0;i<historyWords.value.length;i++){
					if(historyWords.value[i]==newValue){
						historyWords.value.splice(i,1)
					}
				}
			}
			historyWords.value.unshift(newValue)
			//将历史搜索写入本地
			uni.setStorageSync('historyWords',historyWords.value)
		})
		
		//点击关键字发送请求
		const clickWord=(word)=>{
			emit('changeContent',word)
		}
		//清空历史搜索
		const clearHistory=()=>{
			historyWords.value=[]
			uni.removeStorageSync('historyWords')
		}
		return{
			hotWords,
			historyWords,
			clickWord,
			clearHistory
		}
	}
}
</script>

<style lang="scss">
.keyword {
	padding: 25rpx;
	.title {
		font-size: 30rpx;
		color: #222222;
		text:last-child {
			color: #999;
		}
	}
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
		margin-bottom: 60rpx;
		view {
			font-size: 25rpx;
			color: #999;
			border: 1rpx solid #999;
			border-radius: 8rpx;
			padding: 6rpx 15rpx;
			margin: 10rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
</style>
