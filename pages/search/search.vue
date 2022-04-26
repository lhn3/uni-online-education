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
		<keywords @changeContent="changeContent" :historyWord="historyWord" v-if="showWords"></keywords>
		
		<!-- 分类标签 -->
		<tab-bar v-if="!showWords" :tabs="tabs" @changeTab="changeTab"></tab-bar>
		<!-- 搜索结果 -->
		<block v-if="!showWords">
			<!-- 下拉过滤 -->
			<course-list ref="mescrollItem0" :i="0" :index="tabIndex" :params="params" :content="content"></course-list>
			<article-list ref="mescrollItem1" :i="1" :index="tabIndex" :params="params" :content="content"></article-list>
			<question-list ref="mescrollItem2" :i="2" :index="tabIndex" :params="params" :content="content"></question-list>
		</block>
	</view>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs,onMounted,nextTick} from "vue";
import { onNavigationBarButtonTap,onNavigationBarSearchInputChanged,onNavigationBarSearchInputConfirmed } from '@dcloudio/uni-app';
import uniSearchBar from "@/uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue"
import keywords from "./cpns/keywords.vue"
import courseList from "./cpns/course-list.vue"
import articleList from "./cpns/article-list.vue"
import questionList from "./cpns/question-list.vue"
import MescrollMoreMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js";
	
let webView = null
export default {
	mixins: [MescrollMoreMixin], // 多个mescroll-body写在子组件时, 则使用mescroll-more.js补充子组件的页面生命周期
	components:{
		'uni-search-bar':uniSearchBar,
		'keywords':keywords,
		'course-list':courseList,
		'article-list':articleList,
		'question-list':questionList
	},
	setup(){
		const { proxy } = getCurrentInstance();
		let params = ref({})//页面跳转传参
		let content = ref(null)//输入框内容
		let focuse = ref(false)//是否获取焦点，仅小程序
		let historyWord = ref(null)//上次搜索内容
		let showWords = ref(true)//是否显示搜索关键词
		let tabIndex = ref(0)
		let tabs = ref([		//搜索结果tab栏标签
			{id:1,name:'课程'},
			{id:2,name:'文章'},
			{id:3,name:'问答'},
		])
		let mescrollItem0=ref()
		let mescrollItem1=ref()
		let mescrollItem2=ref()
		//假装搜索的一整个大动作
		const doSearch = ()=>{
			//节流
			proxy.$utils.throttle(()=>{
				if((content.value == "" || content.value == null) && Object.keys(params.value).length==0){
					proxy.$message.toast('请输入搜索内容')
				}else{
					console.log('搜索内容:'+content.value)
					// 存储历史搜索内容
					historyWord.value=content.value
					showWords.value=false
					nextTick(()=>{
						proxy.$refs[`mescrollItem${tabIndex.value}`].changeCategory()
					})
				}
			})
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
		let changeTab=(id,index)=>{
			console.log('点击了标签：'+id)
			tabIndex.value=index
		}
		return{
			params,
			content,
			focuse,
			historyWord,
			showWords,
			tabs,
			tabIndex,
			mescrollItem0,
			mescrollItem1,
			mescrollItem2,
			
			doSearch,
			inputChange,
			changeContent,
			changeTab
		}
	},
	onLoad(option) {
		// #ifdef APP-PLUS
		webView = this.$scope.$getAppWebview();
		// #endif
		if (option.data){
			let data = JSON.parse(option.data)
			// this.content = data.name
			this.focuse = false
			this.params = data
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
