<template>
	<down-bar :params="params" :downCategoty="downCategoty" @changeCategory="changeCategory"></down-bar>
</template>

<script>
import {getCurrentInstance,ref,onBeforeMount,reactive,toRefs,onMounted} from "vue";
import downBar from "./down-bar.vue"
export default{
	components:{
		'down-bar':downBar
	},
	props:{
		params:{
			type:Object,
			default:()=>({})
		},
		content:{
			type:String,
			default:''
		}
	},
	setup(){
		let downCategoty = ref([
				{
					type:'sort',
					isAllCategory:false,
					name:'综合排序',
					active:false,		//是否被选择了,展示下拉框
					list:[
						{id:null,name:'综合排序'},
						{id:'new',name:'热门排序'},
						{id:'hot',name:'最新排序'}
					]
				},
				{
					type:'label',
					isAllCategory:true,
					name:'全部排序',
					active:false,
					list:[]
				}
			])
			//监听分类切换
			let changeCategory=(id)=>{
				console.log('点击了分类：',id)
			}
		return{
			downCategoty,
			changeCategory
		}
		
	}
}
</script>
<style>
</style>
