<template>
	<view>
		充值页面
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,onMounted,computed,watch} from "vue";
export default {
	setup(){
		let params = ref({})
		
		return{
			params
		}
		
	},
	onLoad(option) {
		this.params = JSON.parse(option.params)
		console.log(this.params)
	}
}
</script>

<style lang="scss">

</style>
