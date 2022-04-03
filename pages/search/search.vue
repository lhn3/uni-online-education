<template>
	<view>
		<!-- #ifdef MP -->
		<uni-search-bar @confirm="doSearh" :focus="focuse" v-model="content" @input="inputChange" :radius="100" placeholder="请输入搜索内容" >
			<template v-slot:searchIcon>
				<text class="iconfont icon-search"></text>
			</template>
			<template v-slot:clearIcon>
				<text class="iconfont icon-close"></text>
			</template>
		</uni-search-bar>
		<!-- #endif -->
		<keywords @changeContent="changeContent" :historyWord="historyWord"></keywords>
	</view>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs,onMounted} from "vue";
import { onNavigationBarButtonTap,onNavigationBarSearchInputChanged,onNavigationBarSearchInputConfirmed } from '@dcloudio/uni-app';
import uniSearchBar from "@/uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue"
import keywords from "./cpns/keywords.vue"
let webView = null
export default {
	components:{
		'uni-search-bar':uniSearchBar,
		'keywords':keywords
	},
	setup(){
		const { proxy } = getCurrentInstance();
		//页面跳转传参
		let params = ref({})
		let content = ref('')
		let focuse = ref(false)
		let historyWord = ref()
		
		//搜索
		const doSearh = ()=>{
			if(content.value == ""){
				proxy.$message.toast('请输入搜索内容')
			}else{
				console.log('搜索内容:'+content.value)
				uni.showLoading()
				// 存储历史搜索内容
				historyWord.value=content.value
				setTimeout(()=>{
					uni.hideLoading()
				},1000)
			}
		}
		
		// 监听搜索按钮点击
		onNavigationBarButtonTap((e)=>{	
			doSearh()
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
		
		//监听点击关键字搜索,并将不同端的输入框赋值
		const changeContent=(value)=>{
			// #ifdef APP-PLUS
			webView.setTitleNViewSearchInputText(value)
			// #endif
			// #ifdef H5
			let placeholder=document.querySelector('.uni-page-head-search-placeholder')
			let inp=document.querySelector('.uni-input-input[type=search]')
			placeholder.innerHTML = ''
			inp.value=value
			// #endif
			content.value = value
			doSearh()
		}
		return{
			params,
			content,
			focuse,
			historyWord,
			
			doSearh,
			inputChange,
			changeContent
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
