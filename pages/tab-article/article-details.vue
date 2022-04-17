<template>
	<view>
		<!-- 标签 -->
		<view class="example-body">
			<view class="tag-view" v-for="(item,index) in 10" :key="item">
				<uni-tag :circle="true" :inverted="true" text="标签" :type="type[index]" />
			</view>
		</view>
		
		<!-- 分享组件 -->
		<!-- #ifdef APP-PLUS -->
		<my-share ref="myShare" :shareDate="courseDetail"></my-share>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS -->
		<my-share ref="myShare" :providerList="providerList" :shareDate="courseDetail"></my-share>
		<!-- #endif -->
	</view>
	

</template>

<script>
import { getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick } from "vue";
import { onNavigationBarButtonTap } from '@dcloudio/uni-app';
import uniTag from '@/uni_modules/uni-tag/components/uni-tag/uni-tag.vue'
import {getArticleDetail} from '@/request/article-api.js'

export default {
	components:{
		'uni-tag':uniTag
	},
	setup(){
		let {proxy} = getCurrentInstance()
		let providerList = ref([	//h5分享页面数据
			{id: 'weixin',name: '微信好友',sort:0,icon: '/static/share/weixin.png'},
			{id: 'weixin',name: '朋友圈',type:'WXSenceTimeline',sort:1,icon: '/static/share/pengyouquan.png'},
			{id: 'sinaweibo',name: '新浪微博',sort:2,icon: '/static/share/weibo.png'},
			{id: 'qq',name: 'QQ好友',sort:3,icon: '/static/share/qq.png'},
			{id: 'copy',name: '复制链接',sort: 4,icon: '/static/share/link.png'}
		])
		let id = ref(null)
		let myShare = ref(null)
		let articleDetail = ref({})
		let type = ['primary','success','warning','error']
		
		// onMounted(async ()=>{
		// 	let res = await getArticleDetail(id.value)
		// 	articleDetail.value = res
		// })
		
		//分享按钮
		//监听导航栏按钮点击
		onNavigationBarButtonTap((e)=>{
			if(e.type="share"){
				myShare.value.isShow=!myShare.value.isShow
			}
		})
		
		return{
			id,
			providerList,
			myShare,
			type
		}
	},
	onLoad(option) {
		if(option.id){
			this.id=option.id
		}
	}
}
</script>

<style lang="scss">
.example-body{
	display: flex;
	flex-wrap: wrap;
	margin: 20rpx;
	.tag-view{
		margin: 0 20rpx 20rpx 0;
	}
}
</style>
