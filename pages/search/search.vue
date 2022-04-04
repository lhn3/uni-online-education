<template>
	<view>
		<!-- #ifdef MP -->
		<uni-search-bar @confirm="doSearch" :focus="focuse" v-model="content" @input="inputChange" :radius="100" placeholder="请输入搜索内容" >
			<template v-slot:searchIcon>
				<text class="iconfont icon-search"></text>
			</template>
			<template v-slot:clearIcon>
				<text class="iconfont icon-close"></text>
			</template>
		</uni-search-bar>
		<!-- #endif -->
		
		<!-- 关键字 -->
		<keywords @changeContent="changeContent" :historyWord="historyWord" v-show="showWords"></keywords>
		
		<!-- 搜索结果 -->
		<view v-if="!showWords">
			<!-- 分类标签 -->
			<tab-bar :tabs="tabs" @changeTab="changeTab"></tab-bar>
			<!-- 下拉过滤 -->
			<down-bar @changeCategory="changeCategory"></down-bar>
			<view v-for="i in 100">{{i}}</view>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs,onMounted} from "vue";
import { onNavigationBarButtonTap,onNavigationBarSearchInputChanged,onNavigationBarSearchInputConfirmed } from '@dcloudio/uni-app';
import uniSearchBar from "@/uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue"
import keywords from "./cpns/keywords.vue"
import downBar from "./cpns/down-bar.vue"
let webView = null
export default {
	components:{
		'uni-search-bar':uniSearchBar,
		'keywords':keywords,
		'down-bar':downBar
	},
	setup(){
		const { proxy } = getCurrentInstance();
		let params = ref({})//页面跳转传参
		let content = ref('')//输入框内容
		let focuse = ref(false)//是否获取焦点，仅小程序
		let historyWord = ref()//上次搜索内容
		let showWords = ref(false)//是否显示搜索关键词
		let tabs = ref([		//搜索结果tab栏标签
			{id:1,name:'课程'},
			{id:2,name:'文章'},
			{id:3,name:'问答'},
		])
		
		//搜索
		const doSearch = ()=>{
			if(content.value == ""){
				proxy.$message.toast('请输入搜索内容')
			}else{
				console.log('搜索内容:'+content.value)
				uni.showLoading()
				// 存储历史搜索内容
				historyWord.value=content.value
				showWords.value=false
				setTimeout(()=>{
					uni.hideLoading()
				},1000)
			}
		}
		
		// 监听搜索按钮点击
		onNavigationBarButtonTap((e)=>{	
			doSearch()
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
			doSearch()
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
			doSearch()
		}
		
		//监听搜索到的数据切换tab
		let changeTab=(id)=>{
			console.log('点击了标签：'+id)
		}
		//监听分类切换
		let changeCategory=(id)=>{
			console.log('点击了分类：',id)
		}
		return{
			params,
			content,
			focuse,
			historyWord,
			showWords,
			tabs,
			
			doSearch,
			inputChange,
			changeContent,
			changeTab,
			changeCategory
		}
	},	
	onLoad(option) {
		// #ifdef APP-PLUS
		webView = this.$scope.$getAppWebview();
		// #endif
		if (option.data){
			let data = JSON.parse(option.data)
			// this.params = data
			this.content = data.name
			this.focuse = false
			//执行搜索
			this.doSearch()
			
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
