<template>
  <view class="content">
    <image :src="photoPath" v-if="photoPath" class="photo" />
    <button @click="takePhoto">拍照</button>
    <button @click="uploadPhoto">上传照片</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      photoPath: ''
    }
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
        url: 'http://raspberry.pi.ip.address/upload', // 你的树莓派服务器地址
        filePath: self.photoPath,
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes);
          uni.showToast({
            title: '上传成功',
            duration: 2000
          });
        }
      });
    }
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
</style>