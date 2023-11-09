<template>
  <view class="content">
    <button class="snap-button" @click="snapPhoto">Snap a Photo</button>
    <image v-if="imageBase64" :src="imageBase64" class="photo-preview" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageBase64: ''
    }
  },
  methods: {
    snapPhoto() {
      const self = this;
      uni.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          uni.getFileSystemManager().readFile({
            filePath: tempFilePaths[0],
            encoding: 'base64',
            success: res => {
              self.imageBase64 = 'data:image/jpeg;base64,' + res.data;
              self.uploadPhoto();
            }
          });
        }
      });
    },
    uploadPhoto() {
      var uphone = uni.getStorageSync("phone");
      this.$http.post('http://localhost:8080/api/face', { image: this.imageBase64 , phone: uphone})
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<style>
.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.snap-button {
  margin-bottom: 20px;
}
.photo-preview {
  width: 200px;
  height: 200px;
}
</style>