<template>
	<view class="content">
		<form @submit="sub">
			<view class="list">
				<view class="list-title">健康信息</view>
				<view class="list-item">
					<text>姓名<text class="color-red"></text>：</text>
					<input v-model="name" value="" placeholder="请输入人员姓名" /></view>
				<view class="list-item">
					<text>电话号： </text>
					<input v-model="phone" value="" placeholder="请输入电话号" />
				</view>
							
				<view class="list-item">
					<text>进出：</text>
					<radio-group @change="healthyChange">
						<label>
							<radio value="1" /><text>进</text>
							<radio value="0" /><text>出</text>
						</label>
					</radio-group>
				</view>
			</view>	
			<view class="list">
				<button form-type="submit">提交信息</button>
			</view>
			</form>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				phone: '',
				healthy: '',
				areaId: '',
				access: [],
				userinfo: [],
			}
			},
		onLoad(e) {
			console.log(e.phone)
			   var aphone = e.phone;
			   console.log(aphone);
			   // this.getUserinfo(aphone);
			   uni.request({
			   	url: "http://192.168.31.188:8082/jat/api/queryuser?phone="+aphone,
			   						success: (res) => {
			   							var userinfo = res.data.user;
			   							var uname = userinfo.name;
										this.name = uname;
										this.phone = aphone;
			   							console.log(uname);
			   							console.log(userinfo);
			   						}
			   });
			},
		methods: {
			healthyChange(e) {
				this.healthy= e.detail.value
			},
			test(){
			console.log(this.name)
			console.log(this.aphone)
			console.log(this.healthy)
			},
								
			sub: function(e) {
				var that = this;
				var userinfo = uni.getStorageSync("userInfo");
				var areaId = userinfo.areaId;
				console.log(areaId);
				uni.request({
					url:'http://192.168.31.188:8082/jat/api/addaccess',
					data: {
						areaId: areaId,
						name: that.name,
						phone: that.phone,
						healthy: that.healthy
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					success:res=>{
						if(res.data.success == true){
							console.log("提交成功")
							uni.showToast({
								title:'提交成功',
								icon:'none'
							});
							uni.navigateBack({
								delta:1
							});
						}else{
							console.log(res.data);
							uni.showToast({
								title:'提交失败',
								icon:'none'
							});
						}
					}
				})
			}											
			}
		}
	
</script>

<style>
	
	page {
			background: #f0f0f0;
		}
	
		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-bottom: 50rpx;
		}
	
		.list {
			display: flex;
			flex-direction: column;
			width: 680rpx;
			margin: auto;
			margin-top: 20rpx;
			background: #ffffff;
			border-radius: 20rpx;
			padding-bottom: 20rpx;
		}
	
		.list-title {
			width: 580rpx;
			padding: 20rpx;
			display: flex;
			font-size: 40rpx;
			font-weight: bold;
			border-bottom: #f0f0f0 1rpx solid;
			margin: auto;
			margin-bottom: 20rpx;
	
		}
	
		.list-item {
			width: 580rpx;
			padding: 20rpx;
			display: flex;
			margin: auto;
			font-size: 30rpx;
			align-items: center;
		}
	
		.list-item>text {
			white-space: nowrap;
		}
	
		.list-item input {
			background: #f0f0f0;
			border-radius: 10rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			width: 600rpx;
			height: 100rpx;
			color: #999999;
			font-size: 30rpx;
		}
	
		.list-item slider {
			width: 300rpx;
		}
	
		.list-item picker {
			margin-right: 10px;
		}
	
		.list-item picker button {
			vertical-align: middle;
		}
	
		.list-item label {
			display: inline-block;
			margin: 5px 0px;
		}
	
		.list-item label text {
			margin-right: 10px;
		}
	
		.list-item textarea {
			border-radius: 5px;
			background-color: #F8F8F8;
			padding: 10px;
		}
	
		.xiala {
			display: flex;
			background: #f0f0f0;
			padding: 10rpx;
			border-radius: 10rpx;
			color: #999999;
			font-size: 30rpx;
	
		}
	
		.xiala image {
			display: flex;
			padding-top: 5rpx;
			width: 30rpx;
			height: 30rpx;
			margin-left: 10rpx;
	
		}
	
		.divider {
			content: '';
			width: 580rpx;
			margin: 5px auto;
			height: 1px;
			background-color: #DDDDDD;
		}
	
		.color-red {
			color: #FF3333;
		}
</style>
