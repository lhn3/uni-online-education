<template>
	<view>
		<web-view v-if="open(url)" :src="url"></web-view>
		<view class="tip column" v-else>
			<text>请复制链接并打开浏览器访问</text>
			<text selectable>{{url}}</text>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref} from "vue";
import { onShow,onReady,onNavigationBarButtonTap } from '@dcloudio/uni-app';
export default {
	setup(){
		let url = ref('')
		const open = (url) => {
			if(url.indexOf('mengxuegu') == -1){
				return false;
			}else{
				return true;
			}
		}
		return {
			url,
			open
		}
	},
	onLoad(option) {
		this.url=option.url
	}
}
</script>

<style lang="scss">
.tip{
	position: relative;
	top:200rpx;
	width: 600rpx;
	margin: 0 auto;
	word-wrap: break-word;
	font-size: 30rpx;
	text-align: center;
	text:first-child{
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
}
</style>
