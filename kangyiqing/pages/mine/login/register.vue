<template>
  <view class="content">
    <view class="header">
      <image src="../../../static/shilu-login/logo.png"></image>
    </view>
   

    <view class="list">
      <view class="list-call">
        <image class="img" src="/static/shilu-login/1.png"></image>
        <input class="sl-input" v-model="phoneNumber" type="number" maxlength="11" placeholder="手机号" />
      </view>
      <view class="list-call">
        <image class="img" src="/static/shilu-login/2.png"></image>
        <input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="登录密码" :password="!showPassword" />
        <image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
      </view>
      <view class="list-call">
        <image class="img" src="/static/shilu-login/3.png"></image>
        <input class="sl-input" v-model="code" type="text" maxlength="5" placeholder="验证码" />
        <view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
      </view>


    </view>

    <view class="button-login" hover-class="button-hover" @tap="bindLogin">
      <text>注册</text>
    </view>

    <view class="agreement">
      <image @tap="agreementSuccess" :src="agreement==true?'/static/shilu-login/ty1.png':'/static/shilu-login/ty0.png'"></image>
      <text @tap="agreementSuccess"> 同意</text>
      <navigator url="agreement?id=1" open-type="navigate">《软件用户协议》</navigator>
    </view>
  </view>
</template>

<script>
  var _this, js;
  export default {
    onLoad() {
      _this = this;

    },
    onUnload() {
      clearInterval(js)
      this.second = 0;
    },
    data() {
      return {
        phoneNumber: '',
        password: '',
        code: '',
        invitation: '',
        agreement: true,
        showPassword: false,
        second: 0
      };
    },
    computed: {
      yanzhengma() {
        if (this.second == 0) {
          return '获取验证码';
        } else {
          if (this.second < 10) {
            return '重新获取0' + this.second;
          } else {
            return '重新获取' + this.second;
          }
        }
      }
    },
    onUnload() {
      this.clear()
    },
    methods: {
      clear(){
        clearInterval(js)
        js = null
        this.second = 0
      },
      display() {
        this.showPassword = !this.showPassword
      },
      agreementSuccess() {
        this.agreement = !this.agreement;
      },
      getcode() {
        if (this.phoneNumber.length != 11) {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          });
          return;
        }
        if (this.second > 0) {
          return;
        }
        this.second = 60;
        //请求业务
        js = setInterval(function() {
          _this.second--;
          if (_this.second == 0) {
            _this.clear()
          }
        }, 1000)
        var that = this;
        console.log(that.phoneNumber);
        uni.request({
          url: "http://localhost:8082/jat/api/sendSms", 
          //url: 'http://192.168.31.225:8082/jat/api/sendSms',
          method:'POST',
          dataType:'json',
          data:{
          	phoneNumber: that.phoneNumber
          },
          header: {
          	'content-type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            if (res.data.code != 200) {
              uni.showToast({
                title: res.data.msg,
                icon: 'none'
              });
            } else {
              uni.showToast({
                title: res.data.msg
              });
              js = setInterval(function() {
                _this.second--;
                if (_this.second == 0) {
                  _this.clear()
                }
              }, 1000)
            }
          },
          fail() {
            this.second == 0
          }
        });
      },
      bindLogin() {
        if (this.agreement == false) {
          uni.showToast({
            icon: 'none',
            title: '请先阅读《软件用户协议》'
          });
          return;
        }
        if (this.phoneNumber.length != 11) {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          });
          return;
        }
        if (this.password.length < 6) {
          uni.showToast({
            icon: 'none',
            title: '密码不正确'
          });
          return;
        }
        if (this.code.length != 5) {
          uni.showToast({
            icon: 'none',
            title: '验证码不正确'
          });
          return;
        }
        uni.request({
          url: 'http://localhost:8082/jat/api/adduser',
          data: {
            phoneNumber: this.phoneNumber,
            password: this.password,
            code: this.code
          },
          method: 'POST',
          dataType: 'json',
          header: {
          	'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            if (res.data.success == true) {
              uni.navigateTo({
              	url:'login'
              });
            } else {
              uni.showToast({
                title: res.data.msg
              });
              setTimeout(function() {
                uni.navigateBack();
              }, 1500)
            }
          }
        });

      }
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .header {
    width: 161rpx;
    height: 161rpx;
    background: rgba(255, 255, 255, 1.0);
    box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47);
    margin-top: 30rpx;
    margin-left: auto;
    margin-right: auto;
  }

  .header image {
    width: 161rpx;
    height: 161rpx;
  }

  .list {
    display: flex;
    flex-direction: column;
    padding-top: 50rpx;
    padding-left: 70rpx;
    padding-right: 70rpx;
  }

  .list-call {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;
    color: #333333;
    border-bottom: 0.5px solid #e2e2e2;
  }

  .list-call .img {
    width: 40rpx;
    height: 40rpx;
  }

  .list-call .sl-input {
    flex: 1;
    text-align: left;
    font-size: 32rpx;
    margin-left: 16rpx;
  }

  .yzm {
    color: #FF7D13;
    font-size: 24rpx;
    line-height: 64rpx;
    padding-left: 10rpx;
    padding-right: 10rpx;
    width: auto;
    height: 64rpx;
    border: 1rpx solid #FFA800;
    border-radius: 50rpx;
  }

  .yzms {
    color: #999999 !important;
    border: 1rpx solid #999999;
  }

  .button-login {
    color: #FFFFFF;
    font-size: 34rpx;
    width: 470rpx;
    height: 100rpx;
    line-height: 100rpx;
    background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
    box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
    border-radius: 50rpx;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100rpx;
  }

  .button-hover {
    background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
  }

  .agreement {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    margin-top: 80rpx;
    color: #FFA800;
    text-align: center;
    height: 40rpx;
    line-height: 40rpx;
  }

  .agreement image {
    width: 40rpx;
    height: 40rpx;
  }
</style>
