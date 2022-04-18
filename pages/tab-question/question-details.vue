<template>
	<view>
		<!-- 所属标签 -->
		<view class="tag-list row" >
			<uni-tag v-for="(item, index) in 5" :key="index" :text="item" class="tag-view" :type="type[index]" size="small" :circle="true" :inverted="true" />
		</view>
		
		<!-- 问题详情 -->
		<view class="content-main">
			<text class="title">title</text>
			<view class="info">
				<view class="author center">
					<image src="/static/logo.png"></image>
					<text>网名</text>
				</view>
				<text> · 时间</text>
			</view>
			
			<!-- 文章内容 -->
			<!-- #ifdef MP -->
			<!-- nodes 是html代码字符串 -->
			<rich-text class="markdown-body" selectable="true" nodes="<h2 style='color:red'>文章内容</h2>"></rich-text>
			<!-- #endif -->
			<!-- #ifndef MP -->
			<text class="markdown-body" selectable="true" v-html="`<h2 style='color:red'>文章内容</h2>`"></text>
			<!-- #endif -->
		</view>
		
		<!-- 回答 -->
		<view class="footer">
			<view class="comment">
				<view class="footer-header">1个回答</view>
				<view class="comment-item row" >
					<image src="/static/logo.png"></image>
					<view class="comment-right">
						<view class="info space-between center">
							<text></text>
							<text> </text>
						</view>
						<!-- <text class="content">{{item.htmlContent}}</text> -->
						<!-- #ifdef MP -->
						<rich-text class="markdown-body content" selectable="true" nodes="<h2 style='color:red'>文章内容</h2>"></rich-text>
						<!-- #endif -->
						<!-- #ifndef MP -->
						<text class="markdown-body content" selectable="true" v-html="`<h2 style='color:red'>文章内容</h2>`"></text>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部按钮：关注和评论按钮 -->
		<view class="question-option row">
			<!-- 0 未关注，1已关注   -->
			<text class="one grey">已关注问题</text>
			<text class="one iconfont icon-jiaguanzhu">关注问题</text>
			<text class="one iconfont icon-edit">回答问题</text>
		</view>
		
		<!-- 回答问题输入框 -->
		<view v-if="showAnswer" class="answer-box" @touchmove.stop.prevent="()=>{}">
			<view class="title center" @touchend.prevent="()=>{}">
				<view class="one">
					<text class="iconfont icon-close"></text>
				</view>
				<text class="one">回答问题</text>
				<button class="btn" type="primary" size="mini">提交</button>
			</view>
			<textarea v-model="content" maxlength="200" class="textarea" placeholder="有何高见,展开讲讲……" />
		</view>
		
		<!-- 分享组件 -->
		<!-- #ifdef APP-PLUS -->
		<my-share ref="myShare" :shareDate="{title:'title'}"></my-share>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS -->
		<my-share ref="myShare" :providerList="providerList" :shareDate="{title:'title'}"></my-share>
		<!-- #endif -->
	</view>
</template>

<script>
import { getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick } from "vue";
import { onNavigationBarButtonTap } from '@dcloudio/uni-app';
import uniTag from '@/uni_modules/uni-tag/components/uni-tag/uni-tag.vue'
import {getQuestionDetail} from '@/request/question-api.js'

export default {
	setup(){
		let {proxy} = getCurrentInstance()
		let id = ref(null)
		let providerList = ref([	//h5分享页面数据
			{id: 'weixin',name: '微信好友',sort:0,icon: '/static/share/weixin.png'},
			{id: 'weixin',name: '朋友圈',type:'WXSenceTimeline',sort:1,icon: '/static/share/pengyouquan.png'},
			{id: 'sinaweibo',name: '新浪微博',sort:2,icon: '/static/share/weibo.png'},
			{id: 'qq',name: 'QQ好友',sort:3,icon: '/static/share/qq.png'},
			{id: 'copy',name: '复制链接',sort: 4,icon: '/static/share/link.png'}
		])
		let myShare = ref(null)			//分享组件
		let type = ['primary','success','warning','error']
		let questionDetail = ref({})		//文章详情
		let showAnswer = ref(false)
		let content = ref('')
		
		onMounted(async ()=>{
			// questionDetail.value = await getQuestionDetail(id.value)
			// uni.setNavigationBarTitle({
				// title:articleDetail.value.title
			// })
		})
		
		//提交回答
		// const submit = async ()=>{
		// 	//评论内容不能为空
		// 	if(content.value.trim() == ''){
		// 		proxy.$message.toast('评论内容不能为空')
		// 		return;
		// 	}
			
		// 	//检测是否登录
		// 	if(!proxy.$utils.isLogin()) return;
			
		// 	commentList.value.unshift({
		// 	  "id": 1,
		// 	  "parentId": "-1",
		// 	  "userId": 1,
		// 	  "nickName": "小明",
		// 	  "userImage": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F6477f4d1e658b314b5e7d5db2c92306e50c711ef.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto",
		// 	  "articleId": id.value,
		// 	  "content": content.value,
		// 	  "createDate": "2019-04-13 05:54:16"
		// 	})
		// 	let res = await addArticleComment(commentList.value)
		// 	content.value = ''
		// 	proxy.$message.toast('发表成功','success')
		// }
		
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
			type,
			questionDetail,
			showAnswer,
			content
			
			// submit
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
@import url("@/common/css/github-markdown.css");
@import url("@/common/css/github-min.css");
.tag-list {
	// 一行排列不下，换行
	flex-wrap: wrap;
	padding: 10rpx 25rpx;
	font-size: 14px;
	background-color: #ffffff;
	.tag-view {
		margin-top: 15rpx;
		margin-right: 20rpx;
	}
}

.content-main {
	padding: 25rpx;
	.title {
		font-size: 45rpx;
		line-height: 55rpx;
		font-weight: bold;
	}
	.info {
		display: flex;
		align-items: center;
		margin: 30rpx 0;
		.author {
			font-size: 30rpx;
			color: #303133;
			image {
				width: 45rpx;
				height: 45rpx;
				border-radius: 100%;
				margin-right: 10rpx;
			}
		}
		&>text {
			margin-left: 10rpx;
			font-size: 25rpx;
			color: #999;
		}
	}
}

.footer {
	background-color: #F1F1F1;
	padding-top: 10rpx;
	/* 标题 */
	.footer-header{
		font-size: 30rpx;
		color: #303133;
		font-weight: bold;
		padding: 25rpx;
		&:before{
			content: '';
			width: 0;
			height: 40rpx;
			margin-right: 25rpx;
			border-left: 6rpx solid $mxg-color-primary;
		}
	}
}

/* 评论 */
.comment {
	background-color: #FFFFFF;
	margin-top: 10rpx;
	// 最下方有评论按钮,
	padding-bottom: 120rpx;
	.comment-item {
		padding: 20rpx 25rpx;
		image{
			width: 50rpx;
			height: 50rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
		}
		
		.comment-right{
			width: calc(100% - 80rpx);
			font-size: 25rpx;
			color: $mxg-text-color-grey;
			.content{
				font-size: 30rpx;
				color: $mxg-text-color-black;
				margin: 10rpx 0;
			}
		}
	}
}


.question-option {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	text-align: center;
	border-top: $mxg-underLine;
	background-color: $mxg-color-grey;
	text {
		color: $mxg-text-color-blue;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 90rpx;
		&:first-child {
			border-right: $mxg-underLine;
		}
	}
	.grey {
		color: $mxg-text-color-grey;
	}
}

/* 底部 */
.answer-box {
	z-index: 100;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 20rpx;
	background-color: #FFFFFF;
	border-radius: 20rpx 20rpx 0 0;
	box-shadow: 0 0 5px $mxg-text-color-grey;
	.title {
		font-size: 35rpx;
		font-weight: bold;
		padding: 20rpx 0;
	}
	.iconfont {
		 padding: 20rpx;
		color: $mxg-color-primary;
	}
	.btn {
		padding: 0 20rpx;
		margin-left: 15rpx;
	}
	.textarea {
		height: 350rpx;
		font-size: 30rpx;
		padding: 15rpx 20rpx;
		width: 100%;
		background-color: #F8F9FB;
	}
}
</style>
