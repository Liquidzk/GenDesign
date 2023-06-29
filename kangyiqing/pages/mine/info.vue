<template>
        <view>
          <view class="cmd-cell-item">
          	<view class="cmd-cell-item-body">
          		<view class="cmd-cell-item-content">
          			<view class="cmd-cell-item-title">姓名</view>
          		</view>
          		<view class="cmd-cell-item-right">
          			<text>{{userinfo.name}}</text>
          		</view>
          	</view>
          </view>
          
          <view class="cmd-cell-item">
          	<view class="cmd-cell-item-body">
          		<view class="cmd-cell-item-content">
          			<view class="cmd-cell-item-title">电话</view>
          		</view>
          		<view class="cmd-cell-item-right">
          			<text>{{userinfo.phone}}</text>
          		</view>
          	</view>
          </view>
          <view class="cmd-cell-item">
          	<view class="cmd-cell-item-body">
          		<view class="cmd-cell-item-content">
          			<view class="cmd-cell-item-title">身份证</view>
          		</view>
          		<view class="cmd-cell-item-right">
          			<text>{{userinfo.idNum}}</text>
          		</view>
          	</view>
          </view>
          <button class="btn-logout"  @click="logout">退出登录</button>
        </view>
</template>

<script>
  import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
  import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
  import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
  import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"

  export default {
    components: {
      cmdNavBar,
      cmdPageBody,
      cmdTransition,
      cmdCelItem,
      cmdAvatar
    },

    data() {
      return {
		  userinfo:[],
	  };
    },

    onLoad() {
    	this.getUserinfo();
		
    },
    
    methods:{
		logout() {
		uni.removeStorage({
			key: 'userInfo',
			key: 'phone',
		})
		uni.reLaunch({
				url: 'login/login',
			});
		},
      /**
       * 点击触发
       * @param {Object} type 跳转页面名或者类型方式
       */
     getUserinfo() {
		  var that = this
		  var uphone = uni.getStorageSync("phone");
		  console.log(uphone)
		  uni.request({
		  	url: "http://localhost:8082/jat/api/queryuser?phone="+uphone,
			success: (res) => {
				this.userinfo = res.data.user;
				console.log(res.data.user);
				console.log(this.userinfo.name)
			}
		  });
	  },
    }
  }
</script>

<style>
  .btn-logout {
    margin-top: 100upx;
    width: 80%;
    border-radius: 50upx;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(to right, #365fff, #36bbff);
  }

  .btn-logout-hover {
    background: linear-gradient(to right, #365fdd, #36bbfa);
  }
  .cmd-cell-item {
  	position: relative;
  }
  
  .cmd-cell-item.no-border .cmd-cell-item-body::before {
  	display: none;
  }
  
  .cmd-cell-item-body {
  	position: relative;
  	display: flex;
  	align-items: center;
  	justify-content: space-between;
  	min-height: 100upx;
  	padding-top: 20upx;
  	padding-bottom: 20upx;
  	margin-left: 20upx;
  	margin-right: 20upx;
  	box-sizing: border-box;
  }
  
  .cmd-cell-item-body::before {
  	content: '';
  	position: absolute;
  	z-index: 2;
  	background-color: #E2E4EA;
  	transform-origin: 100% 50%;
  	transform: scaleY(0.5) translateY(100%);
  	bottom: 0;
  	left: 0;
  	right: auto;
  	top: auto;
  	width: 100%;
  	height: 2upx;
  	transform-origin: 50% 100%;
  }
  
  
  .cmd-cell-item-left {
  	flex-shrink: 0;
  	margin-right: 32upx;
  }
  
  .cmd-cell-item-title {
  	line-height: 1.2;
  }
  
  .cmd-cell-item-brief {
  	color: #858B9C;
  	font-size: 24upx;
  	line-height: 1.4;
  	margin-top: 8upx;
  }
  
  .cmd-cell-item-content {
  	flex: 1 1 0%;
  	color: #111A34;
  	font-size: 32upx;
  	line-height: 1.2;
  }
  
  .cmd-cell-item-right {
  	flex-shrink: 0;
  	margin-left: 12upx;
  	display: inline-flex;
  	align-items: center;
  	justify-content: flex-end;
  	color: #858B9C;
  	font-size: 32upx;
  }
  
  .cmd-cell-item-right .cmd-cell-addon-text {
  	font-size: 24upx;
  }
  
  .cmd-cell-item-right .cmd-cell-icon-arrow-right {
  	margin-left: 6upx;
  	margin-right: -6upx;
  	color: #C5CAD5;
  }
  
  .cmd-cell-item-children {
  	padding: 20upx 0;
  	margin-left: 20upx;
  	margin-right: 20upx;
  }
  
  .cmd-cell-item.is-disabled .cmd-cell-item-content,
  .cmd-cell-item.is-disabled .cmd-cell-item-title,
  .cmd-cell-item.is-disabled .cmd-cell-item-brief,
  .cmd-cell-item.is-disabled .cmd-cell-item-left,
  .cmd-cell-item.is-disabled .cmd-cell-item-right,
  .cmd-cell-item.is-disabled .cmd-cell-item-children {
  	color: #C5CAD5;
  }
  
  .cmd-cell-item-hover {
  	background: transparent;
  }
</style>
