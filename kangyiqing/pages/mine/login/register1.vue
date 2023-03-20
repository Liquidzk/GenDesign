<template>
	<view class="register">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../../static/jat.png"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput
					v-model="phone"
					type="text"
					maxlength="11"
					placeholder="手机号"
				></wInput>
				<wInput
					v-model="passwd"
					type="password"
					maxlength="11"
					placeholder="登录密码"
					isShowPass
				></wInput>
					
			</view>
				
			<wButton 
				text="注 册"
				:rotate="isRotate" 
				@click.native="startReg()"
				class="wbutton"
			></wButton>
			
			<!-- 底部信息 -->
			<view class="footer">
				<text 
					@tap="isShowAgree" 
					class="cuIcon"
					:class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
				>同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../../components/watch-login/watch-input.vue' //input
	import wButton from '../../../components/watch-login/watch-button.vue' //button
	
	export default {
		data() {
			return {
				phone: '', // 用户/电话
				passwd:'', //密码
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
			};
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
		},
		methods: {
			isShowAgree(){
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
		    startReg() {
				//注册
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请先同意《协议》'
				    });
				    return false;
				}
				if (this.phone.length !=11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
		        if (this.passwd.length < 6) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return false;
		        }
				// let User ={
				// 	phone: this.phone,
				// 	passwd: this.passwd
				// }
		  //   let user = JSON.stringify(User)
			var that = this;
			// console.log(User)
			uni.request({
				url:"http://localhost:8082/jat/api/adduser",
				method:'POST',
				dataType:'json',
				data:{
					phone: that.phone,
					passwd: that.passwd
				},
				header: {
					'Content-Type': 'application/json'
				},
				success:res=>{
					if(res.data.success == true){
						console.log("注册成功")
						uni.navigateTo({
							url:'login'
						});
					}else{
						console.log(res.data);
						uni.showToast({
							title:'用户名或密码错误',
							icon:'none'
						});
					}
				}
			});
				
				_this.isRotate=true

		    }
		}
	}
</script>

<style>
	@import url("../../../components/watch-login/css/icon.css");
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
		/* margin-top: 128upx; */
	}
	
	/* 头部 logo */
	.header {
		width:161upx;
		height:161upx;
		box-shadow:0upx 0upx 60upx 0upx rgba(0,0,0,0.1);
		border-radius:50%;
		background-color: #ffffff; 
		margin-top: 128upx;
		margin-bottom: 72upx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161upx;
		height:161upx;
		border-radius:50%;
	}
	
	/* 主体 */
	.main {
		display: flex;

		padding-left: 70upx;
		padding-right: 70upx;
	}
	.tips {
		color: #999999;
		font-size: 28upx;
		margin-top: 64upx;
		margin-left: 48upx;
	}
	
	/* 登录按钮 */
	.wbutton{
		margin-top: 96upx;
	}
	
	/* 其他登录方式 */
	.other_login{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 256upx;
		text-align: center;
	}
	.login_icon{
		border: none;
		font-size: 64upx;
		margin: 0 64upx 0 64upx;
		color: rgba(0,0,0,0.7)
	}
	.wechat_color{
		color: #83DC42;
	}
	.weibo_color{
		color: #F9221D;
	}
	.github_color{
		color: #24292E;
	}
	
	/* 底部 */
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		margin-top: 64upx;
		color: rgba(0,0,0,0.7);
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}
	.footer text{
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>