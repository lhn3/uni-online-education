<template>
	<view>
		<!-- 蒙层 -->
		<view v-if="isShow" @click="show" class="mask" @touchmove.stop.prevent="()=>{}" catchtouchmove="true"></view>
		<view v-if="isShow" class="course-comment center column">
			<!-- v-model 无效 -->
			<!-- <uni-rate :size="22" v-model="state.score"></uni-rate> -->
			<uni-rate :size="22" :value="state.score" @change="changeRate"></uni-rate>
			<text class="desc">{{descArr[state.score-1]}}</text>
			<view class="input-box center">
				<textarea v-model="state.content" class="textarea" placeholder="请输入评价内容……"></textarea>
				<text class="btn" @click="submitComment">提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	
import {ref,reactive,onMounted,toRefs} from "vue";
export default {
	props: {
		comment: {
			type: Object,
			default: ()=>({
				// userId: 1, // 当前用户id
				// nickName: 'xxx梦',
				// userImage: 'xxx.png',
				// content: '', // 评论内容
				// score: 5 // 评分值
			})
		},
		descArr: { //每个评分的提示内容
			type: Array,
			default: () => [
				'极差,课程很糟糕，我要吐槽。', 
				'差,我对课程不满意。', 
				'中评,课程一般。', 
				'良好,课程还可以。', 
				'推荐,课程非常棒。'
			]
		}
	},
	setup(props){
		let isShow=ref(false)
		let state=ref({
			userId: null, 		// 当前用户id
			nickName: '',		
			userImage: '',
			content: '', 		// 评论内容
			score: 5 			// 评分值
		})
		
		onMounted(()=>{
			state.value={...props.comment}
		})
		
		//组件隐藏
		const show = ()=>{
			isShow.value = false
		}

		// 选择评分
		let changeRate=(value)=>{
			state.value.score=value.value
		}
		
		//提交按钮
		let submitComment=()=>{
			console.log(state.value)
			isShow.value = false
		}

		return{
			isShow,
			state,
			
			show,
			changeRate,
			submitComment
		}
	}
}
</script>

<style lang="scss">
.course-comment {
	z-index: 100;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 50%;
	width: 650rpx;
	margin: 0 auto;
	padding-top: 30rpx;
	font-size: 30rpx;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	.desc {
		color: $mxg-text-color-black;
		letter-spacing: 2px;
		padding: 20rpx 0;
	}
	.input-box {
		border-top: $mxg-underLine;
		width: 100%;
		white-space: nowrap;
	}
	.textarea {
		background-color: #F8F9FB;
		border-radius: 0 0 0 20rpx;
		height: 100rpx;
		font-size: 30rpx;
		padding: 10rpx;
		width: 100%;
	}
	.btn {
		padding: 0 15rpx;
		color: $mxg-color-primary;
	}
}
	
</style>
