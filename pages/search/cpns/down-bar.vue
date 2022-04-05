<template>
	<view class="down-bar row sticky-box" @touchmove.stop.prevent="()=>{}">
		<view class="one" v-for="item in infos" :key="item.type">
			<view class="center" @click="changeTab(item)" :class="{'active': item.name == tabName}">
				<text>{{item.name}}</text>
				<text class="iconfont icon-down1" v-if="item.active"></text>
				<text class="iconfont icon-up" v-if="!item.active"></text>
			</view>
			<view class="item-list" v-if="item.active">
				<category class="category" v-if="item.isAllCategory" :value="param" @searchCate="searchCate"></category>
				<view class="name" :class="{'active':i.name == tabName}" v-else v-for="i in item.list" :key="i.id" @click="changeCild(item,i)">
				{{i.name}}
				</view>
			</view>
			<!-- 蒙层 -->
			<view class="cover" v-if="item.active" @click="closeCategory"></view>
		</view>
	</view>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs,onMounted,watch,nextTick} from "vue";
import category from '@/pages/tab-category/category.vue'
export default {
	components: { category },
	props:{
		params:{
			type:Object,
			default:()=>({})
		},
		downCategoty:{
			type:Array,
			default:()=>[]
		}
	},
	setup(props,{emit}){
		let tabName=ref()	//选中的标签
		let infos = ref()
		let param = ref()
		// 初始化深拷贝props数据
		onMounted(()=>{
			infos.value=JSON.parse(JSON.stringify(props.downCategoty))
			tabName.value=infos.value[0].name
		})

		//选择大标签
		let changeTab = (item) =>{
			tabName.value = item.name
			let act = item.active
			infos.value.forEach(i=>{
				i.active=false
			})
			item.active=!act
		}
		// 选择子标签
		let changeCild = (item,itemChild) =>{
			item.active=false
			if(tabName.value == itemChild.name ) return;
			tabName.value = itemChild.name
			item.name = itemChild.name
			//发送事件
			emit('changeCategory',{[item.type]:itemChild.id})
		}
		// 点击遮罩层关闭分类选择
		let closeCategory=()=>{
			infos.value.forEach(i=>{
				i.active=false
			})
		}
		//全部分类点击标签
		let searchCate=(item)=>{
			infos.value.forEach(i=>{
				i.active=false
			})
			if(item.id==0){
				infos.value[infos.value.length-1].name=item.cName
				tabName.value=item.cName
				emit('changeCategory',{labelId:null,categoryId:item.categoryId})
			}else{
				infos.value[infos.value.length-1].name=item.name
				tabName.value=item.name
				emit('changeCategory',{labelId:item.id,categoryId:item.categoryId})
			}
			param.value={labelId:item.id,name:item.name,categoryId:item.categoryId}
		}
		return{
			infos,
			tabName,
			param,
			
			changeTab,
			changeCild,
			closeCategory,
			searchCate
		}
	},
	// 监听点击标签进入搜索页面，全部分类名称改变
	watch:{
		params:{
			handler:function(newValue){
				if(Object.keys(newValue).length>0){
					nextTick(()=>{
						let keys=Object.keys(newValue)				//拿到传递的params参数都多的键
						if(keys.length == 1){						//如果键只有一个
							this.infos.forEach(item=>{
								if(item.type == keys[0]){			//找到传递过来标签参数中type为这个键的
									item.name = item.list.find(i=>{	//将这个对象被选择的标签名，
										return i.id == newValue[keys[0]]//换成list中id与传递过来对象的值相等的这个对象的name
									}).name
									this.tabName=item.name			//选择的标签也改变
								}
							})
						}else{
							this.infos[this.infos.length-1].name=newValue.name
							this.tabName=newValue.name
							this.param=newValue
						}
					})
				}
			},
			immediate:true,
			deep:true
		}
	}
}
</script>

<style lang="scss">
	
	.down-bar {
		z-index: 100;
		background-color: #FFFFFF;
		font-size: 30rpx;
		line-height: 80rpx;
	}
	
	.item-list {
		z-index: 100;
		background-color: #FFFFFF;
		position: absolute;
		left: 0;
		right: 0;
		.name {
			padding-left: 40rpx;
		}
		.category {
			height: 580rpx!important;
		}
	}
	// 被点击之后的效果 
	.active {
		color: $mxg-color-primary;
	}
	
	// 粘顶
	.sticky-box {
		position: -webkit-sticky;
		position: sticky; /* 其他浏览器 */
		top: var(--window-top);
	}
	/*蒙层*/
	.cover {
		z-index: 99;
		position: fixed;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.2 !important;
	}
</style>
