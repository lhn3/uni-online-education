<template>
	<view class="center column">
		<image mode="widthFix" @load="load"	lazy-load v-for="(url, index) in detailUrls" :key="index" :src="url">
		</image>
		<image v-if="loading && detailUrls.length != 0" class="loading" src="/static/images/loading.gif"></image>
		<text v-else class="footer-text">已经到达底部，没有更多内容了</text>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,watch,onMounted} from "vue";
export default {
	props: {
		detailUrls: {
			type: Array,
			default: () => [
				// '/static/images/banner1.jpg',
				// 'https://img.alicdn.com/imgextra/i2/3603079088/O1CN01V8VO2y2H0M5Bx33L3_!!3603079088.jpg'
			]
		}
	},
	setup(props){
		let loading = ref(true)
		let current=ref(0)
		let load=()=> {
			current.value+=1
			if(current.value == props.detailUrls.length){
				loading.value = false // 所有图片加载完
			}
		}
		return{
			loading,
			load
		}
	}
}
</script>

<style lang="scss">
image {
	width: 100%;
}
.loading {
	height: 90rpx;
	width: 90rpx;
	margin-top: 50rpx;
}
.footer-text {
	font-size: 30rpx;
	color: #777;
	margin: 20rpx 0;
}
</style>
