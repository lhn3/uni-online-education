<template>
	<view>
		<!-- #ifdef MP -->
		<uni-search-bar @confirm="doSearh" :focus="focuse" v-model="content" @input="inputChange" :radius="100" placeholder="请输入搜索内容">
			<template v-slot:searchIcon>
				<text class="iconfont icon-search"></text>
			</template>
			<template v-slot:clearIcon>
				<text class="iconfont icon-close"></text>
			</template>
		</uni-search-bar>
		<!-- #endif -->
	</view>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs,onMounted} from "vue";
import { onNavigationBarButtonTap,onNavigationBarSearchInputChanged,onNavigationBarSearchInputConfirmed } from '@dcloudio/uni-app';
import uniSearchBar from "@/uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue"
let webView = null
export default {
	components:{
		'uni-search-bar':uniSearchBar
	},
	setup(){
		const { proxy } = getCurrentInstance();
		//页面跳转传参
		let params = ref({})
		let content = ref('')
		let focuse = ref(false)
		
		//搜索
		const doSearh = ()=>{
			uni.showLoading()
			setTimeout(()=>{
				uni.hideLoading()
			},1000)
		}
		// 监听搜索按钮点击
		onNavigationBarButtonTap((e)=>{	
			if(content.value == ""){
				proxy.$message.toast('请输入搜索内容')
			}else{
				doSearh()
			}
		})
		//监听输入框改变
		onNavigationBarSearchInputChanged((e)=>{
			content.value = e.text
		})
		//小程序监听输入框改变
		const inputChange=(e)=>{
			console.log('监听输入框改变',e)
		}
		//监听手机键盘确定/搜索键点击
		// #ifdef APP-PLUS
		onNavigationBarSearchInputConfirmed((e)=>{
			//失去焦点关闭键盘
			webView.setTitleNViewSearchInputFocus(false)
			doSearh()
		})
		// #endif
		return{
			params,
			content,
			doSearh,
			inputChange,
			focuse
		}
	},	
	onLoad(option) {
		// #ifdef APP-PLUS
		webView = this.$scope.$getAppWebview();
		// #endif
		if (option.data){
			let data = JSON.parse(option.data)
			this.params = data
			this.focuse = false
			//执行搜索
			this.doSearh()
			
		}else{
			//自动获取焦点
			this.focuse = true
			// #ifdef APP-PLUS
			webView.setTitleNViewSearchInputFocus(true)
			// #endif
		}
	}
}
</script>

<style lang="scss">

</style>
