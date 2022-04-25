<template>
	<view>
		<no-data v-if="!list || list.length<1"></no-data>
		<view v-else 
			v-for="(item, index) in list" :key="index"
			@click="navTo(`/pages/course/course-play?id=${item.id}`, {login: true})"
			class="course-item center">
			<view class="item-left column">
				<text class="title text-ellipsis">{{ item.title }}</text>
				<view>
					<text class="per">已学{{ item.percent }}%</text>
					<progress :percent="item.percent" activeColor="#A2CD5A" stroke-width="2"></progress>
				</view>
			</view>
			<view class="right">
				<image :src="item.mainImage" lazy-load></image>
			</view>
		</view>
	</view>
</template>

<script>
import {myCourseList} from '@/request/course-api.js'
import {getCurrentInstance,ref,onMounted} from "vue";
export default {
	setup(){
		let list = ref([])
		onMounted(async () => {
			list.value = await myCourseList()
		})
		
		return{
			list
		}
	}
}
</script>

<style lang="scss">
.course-item {
	width: 100%;
	padding: 30rpx 0;
	.item-left {
		justify-content: space-between;
		width: 435rpx;
		height: 150rpx;
		margin-right: 20rpx;
		.title {
			font-size: 28rpx;
			font-weight: bold;
			line-height: 35rpx;
		}
		.per {
			font-size: 28rpx;
			color: $mxg-text-color-grey;
			line-height: 50rpx;
		}
	}
	
	.right {
		image {
			width: 245rpx;
			height: 150rpx;
			border-radius: 10rpx;
		}
	}
}
</style>
