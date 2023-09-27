<template>
  <view>
    <view class="person-head">
      <cmd-avatar src="../../static/img/maomi.jpg" size="lg" :make="{'background-color': '#fff'}"></cmd-avatar>
      <view class="person-head-box">
        <view class="person-head-nickname">{{userinfo.name}}</view>
        <view class="person-head-username">{{userinfo.accountNum}}</view>
      </view>
    </view>
    <view class="person-list">
      <cmd-cell-item title="个人信息" slot-left arrow @click="goinfo('info')">
        <cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="匿名举报" slot-left arrow @click="goinfo('jubao')">
        <cmd-icon type="message" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="修改密码" slot-left arrow  @click="goinfo('changepwd')">
        <cmd-icon type="settings" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="出入管理"slot-left arrow @click="goinfo('area/index')">
        <cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="入馆二维码"slot-left arrow @click="goinfo('tpass/psqrcode')">
        <cmd-icon type="share" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
    </view>
  </view>
</template>

<script>
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
  import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
  import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
import {
		mapState,
		mapMutations
	}from 'vuex'
  export default {
    components: {
      cmdAvatar,
      cmdCellItem,
      cmdIcon
    },
	computed: mapState(['forcedLogin']),
    data() {
      return {
		  userinfo:[],
		  dphone: ''
	  };
    },
	
	onLoad() {
		// var that = this
		// uni.getStorage({
		// 	key: 'phone',
		// 	success:function(res){
		// 		console.log(res.data);
		// 		var uphone = res.data;
		// 		console.log(uphone);
		// 		that.dphone = uphone;
		// 	}
		// })
	 //    console.log(that.dphone)
		this.getUserinfo();
	},
    onShow() {
        this.getUserinfo();
    },
    methods: {
		...mapMutations(['adduser']),
      /**
       * 打开用户信息页
       */
	  
      goinfo(page) {
        uni.navigateTo({
          url: page
        })
      },
	  
	  getUserinfo() {
		  var that = this
		  var uphone = uni.getStorageSync("phone");
		  console.log(uphone)
		  uni.request({
		  	url: "http://localhost:8082/jat/api/queryuser?phone="+uphone,
			success: (res) => {
				this.userinfo = res.data.user;
				console.log(res.data.user);
				this.adduser(res.data.user);
			}
		  });
	  },
    }
  }
</script>

<style>
  .person-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    padding-left: 20px;
    background: linear-gradient(to right, #365fff, #36bbff);
  }

  .person-head-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
  }

  .person-head-nickname {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }

  .person-head-username {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

  .person-list {
    line-height: 0;
  }
</style>
