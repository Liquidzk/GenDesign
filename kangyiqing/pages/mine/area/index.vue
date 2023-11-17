<template>
	<view class="main">
		<cover-image src = "../../../static/bg.png"></cover-image> 
		<view class="main">
			<!--左侧小区名称 右侧新增登记-->
			<view id="head1" class="flex justify-around margin-top-sm ">
				<view url="shequ_list/shequ_list" class="flex align-center">
					<text class="text-white text-xl">{{area.areaName}}</text>
				</view>
				<view></view><view></view><view></view><view></view>
			</view>
			<!--社区出行概况-->
			<view id="chuxing" class="flex  justify-center align-center margin-top-sm">
				<view class="head_box">
					<view class="flex justify-around text-df padding-top">
						<text>社区今日出入情况</text>
						<text>{{count}}</text>
						<text>（单位：人次）</text>
					</view>
				</view>
			</view>
			<!--两个功能按钮-->
			<view id="btn" class="flex justify-around margin-top-sm">
				<navigator class="btn-box bg-gradual-blue flex align-center justify-center" url="search">
					<text class="text-xxl text-shadow">出入登记</text>
					<text class="cuIcon-write padding-left-xs" style="font-size: 90upx;opacity: 0.2"></text>
				</navigator>
				<view class="btn-box bg-gradual-green flex align-center justify-center" @click="hecha">
					<text class="text-xxl text-shadow">通行核查</text>
					<text class="cuIcon-punch padding-left-xs" style="font-size: 90upx;opacity: 0.2"></text>
				</view>
			</view>
			<!--概况记录-->
			<view id="segmented" class="margin-top-sm">
				<text style="font-size:large;text-align: center;" >出入记录</text>
			</view>
			<!-- class="scroll" -->
			<scroll-view id="scroll" scroll-y = "true" :style="{height:scrollHeight}">
				<view class="cu-list menu card-menu margin-top-sm" >
					<view class="cu-item" v-for="(item,key) in logList" :key = "key">
						<view class="content padding-tb-sm">
							<view><text class="cuIcon-peoplefill text-blue margin-right-xs"></text>{{item.name}}</view>
							<view class="text-gray ">
								<text class="cuIcon-phone margin-right-xs"></text> {{item.phone}}
							</view>
							<view class="text-gray ">
								<text class="cuIcon-timefill margin-right-xs"></text> {{item.createTime}}
							</view>
						</view>
						<view class="action">
							<view class="cu-tag round bg-green light">{{item.healthy}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
		
		
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
	import {post,get,showModal} from '../../../utils/index.js';
	import { Base64 } from 'js-base64';
	var that;
	export default {
		components: {uniSegmentedControl},
		data() {
			return {
				current: 0,
				activeColor: '#66ccff',
				scrollHeight:'',
				count: '',
				area:{},
				logList: []
			}
		},
		onReady() {
			let _this = this;		
			
		},
		onLoad() {
			that = this;
			var userinfo = uni.getStorageSync("userInfo");
			var areaId = userinfo.areaId;
			if(areaId == null){
				uni.showToast({
					title:'您没有权限',
					icon:'none'
				});
				uni.reLaunch({
					url:'../../home/index'
				});
			}
			this.getArea();
			this.getAccessCount();
			this.getlogList();
		},
        onShow() {
            this.getAccessCount();
            this.getlogList();
        },
		methods: {
			getArea() {
				var userinfo = uni.getStorageSync("userInfo");
				var areaId = userinfo.areaId;
				console.log(areaId);
				uni.request({
					url: "http://192.168.31.188:8082/jat/api/getareabyid?areaId="+areaId,
							success: (res) => {
								this.area = res.data.area;
								console.log(this.area)
							}
				});
			},
			
			
			hecha(){		
				uni.scanCode({
					success: function(res) { 
						let phone = res.result;
						console.log(res.scanType);
						console.log(res.result);
						console.log(phone);
						uni.navigateTo({
							url:'access?phone='+phone
						})
					}
						
			
									});
				
			},
			
			getAccessCount() {
				var userinfo = uni.getStorageSync("userInfo");
				var areaId = userinfo.areaId;
				uni.request({
					url: "http://192.168.31.188:8082/jat/api/getaccesscount?areaId="+areaId,
							success: (res) => {
								this.count = res.data.success;
								console.log(this.count)
							}
				});
			},
			
			getlogList() {
				var userinfo = uni.getStorageSync("userInfo");
				var areaId = userinfo.areaId;
			    var data = {
			        column: "name,phone,createTime,healthy" //需要的字段名
			    }; 
			    uni.request({
			        url: 'http://192.168.31.188:8082/jat/api/getaccess?areaId='+areaId,
			        data: data,
			        success: (data) => {
			            if (data.statusCode == 200) {
			                let list = this.setTime(data.data.accesslist);
			                this.logList =  list;
							
			            }
			        },
			        fail: (data, code) => {
			            console.log('fail' + JSON.stringify(data));
			        }
			    })
			},
			setTime: function(items) {
			    var newItems = [];
			    items.forEach((e) => {
			        newItems.push({
			            name: e.name,
			            phone: e.phone,
						createTime: e.createTime,
						healthy: e.healthy
			        });
			    });
			    return newItems;
			},
			
		}
	}
</script>

<style>
	cover-image {
		position: absolute;
		left: 0;
		top: 0;
		height: 300rpx;
		width: 100%;
	}
	.main{
		position: absolute;
		top: 0;width: 100%;
	}
	.head_box{
		margin-left: 20upx;
		width: 700upx;
		height: 100upx;
		background-color: #ffffff;
		border-radius: 15upx;
	}
	.btn-box{
		width: 310upx;
		height: 150upx;
		border-radius: 20upx;
	}
	.scroll{
		height: 700rpx;
	}
</style>
