<template>
	<view class="main">
		<view class="sw-background" ></view>
		<swiper :indicator-dots="true" :circular="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper" @change="change">
			<swiper-item class="swiper-item" v-for="item in banners" :key="item.id" @click="navTo(item.advertUrl)">
				<image :src="item.imageUrl" class="swiper-img"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import {getCurrentInstance,ref} from "vue";
export default {
	props:{
		banners:{
			type:Array,
			default:()=>[
				// {
				// 	id:1,
				// 	imageUrl:'/static/images/banner6.jpg',
				// 	background:'#00c0ff',
				// 	adverUrl:''
				// },
				// {
				// 	id:2,
				// 	imageUrl:'/static/images/banner5.jpg',
				// 	background:'#254284',
				// 	adverUrl:''
				// },
				// {
				// 	id:3,
				// 	imageUrl:'/static/images/banner7.jpg',
				// 	background:'#0d4277',
				// 	adverUrl:''
				// }
			]
		}
	},
	setup(props){
		let background = ref('#254284')
		const change = (e)=>{
			background.value = props.banners[e.detail.current].background
		}
		return{
			change,
			background
		}
	}
}
</script>

<style lang="scss" scoped>
.main{
	padding-top: 120rpx;
	/* #ifdef APP-PLUS */
	padding-top: calc(var(--status-bar-height) + 120rpx);
	/* #endif */
	.sw-background{
		position: absolute;
		top: 0;
		transform: 0.5s;
		height: 520rpx;
		/* #ifdef APP-PLUS */
		height: calc(var(--status-bar-height) + 520rpx);
		/* #endif */
		width: 100%;
		background-image: linear-gradient(v-bind(background) 50%,#fff);
	}
	.swiper{
		width: 750rpx;
		height: 400rpx;
		.swiper-item{
			width: 100%;
			height: 100%;
			padding: 0 30rpx;
			.swiper-img{
				width: 100%;
				height: 100%;
				border-radius: 30rpx;
			}
		}
	}
}


</style>
