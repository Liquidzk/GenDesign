<template>
	<view>
		<view class="cu-bar search bg-white" id="search">
			<view class="padding-left-sm">
				<picker :range="searchType" @change="change">
					<view style="display: flex;align-items: center;">电话
						
					</view>
				</picker>
			</view>
			<view class="search-form round" v-if="index < 2">
				<input @focus="InputFocus" @blur="InputBlur" v-model="search_text" :adjust-position="false" type="text" placeholder="请输入搜索内容" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="searchSubmit">搜索</button>
			</view>
		</view>
		<scroll-view id="scroll" scroll-y = "true" :style="{height:scrollHeight}">
			<view class="cu-list menu card-menu margin-top-sm">
				<view v-for="(item,key) in list" :key="key" class="cu-item" >
					<view class="content padding-tb-sm">
						<view><text class="cuIcon-peoplefill text-blue margin-right-xs"></text> {{item.name}}</view>
						<view class="text-gray ">
							<text class="cuIcon-phone margin-right-xs"></text> {{item.phone}}
						</view>
						<view class="text-gray ">
							<text class="cuIcon-timefill margin-right-xs"></text> {{item.createTime}}
						</view>
						<view class="text-gray ">
							<text class="cuIcon-location margin-right-xs"></text> {{item.areaName}}
						</view>
					</view>
					<view class="action">
						<view class="cu-tag round bg-green light">{{item.healthy}}</view>
					</view>
				</view>
			</view>
		</scroll-view>

		
	</view>
</template>

<script>
	import {post,get,showModal} from '../../../utils/index.js';
	export default {
		data() {
			return {
				InputBottom:0,
				index:0,
				showPicker:false,
				scrollHeight:'',
				list:[],
				search_text:'',
				areaName: ''
			}
		},
		components: {
		},
		onReady() {
			let _this = this;

		},
		onLoad(){
			
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			onCancel:function(){
				this.showPicker = false
			},
			searchSubmit(){
				var text = this.search_text;
				var data = {
				    column: "name,phone,createTime,healthy,areaId" //需要的字段名
				}; 
				uni.request({
				    url: "http://192.168.31.188:8082/jat/api/getaccessbyphone?phone="+text,
				    data: data,
				    success: (data) => {
				        if (data.statusCode == 200) {
				            this.list =  this.setTime(data.data.accesslist);
							console.log(this.list);
				        }
				    },
				    fail: (data, code) => {
				        console.log('fail' + JSON.stringify(data));
				    }
				})
			},
			setTime: function(items) {
				var that = this
			    var newItems = [];
			    items.forEach((e) => {
					uni.request({
						url: "http://192.168.31.188:8082/jat/api/getareabyid?areaId="+e.areaId,
						success: (res) => {
						var areaName = res.data.area.areaName;
						newItems.push({
			            name: e.name,
			            phone: e.phone,
						createTime: e.createTime,
						healthy: e.healthy,
						areaId: e.areaId,
						areaName: areaName
			        });
					}
					});   
			    });
			    return newItems;
			},
			
			
		}
	}
</script>

<style>

</style>
