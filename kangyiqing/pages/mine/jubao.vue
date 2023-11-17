<template>
  <view class="content">
	  <canvas id = "myCanvas">
		  <view id="tips">
			  拍照以录入面部信息
		  </view>
		  <image :src="photoPath" v-if="photoPath" class="photo" />
	  </canvas>
    <button @click="takePhoto">拍照</button>
	<view id = "space"></view>
    <button @click="uploadPhoto" v-if="photoPath">上传照片</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      photoPath: '',
      filename: '' ,// 新增一个数据属性来存储文件名
    }
  },
  onLoad() {
  	this.getUserinfo();
},
  onShow() {
      this.getUserinfo();
  },
  methods: {
    takePhoto() {
      const self = this;
      uni.chooseImage({
        count: 1, // 默认9
        sourceType: ['camera'], // 可以指定来源是相册还是相机
        success: function (res) {
          self.photoPath = res.tempFilePaths[0];
        }
      });
    },
    uploadPhoto() {
      const self = this;
      uni.uploadFile({
        url: 'http://192.168.31.104:5000/upload', // 你的树莓派服务器地址
        filePath: self.photoPath,
        name: 'file',
        formData: {
          'user': 'test',
          'filename': `${self.filename}.jpg` // 使用输入的文件名
        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes);
          uni.showToast({
            title: '上传成功',
            duration: 2000
          });
        },
		
      });
    },
	getUserinfo() {
			  var that = this
			  var uphone = uni.getStorageSync("phone");
			  console.log(uphone)
			  this.filename = uphone
			  
	},
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.photo {
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
}
#myCanvas{
	width: 270px;
	height: 270px;
	margin-top: 20px;
	margin-bottom: 20px;
	border-color: lightgray;
	border-width: 4px;
	background-color: lightgray;
	align-content: center;
}
#space{
	height: 20px;
}
#tips{
	text-align: center;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 40%;
	font-size: 20px;
	font-weight: 400;
	color: rgb(76, 76, 76);
}
</style>