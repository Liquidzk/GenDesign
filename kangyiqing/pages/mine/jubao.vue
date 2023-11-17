<template>
  <view class="content">
    <image :src="photoPath" v-if="photoPath" class="photo" />
    <input v-model="filename" placeholder="输入文件名" v-if="photoPath" />
    <button @click="takePhoto">拍照</button>
    <button @click="uploadPhoto" v-if="photoPath">上传照片</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      photoPath: '',
      filename: '' // 新增一个数据属性来存储文件名
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
      if (!self.filename) {
        uni.showToast({
          title: '请先输入文件名',
          icon: 'none'
        });
        return;
      }
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