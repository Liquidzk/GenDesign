<template>
	<view class="content">
		<form @submit="sub">
			<view class="list">
				<view class="list-title">举报信息</view>
				<view class="list-item">
					<text>举报内容： </text></br>				
				</view>
				<view class="list-item">
					<textarea  v-model="content" value="" placeholder="请输入内容" />
				</view>
				<view class="list-item">
								<text>记录时间：</text>
								<picker mode="date" @change="bodyStatusDateChange">
									<button size="mini">{{bodyStatusDate||'请选择日期'}}</button>
								</picker>
								<picker mode="time" @change="bodyStatusTimeChange">
									<button size="mini">{{bodyStatusTime||'请选择时间'}}</button>
								</picker>
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
			content: '',
			repTime: '',
			bodyStatusDate: '',
			bodyStatusTime: '',
			report: []
		}
		},
		watch: {
			bodyStatusDate() {
				this.getBodyStatusTimeStamp()
			},
			bodyStatusTime() {
				this.getBodyStatusTimeStamp()
			},
		},
	onLoad() {
		
		},
	methods: {
		bodyStatusDateChange: function(e) {
			console.log(e.detail.value);
			this.bodyStatusDate = e.detail.value;
		},
		bodyStatusTimeChange: function(e) {
			console.log(e.detail.value);
			this.bodyStatusTime = e.detail.value;
		},
		getBodyStatusTimeStamp() {
			if (this.bodyStatusDate && this.bodyStatusTime) {
				this.repTime = this.bodyStatusDate + ' ' + this.bodyStatusTime;
			} else {
				this.repTime = 0
		}
		},
		test(){
		console.log(this.content)
		console.log(this.repTime)
							},
		sub: function(e) {
			var that = this;
			uni.request({
				url:'http://localhost:8082/jat/api/addreport',
				data: {
					content: that.content,
					repTime: that.repTime
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
			height: 300rpx;
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
