<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../../static/shilu-login/logo.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="电话"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="密码"
				></wInput>
			</view>
			<wButton 
				text="登 录"
				:rotate="isRotate" 
				@click.native="startLogin()"
				class="wbutton"
			></wButton>
			
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
     import wInput from '../../../components/watch-login/watch-input.vue' //input
	 import wButton from '../../../components/watch-login/watch-button.vue' //button */
	import {
		mapState,
		mapMutations
	}from 'vuex'
	export default {
		data() {
			return {
				phoneData:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
			};
		},
		computed: mapState(['forcedLogin']),
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
		},
		methods: {
			...mapMutations(['login']),
			isLogin(){
			},
		    startLogin(){
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '电话号不能为空'
				    });
				    return;
				}
		        if (this.passData.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }
				var that = this;
			    uni.request({
					url:"http://localhost:8082/jat/api/login",
					method:'POST',
					data:{
						phone: that.phoneData,
						passwd: that.passData
					},
					dataType:'json',
					success:res=>{
						console.log(res)
						if(res.data.success == true){
							console.log("登录成功")
							_this.isRotate=true
							this.toHome(that.phoneData);
						}else{
							uni.showToast({
								title:'用户名或密码错误',
								icon:'none'
							});
						}
					}
				});
				
				
				// 
				
		    },
			toHome(provider) {
				this.login(provider);
				uni.reLaunch({
					url: '../../home/index',
				});
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
		flex-direction: column;
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
