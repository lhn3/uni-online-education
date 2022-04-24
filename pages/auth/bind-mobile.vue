<template>
	<view>
		1234
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive} from "vue";
export default {
	setup(){
		return{
			
		}
	},
	onLoad(option){
		console.log(option.data)
		let data=JSON.parse(option.data)
	}
}
</script>

<style lang="scss">

</style>
