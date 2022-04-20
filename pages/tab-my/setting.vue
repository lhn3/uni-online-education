<template>
	<view>
		<my-list :list="list" 
		@setWifiPlay="setWifiPlay"
		@setWifiDownload="setWifiDownload"
		@setAutoPlay="setAutoPlay"
		@clearStorage="clearStorage"
		>
		</my-list>
	</view>
</template>

<script>
import data from '@/config/setting-list-bar.js'
import {getCurrentInstance,ref,reactive} from "vue";
export default {
	setup(){
		let {proxy} = getCurrentInstance()
		let list = ref(data)
		
		//改变选择
		const changeChecked = (obj,str) =>{
			let checked = uni.getStorageSync(str) || false
			obj.checked = !obj.checked
			uni.setStorageSync(str,!checked)
		}
		//是否允许非wifi下播放
		const setWifiPlay = (obj) =>{
			changeChecked(obj,'wifi-play')
		}
		
		//是否允许非wifi下缓存
		const setWifiDownload = (obj) => {
			changeChecked(obj,'wifi-download')
		}
		
		//视频自动连续播放
		const setAutoPlay = (obj) =>{
			changeChecked(obj,'auto-play')
		}
		
		//清楚缓存
		const clearStorage = async (obj) =>{
			let res = await proxy.$message.confirm('确定清楚缓存?')
			uni.clearStorageSync()
			obj.text = '0KB'
		}
		return{
			list,
			
			setWifiPlay,
			setWifiDownload,
			setAutoPlay,
			clearStorage
		}
	}
}
</script>

<style lang="scss"></style>
