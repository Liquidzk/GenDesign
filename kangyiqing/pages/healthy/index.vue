<template>
	<view class="content">
			<view class="list">
				<view class="list-title">人员信息</view>
				<view class="list-item">
					<text>姓名<text class="color-red"></text>：</text><input v-model="name" value="" placeholder="请输入人员姓名" /></view>
				<view class="list-item">
					<text>证件号码：</text>
					<input :style="{backgroundColor: isCn ? '#EE6A50' : ''}" v-model="idNum" placeholder="请输入证件号码" type="text" />
				</view>
				<view class="list-item">
					<text>门牌号： </text>
					<input v-model="accountNum" value="" placeholder="请输入学工号" />
				</view>
			
				<view class="list-item">
					<text>来源地区： </text>
					<input v-model="address" value="" placeholder="请输入来源地区" />
				</view>
			</view>	
			<view class="list">
				<view class="list-title">健康状况</view>
				<view class="list-item">
					<text>身体状况：</text>
					<radio-group @change="bodyStatusChange">
						<label>
							<radio value="0" /><text>普通</text>
						</label>
						<label>
							<radio value="1" /><text>居家隔离</text>
						</label>
						<label>
							<radio value="2" /><text>发烧</text>
						</label>
						<label>
							<radio value="3" /><text>疑似</text>
						</label>
						<label>
							<radio value="4" /><text>确诊</text>
						</label>
					</radio-group>
				</view>
				<view class="divider"></view>
				<view class="list-item">
					<text>是否接触过疑似人员：</text>
					<radio-group @change="contactLikeChange">
						<label>
							<radio value="1" /><text>是</text>
							<radio value="0" /><text>否</text>
						</label>
					</radio-group>
				</view>
                <view class="list-item">
                	<text>是否接种过疫苗：</text>
                	<radio-group @change="qrvaccineChange">
                		<label>
                			<radio value="0" /><text>未接种</text>
                			<radio value="1" /><text>一次</text>
                            <radio value="2" /><text>两次</text>
                		</label>
                	</radio-group>
                </view>
				<view class="divider"></view>
				<view class="list-item">
					<text>体温：</text>
					<slider value="36.5" @change="temperatureChange" min="35" step="0.1" max="40" show-value />
				</view>
				<button @click="submit">提交信息</button>
			</view>
			
		</view>
</template>

<script>
	import {
			checkIDCard
		} from '@/utils/util.js';
export default {
	data() {
		return {
			data: [],
			name: '',
			idNum: '',
			accountNum: '',
			address: '',
			status: '',
			contact: '',
			temperature: 36.5,
            qrvaccine: ''
            
			}
	},
	onLoad() {
		
	},
	methods: {
		bodyStatusChange(e) {
			this.status = e.detail.value
		},
		contactLikeChange(e) {
			this.contact= e.detail.value
		},
        qrvaccineChange(e) {
        	this.qrvaccine= e.detail.value
        },
		temperatureChange(e) {
			this.temperature = e.detail.value
		},
		test(){
			console.log(this.contact)
			console.log(this.temperature)
			console.log(this.status)
			console.log(this.name)
			console.log(this.address)
			console.log(this.idNum)
			console.log(this.accountNum)
            console.log(this.qrvaccine)
		},
		submit() {
			let that = this;
			if (!that.name) {
				uni.showModal({
					content: '请填写人员姓名',
					showCancel: false
				})
				return false
			}
			if (that.idNum == 0 && that.idNum && !checkIDCard(that.idNum)) {
				uni.showModal({
				    content: '请检查身份证号',
				    showCancel: false
				})
				return false
			}
			var userinfo = uni.getStorageSync("userInfo");
			var uid = userinfo.id;
            console.log(uid);
			uni.request({
				url: 'http://192.168.31.188:8082/jat/api/modifyuser',
				data:{
					id: uid,
					name: that.name,
					idNum: that.idNum,
					accountNum: that.accountNum,
					address: that.address,
					status: that.status,
					contact: that.contact,
					temperature: that.temperature,
                    qrvaccine: that.qrvaccine
				},
				method: 'POST',
				header: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				success:res=>{
					if(res.data.success == true){
						console.log("提交成功");
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
			width: 300rpx;
			height: 60rpx;
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
