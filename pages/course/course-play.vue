<template>
	<view class="course-play">
		<!-- #ifndef APP-PLUS -->
		<video class="video" id="playVideo" src="http://baobab.kaiyanapp.com/api/v1/playUrl?vid=164016&resourceType=video&editionType=low&source=aliyun&playUrlType=url_oss"
		 controls></video>
		<!-- #endif -->
		
		<!-- 详情 -->
		<view class="course-info space-between">
			<text class="title">{{courseDetail.title}}</text>
			<view class="right" @click="navTo(`/pages/course/course-details?id=${id}`)">
				<text>详情</text>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		
		<!-- 课程列表 -->
		<course-section ref="sectionRef" :isBuy="true" :chapterList="courseSection" @openVideo="openVideo"></course-section>
		
		
		<!-- 底部按钮：分享，评论 -->
		<view class="bottom center">
			<view class="btn-item one column" @click="share">
				<text class="iconfont icon-Share-Outline"></text>
				<text>分享</text>
			</view>
			<view class="btn-item one column" @click="openComment">
				<text class="iconfont icon-edit"></text>
				<text>评价</text>
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
import {getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick} from "vue";
import { onReady,onNavigationBarButtonTap,onReachBottom,onPageScroll } from '@dcloudio/uni-app';
import courseSection from './cpns/course-section.vue'
import {getCourseDetail,getCourseSection} from '@/request/course-api.js'
let videoContext = null
export default {
	components:{
		"course-section":courseSection
	},
	setup(){
		let {proxy} = getCurrentInstance()
		let sectionRef = ref(null)	//课程组件
		let myShare = ref(null)		//分享组件
		let state = reactive({
			id:null,
			courseDetail:{},	//课程详情
			courseSection:[],	//章节
			providerList:[	//h5分享页面数据
				{id: 'weixin',name: '微信好友',sort:0,icon: '/static/share/weixin.png'},
				{id: 'weixin',name: '朋友圈',type:'WXSenceTimeline',sort:1,icon: '/static/share/pengyouquan.png'},
				{id: 'sinaweibo',name: '新浪微博',sort:2,icon: '/static/share/weibo.png'},
				{id: 'qq',name: 'QQ好友',sort:3,icon: '/static/share/qq.png'},
				{id: 'copy',name: '复制链接',sort: 4,icon: '/static/share/link.png'}
			]
		})
		
		//点击不同的章节
		const openVideo=(section)=>{
			//判断是否购买课程，购买了课程就进入观看页面(非试看组件)
			sectionRef.value.actSect=section.name	//修改子组件中数据
			// proxy.navTo('/pages/course/course-play?id='+state.id)
		}
		//点击分享按钮，显示关闭分享组件
		const share=()=>{
			myShare.value.isShow=!myShare.value.isShow
			
		}
		//点击评价按钮
		const openComment=()=>{
			console.log('评论')
		}
		return{
			sectionRef,
			myShare,
			...toRefs(state),
			
			openVideo,
			share,
			openComment
		}
	},
	async onLoad(option) {
		this.id=option.id
		this.courseDetail=await getCourseDetail(this.id)
		this.courseSection=await getCourseSection(this.id)
	},
	onReady(){
		videoContext=uni.createVideoContext('playVideo',this)
	}

}
</script>

<style lang="scss">
.video{
	width: 100%;
	height: 500rpx;
}
.course-play {
	padding-bottom: 100rpx;
}
.course-info {
	padding: 30rpx;
	font-weight: bold;
	border-bottom: $mxg-underLine;
	.title {
		width: 500rpx;
		font-size: 35rpx;
		line-height: 60rpx;
		color: $mxg-text-color-black;
	}
	.right>text{
		font-size: 28rpx;
		line-height: 60rpx;
		color: $mxg-text-color-black;
	}
}

.bottom {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100rpx;
	background-color: #FFFFFF;
	border-top: $mxg-underLine;
}

.btn-item {
	text {
		text-align: center;
		color: $mxg-text-color-grey;
		font-size: 25rpx;
	}
	.iconfont {
		font-size: 38rpx;
	}
}
</style>
