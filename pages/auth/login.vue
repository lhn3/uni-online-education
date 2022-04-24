<template>
<view class="app">
		<text class="back-btn iconfont icon-close" @click="navBack()"></text>
		<view class="left-top-sign">LOGIN</view>
		<view class="welcome">欢迎回来！</view>
		
		<!-- 手机验证码 -->
		<view class="input-content">
			<view class="input-item">
				<text class="tit">手机号码</text>
				<view>
					<input v-model="mobile" maxlength="11" type="number" placeholder="请输入手机号码" placeholder-style="color: #909399"/>
				</view>
			</view>
			<view class="input-item">
				<text class="tit">验证码</text>
				<view class="row">
					<input v-model="code" maxlength="6" type="number" placeholder="请输入手机验证码" placeholder-style="color: #909399"/>
					<my-code :mobile="mobile" templateCode="MSM_1999123123"></my-code>
				</view>
			</view>
			<button :loading="loading" type="primary" @click="mobileLogin">登录</button>
		</view>
		
		<view class="other-wrapper center column">
			<view class="line">
				<text class="tit">社交帐号登录</text>
			</view>
			<view class="row">
				<image @click="providerLogin('weixin')" class="icon" src="/static/share/weixin.png"></image>
				<!-- #ifndef MP -->
				<image @click="providerLogin('qq')" class="icon" src="/static/share/qq.png"></image>
				<!-- #endif -->
			</view>
		</view>
		
		<!-- 协议 -->
		<view class="agreement center">
			<text @click="checkAgreement" :class="{active: agreement}" class=" iconfont icon-roundcheckfill"></text>
			<text @click="checkAgreement">请认真阅读并同意</text>
			<text class="tit" @click="navTo('/pages/public/xieyi')">《用户服务协议》</text>
			<text class="tit" @click="navTo('/pages/public/yinsi')">《隐私权政策》</text>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,computed} from "vue";
import {authLogin,authorizationLogin} from "@/request/my-api.js"
import {useStore} from 'vuex'
export default {
	setup(){
		const {proxy} = getCurrentInstance()
		const store = useStore()
		let mobile = ref('')
		let code = ref('')
		let loading = ref(false)
		let agreement = ref(false)
		
		// 有登陆就重定向到个人中心页面
		computed(()=>{
			if(store.state.token) {
				uni.switchTab({
					url:'/pages/tab-index/index'
				})
			}
		})

		//手机号登录
		const mobileLogin = async () => {
			if(!proxy.$utils.checkStr(mobile.value,'mobile')){
				proxy.$message.toast('请输入正确格式的手机号')
				return;
			}else if(!proxy.$utils.checkStr(code.value,'mobileCode')){
				proxy.$message.toast('请输入正确格式的验证码')
				return;
			}else if(agreement.value == false){
				proxy.$message.toast('请同意协议')
				return;
			}else if(code.value != '666666' ){
				proxy.$message.toast('验证码错误')
				return;
			}
			
			// 验证通过执行登录
			uni.showLoading({mask:true})
			loading.value=true
			let res = await authLogin({mobile:mobile.value,code:code.value})
			loading.value=false
			uni.hideLoading()
			proxy.$message.toast('登陆成功','success')
			
			//写入用户信息
			store.commit('saveUserInfo',{
				mobile:mobile.value,
				token:res.access_token,
				username:res.userInfo.username,
				imageUrl:res.userInfo.imageUrl,
				nickName:res.userInfo.nickName
			})
					
			//页面跳转
			setTimeout(()=>{
				proxy.navBack()
			},1000)
		}
		
		//微信qq方式登录
		const providerLogin = (type) => {
			if(agreement.value == false){
				proxy.$message.toast('请同意协议')
				return;
			}
			uni.showLoading({mask:true})
			uni.login({	//认证登录
				provider:type,
				// #ifdef MP
				scopes:'auth_user',
				// #endif
				success: (res) => authorization(res.authResult),
				fail: (err) => {
					proxy.$message.toast('授权登陆失败','error')
					uni.hideLoading()
					},
			})
		}
		
		//应用内授权微信QQ登录
		const authorization = async (authResult) => {
			console.log(authResult)
			let res = await authorizationLogin(authResult)
			uni.hideLoading()
	
			// 如果没有手机号码跳转到绑定手机
			if(!res.mobile){
				proxy.$message.toast('授权成功,请绑定手机号')
				proxy.navTo('/pages/auth/bind-mobile?title=手机绑定&data='+JSON.stringify(res))
			}
		}
		
		//同意协议
		const checkAgreement = () => {
			agreement.value = !agreement.value
		}
		
		return{
			mobile,
			code,
			loading,
			agreement,
			
			mobileLogin,
			providerLogin,
			checkAgreement
		}
	}
}
</script>

<style lang="scss">
.app{
		padding-top: 200rpx;
	}
	/* 关闭按钮 */
	.back-btn{
		position:absolute;
		left: 20rpx;
		top: calc(var(--status-bar-height) + 20rpx);
		z-index: 90;
		padding: 20rpx;
		font-size: 39rpx;
		color: #606266;
	}
	
	.left-top-sign{
		font-size: 120rpx;
		color: #f8f8f8;
	}
	
	.welcome{
		position: relative;
		top: -90rpx;
		padding-left: 60rpx;
		font-size: 46rpx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}

	.input-content{
		padding: 0 60rpx;
	}
	
	.input-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding-left: 30rpx;
		background: #f8f6fc;
		height: 120rpx;
		border-radius: 4px;
		margin-bottom: 50rpx;
		
		&:last-child{
			margin-bottom: 0;
		}
		.row{
			width: 100%;
		}
		.tit{
			height: 50rpx;
			line-height: 56rpx;
			font-size: 26rpx;
			color: #606266; 
		}
		input{
			flex: 1;
			height: 60rpx;
			font-size: 30rpx;
			color: #303133;
			width: 100%;
		}	
	}
	
	button[type=primary] {
		background-color: $mxg-color-primary !important;
	}
	
	.button-hover[type=primary] {
		background-color: #6E8B3D !important;
	}
	
	/* 其他登录方式 */
	.other-wrapper{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20rpx;
		margin-top: 80rpx;
		
		.weixin {
			border: 0;
		}
		.line{
			margin-bottom: 40rpx;
			.tit{
				margin: 0 32rpx;
				font-size: 24rpx;
				color: #606266;
			}
			&:before, &:after{
				content: '';
				width: 160rpx;
				height: 0;
				border-top: 1px solid #e0e0e0;
			}
		}
		.icon{
			width: 80rpx;
			height: 80rpx;
			margin: 0 50rpx;
		}
	}
	
	.agreement{
		position: absolute;
		left: 0;
		bottom: 10rpx;
		width: 750rpx;
		height: 90rpx;
		font-size: 24rpx;
		color: #999;
		.iconfont{
			font-size: 36rpx;
			color: #ccc;
			margin-right: 8rpx;
			&.active{
				color: $mxg-color-primary;
			}
		}
		.tit{
			color: #40a2ff;
		}
	}
</style>
