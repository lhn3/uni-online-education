<template>
	<view class="course-play">
		<!-- #ifndef APP-PLUS -->
		<video class="video" id="playVideo" :src="videoUrl"
		 controls :poster="poster"></video>
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
		
		<!-- 评价组件 -->
		<comment ref="commentRef" :comment="comment" @submit='submit'></comment>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick,watch} from "vue";
import { onReady,onNavigationBarButtonTap,onReachBottom,onPageScroll } from '@dcloudio/uni-app';
import courseSection from './cpns/course-section.vue'
import {getBuyCourseSection,getCourseDetail,updateComment} from '@/request/course-api.js'
let videoContext = null
export default {
	components:{
		"course-section":courseSection
	},
	setup(){
		let {proxy} = getCurrentInstance()
		let sectionRef = ref(null)	//课程组件
		let myShare = ref(null)		//分享组件
		let commentRef = ref(null)		//评价组件
		let state = reactive({
			id:null,
			courseDetail:{},	//课程详情
			courseSection:[],	//章节
			poster:'',			//视频主图
			videoUrl:'',		//视频地址
			comment:{
				userId: 1, // 当前用户id
				courseId:10,//课程id
				nickName: 'Liu',
				userImage: '',
				content: '', // 评论内容
				score: 5 // 评分值
			},
			activeVideo:{		// 正在播放的视频章节和之章节索引
				parentIndex: 0,
				childIndex: 0
			},	
			providerList:[	//h5分享页面数据
				{id: 'weixin',name: '微信好友',sort:0,icon: '/static/share/weixin.png'},
				{id: 'weixin',name: '朋友圈',type:'WXSenceTimeline',sort:1,icon: '/static/share/pengyouquan.png'},
				{id: 'sinaweibo',name: '新浪微博',sort:2,icon: '/static/share/weibo.png'},
				{id: 'qq',name: 'QQ好友',sort:3,icon: '/static/share/qq.png'},
				{id: 'copy',name: '复制链接',sort: 4,icon: '/static/share/link.png'}
			]
		})
		
		//点击不同的章节
		const openVideo=(itemInfo)=>{
			sectionRef.value.actSect = itemInfo.section.name	//修改子组件中 保持选中 的参数
			
			// 非APP端视频切换
			// #ifndef APP-PLUS
			uni.request({
				url:itemInfo.section.videoUrl,
				method:'GET',
				success:(res)=> {
					videoContext.pause()
					state.videoUrl = res.data.data.url	//设置播放url
				},
				complete: () => {
					setTimeout(()=>{
						videoContext.play()
					},300)
				}
			})
			// #endif
			
			//APP端视频切换，向nvue文件传递视频信息
			// #ifdef APP-PLUS
			state.activeVideo.parentIndex = itemInfo.parentIndex
			state.activeVideo.childIndex = itemInfo.childIndex
			uni.$emit('videoInfo',{
				type:'update',
				activeVideo:state.activeVideo,	//视频索引
				section:itemInfo.section		//正在播放的视频信息对象
				})
			// #endif
		}
		//点击分享按钮，显示关闭分享组件
		const share=()=>{
			myShare.value.isShow=!myShare.value.isShow
		}
		//点击评价按钮
		const openComment=()=>{
			commentRef.value.isShow = !commentRef.value.isShow
		}
		//提交评论
		const submit = async (data) => {
			let res = await updateComment(data) 
			if(res.code == 200){
				proxy.$message.toast('发表成功','success')
				commentRef.value.isShow = false
				data.score=5
				data.content=''
			}
		}
		return{
			sectionRef,
			myShare,
			commentRef,
			...toRefs(state),
			
			openVideo,
			share,
			openComment,
			submit
		}
	},
	async onLoad(option) {
		this.id=option.id
		this.getPageInfo()
	},
	onReady(){
		// #ifndef APP-PLUS
		videoContext=uni.createVideoContext('playVideo',this)
		// #endif
	},
	methods:{
		// 初始化获取页面信息
		async getPageInfo(){
			this.courseDetail=await getCourseDetail(this.id)
			this.courseSection=await getBuyCourseSection(this.id)
			
			// 非APP端初始化
			// #ifndef APP-PLUS
			this.poster = this.courseDetail.mainImage								//设置主图
			uni.request({
				url:this.courseSection[0].sectionList[0].videoUrl,
				method:'GET',
				success:(res)=> {
					this.videoUrl = res.data.data.url	//设置播放url
				}
			})
			// #endif
			
			// 初始化APP端视频信息,发射事件
			// #ifdef APP-PLUS
			uni.$emit('videoInfo',{
				type:'init',
				courseDetail:this.courseDetail,	//课程信息
				courseSection:this.courseSection,//此课程所有视频
				activeVideo:this.activeVideo,	// 正在播放的视频章节和之章节索引
				sectionRef:this.$refs.sectionRef//课程组件实例，方便改变组件中判断选择的视频背景
				})
			// #endif
			
			this.$refs.sectionRef.actSect=this.courseSection[0].sectionList[0].name	//修改子组件中数据
		}
	}
}
</script>

<style lang="scss">
.video{
	width: 100%;
	height: 450rpx;
	position: fixed;
	top: 0;
	left: 0;
}
.course-play {
	padding-bottom: 100rpx;
}
.course-info {
	/* #ifndef APP-PLUS */
	margin-top: 450rpx;
	/* #endif */
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
