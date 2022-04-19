<template>
	<view class="list-box">
		<!-- 一大类列表 -->
		<view class="list" v-for="(item, index) in list" :key="index">
			<view v-for="(nav, i) in item" :key="i"
				@click="clickHandler(nav)"
				class="list-item space-between center"
				:hover-class="nav.checked || nav.checked === false ? '': 'active'" 
				:hover-start-time="50"
			>
				<view class="left center">
					<text v-if="nav.icon" :class="nav.icon"></text>
					<text>{{nav.title}}</text>
				</view>
				<view class="right center">
					<text v-if="nav.text" >{{nav.text}}</text>
					<!-- 阻止调用父组件的click事件 -->
					<switch v-if="nav.checked || nav.checked === false"
						@click.stop="()=>{}" @change="clickHandler(nav)"
						:checked="nav.checked" color="#A2CD5A"
						/>
					<image v-if="nav.src" :src="nav.src"></image>
					<text v-if="nav.rightIcon" :class="nav.rightIcon"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: Array,
	},
	
	methods: {
		clickHandler(obj) {
			// console.log('obj', obj.page)
			if(obj.page) {
				// 点击后跳转到目标页面，并且会判断是否要求登录，没有登录进入登录页
				this.navTo(obj.page, {login: obj.login})
				return
			}
			
			if(obj.event) {
				//触发绑定的事件
				this.$emit(obj.event, obj)
			}
			
		}
	}
}
</script>

<style lang="scss">
.list-box {
	background-color: $mxg-color-grey;
	padding-top: 20rpx;
	.list {
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		.list-item {
			padding: 26rpx 39rpx;
			border-bottom: $mxg-underLine;
		}
		.left {
			font-size:  33rpx;
			text:first-child {
				margin-right: 20rpx;
			}
		}
		.right {
			text {
				font-size: 35rpx;
				color: $mxg-text-color-grey;
				margin-left: 15rpx;
			}
			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 60rpx;
			}
			switch {
				margin-right: -10rpx;
			}
		}
		
		.active {
			background-color: #fafafa;
		}
	}
}



image {
	width: 80rpx;
	height: 80rpx;
}
</style>

