<template>
	<view class="mxg-code center" @click="sendSmsCode" :class="interval?'dis':''">
		<text class="code-btn" >
			{{interval ? intervalNum + 's' : '获取验证码'}}
		</text>
	</view>
</template>

<script>
import {getSms} from "@/request/my-api.js"
import {getCurrentInstance,ref,reactive} from "vue";
import {useStore} from 'vuex'
export default {
	props: {
		mobile: { // 手机号码
			type: String,
			default: ''
		},
		templateCode: { // 短信模板代码
			type: String,
			default: ''
		}
	},
	setup(props){
		const {proxy} = getCurrentInstance()
		let store = useStore()
		let interval = ref(null)//倒计数
		let intervalNum = ref(60)//倒计数数字
		
		// 发送验证码
		const sendSmsCode = async () => {
			//修改绑定手机时判断时候与之前手机号一致
			if(proxy.mobile == store.state.mobile){
				proxy.$message.toast('此手机号已被绑定')
				return;
			}
			
			//如果已经发送了短信就不能重复发送
			if (interval.value) return;
			
			if(proxy.$utils.checkStr(proxy.mobile,'mobile')){
				uni.showLoading({mask:true})
				await getSms({mobile:props.mobile,templateCode:props.templateCode})  //短信模板id
				console.log('验证码：'+'666666')
				uni.hideLoading()
				proxy.$message.toast('发送成功')
				
				//发送成功设置倒计时
				interval.value = setInterval(() => {
					intervalNum.value -= 1
					if(intervalNum.value < 0){
						clearInterval(interval.value)
						interval.value = null
						intervalNum.value = 60
					}
				},1000)
			}else{
				proxy.$message.toast('手机号码不正确','error')
				return;
			}
		}
		
		return{
			interval,
			intervalNum,
			
			sendSmsCode
		}
	}
}
</script>

<style lang="scss">
	.mxg-code {
		background-color: $mxg-color-primary;
		border-radius: 10rpx;
		width: 160rpx;
	}
	.dis{
		background-color: #b8bcc3!important;
	}
	
	.code-btn {
		font-size: 25rpx;
		padding: 10rpx 0;
		color: #FFFFFF;
	}
</style>
