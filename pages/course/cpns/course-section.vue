<template>
	<view class="course-dir">
		<view v-for="(chapter, index) in chapterList" :key="index">
			<!-- 第几章 -->
			<text class="chapters text-ellipsis">第{{index+1}}章 {{chapter.name}}</text>
			<!-- 第几节 -->
			<view class="sections row" :class="{active:actSect == section.name }" v-for="(section, index2) in chapter.sectionList" :key="index2"  @click="handleClick(section,index,index2)">
				<text class="iconfont icon-roundrightfill"></text>
				<view class="row">
					<text>{{index+1}}-{{index2+1}}</text>
					<text class="title text-ellipsis">{{section.name}}</text>
				</view>
				<text v-if="(section.isFree || isFree) && !isBuy" class="see">试看</text>
				<text v-else-if="isBuy" class="see iconfont icon-play"></text>
			</view>
		</view>
	</view>
</template>

<script>
import {ref} from 'vue'
export default {
	props: {
		isBuy: Boolean, // 是否购买
		isFree: Number,//是否是免费课程
		chapterList: {
			type: Array,
			default: () => [
				// {
				// 	id: 1,
				// 	name: '项目内容介绍',
				// 	sectionList: [ //课节信息
				// 		{id: 1,name: '什么是uniapp框架',isFree: 1}, // 是否付费（0付费，1免费）
				// 		{id: 2,name: '安装开发工具和插件',isFree: 1},
				// 		{id: 3,name: '开发第一个helloworld项目',isFree: 0}
				// 	]
				// },
				// {
				// 	id: 2,
				// 	name: '初始化梦学谷在线教育项目',
				// 	sectionList: [ //课节信息
				// 		{id: 3,name: '创建项目和完善配置',isFree: 0},
				// 		{id: 4,name: '导入静态文件内容',isFree: 0}
				// 	]
				// }
			]
		}
	},
	setup(props,{emit}){
		let actSect=ref("")
		let handleClick = (section,parentIndex,childIndex) => {
			// 只有试看的才打开试看窗口，保持选择
			if((section.isFree || props.isFree) && !props.isBuy){
				actSect.value=section.name
			}
			emit('openVideo',{section,parentIndex,childIndex})
		}
		return{
			actSect,
			handleClick
		}
		
	}
}
</script>

<style lang="scss">
.course-dir {
	padding: 0 36rpx;
	.chapters {
		margin-top: 30rpx;
		margin-bottom: 10rpx;
		color: $mxg-text-color-black;
		font-size: 35rpx;
		font-weight: bold;
	}
	.sections {
		padding: 20rpx 0;
		font-size: 30rpx;
		border-bottom: $mxg-underLine;
		line-height: 40rpx;
		color: #3d3c40;
		text {
			margin-right: 10rpx;
		}
		.title {
			width: 470rpx;
		}
		.see {
			color: $mxg-color-primary;
			font-size: 25rpx;
			// 靠右
			flex: 1;
			text-align: right;
		}
	}
	.active {
		color: $mxg-color-primary;
	}
}
</style>
