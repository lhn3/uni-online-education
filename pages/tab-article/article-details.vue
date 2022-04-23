<template>
	<view>
		<!-- 标签 -->
		<view class="example-body">
			<view class="tag-view" v-for="(item,index) in articleDetail.labelList" :key="item.id">
				<uni-tag :circle="true" :inverted="true" :text="item.name" :type="type[index]" />
			</view>
		</view>
				
		<view class="content-main">
			<text class="title">{{articleDetail.title}}</text>
			<view class="info">
				<view class="author center">
					<image :src="articleDetail.userImage"></image>
					<text>{{articleDetail.nickName}}</text>
				</view>
				<text> · {{articleDetail.updateDate}}</text>
				<text> · {{articleDetail.viewCount}}人阅读</text>
			</view>
			
			<!-- 文章内容 -->
			<!-- #ifdef MP -->
			<!-- nodes 是html代码字符串 -->
			<rich-text selectable="true" :nodes="articleDetail.htmlContent"></rich-text>
			<!-- #endif -->
			<!-- #ifndef MP -->
			<text selectable="true" v-html="articleDetail.htmlContent"></text>
			<!-- #endif -->
		</view>
		
		<!-- 热门评论 -->
		<view class="footer">
			<view class="comment">
				<view class="footer-header">热门评论</view>
				<view class="comment-item row" v-for="item in commentList" :key="item.id">
					<image :src="item.userImage"></image>
					<view class="comment-right">
						<view class="info space-between center">
							<text>{{item.nickName}}</text>
							<text>{{item.createDate}}</text>
						</view>
						<text class="content">{{item.content}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 评论区 -->
		<view class="bottom center" @touchmove.stop.prevent="()=>{}">
			<textarea v-model="content" class="textarea" placeholder="有何高见,展开讲讲……" />
			<button class="btn" size="mini" @click="submit">提交</button>
		</view>	
		
		<!-- 分享组件 -->
		<!-- #ifdef APP-PLUS -->
		<my-share ref="myShare" :shareDate="{title:articleDetail.title,mainImage:articleDetail.imageUrl}"></my-share>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS -->
		<my-share ref="myShare" :providerList="providerList" :shareDate="{title:articleDetail.title,mainImage:articleDetail.imageUrl}"></my-share>
		<!-- #endif -->
	</view>
	

</template>

<script>
import { getCurrentInstance,ref,reactive,toRefs,onMounted,nextTick } from "vue";
import { onNavigationBarButtonTap } from '@dcloudio/uni-app';
import {useStore} from 'vuex'
import uniTag from '@/uni_modules/uni-tag/components/uni-tag/uni-tag.vue'
import {getArticleDetail,getArticleComment,addArticleComment} from '@/request/article-api.js'

export default {
	components:{
		'uni-tag':uniTag
	},
	setup(){
		let {proxy} = getCurrentInstance()
		let store = useStore()
		let providerList = ref([	//h5分享页面数据
			{id: 'weixin',name: '微信好友',sort:0,icon: '/static/share/weixin.png'},
			{id: 'weixin',name: '朋友圈',type:'WXSenceTimeline',sort:1,icon: '/static/share/pengyouquan.png'},
			{id: 'sinaweibo',name: '新浪微博',sort:2,icon: '/static/share/weibo.png'},
			{id: 'qq',name: 'QQ好友',sort:3,icon: '/static/share/qq.png'},
			{id: 'copy',name: '复制链接',sort: 4,icon: '/static/share/link.png'}
		])
		let id = ref(null)
		let myShare = ref(null)			//分享组件
		let type = ['primary','success','warning','error']
		let articleDetail = ref({})		//文章详情
		let commentList = ref([])		//评论列表
		let content = ref('')
		
		onMounted(async ()=>{
			articleDetail.value = await getArticleDetail(id.value)
			uni.setNavigationBarTitle({
				title:articleDetail.value.title
			})
			commentList.value = await getArticleComment(id.value)
		})
		
		//提交评论
		const submit = async ()=>{
			//评论内容不能为空
			if(content.value.trim() == ''){
				proxy.$message.toast('评论内容不能为空')
				return;
			}
			
			//检测是否登录
			if(!proxy.$utils.isLogin()) return;
			let data = {
			  "id": 1,
			  "parentId": "-1",
			  "userId": 1,
			  "nickName": store.state.nickName,
			  "userImage": store.state.imageUrl,
			  "articleId": id.value,
			  "content": content.value,
			  "createDate": "2019-04-13 05:54:16"
			}
			commentList.value.unshift(data)
			await addArticleComment(data)
			content.value = ''
			proxy.$message.toast('发表成功','success')
		}
		
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
			articleDetail,
			commentList,
			content,
			
			submit
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
.example-body{
	display: flex;
	flex-wrap: wrap;
	margin: 20rpx;
	.tag-view{
		margin: 0 20rpx 20rpx 0;
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

/* 底部 */
.bottom {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	white-space: nowrap;// 不换行
	padding: 20rpx;
	background-color: #FFFFFF;
	border-top: $mxg-underLine;
	.textarea {
		font-size: 30rpx;
		padding: 15rpx 20rpx;
		width: 100%;
		height: 50rpx;
		background-color: #F8F9FB;
		border-radius: 30rpx;
	}
	.btn {
		text-align: center;
		margin-left: 15rpx;
		background-color: $mxg-color-primary;
		color: #FFFFFF;
	}
}
</style>
