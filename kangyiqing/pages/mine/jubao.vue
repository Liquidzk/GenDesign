<template>
  <div>
    <video id="video" width="640" height="480" autoplay></video>
    <button id="snap">Snap Photo</button>
    <canvas id="canvas" width="640" height="480"></canvas>
  </div>
</template>

<script>
export default {
	data() {
	    return {
	      phoneNumber: '1234567890' // 在这里设置已登录用户的手机号码
	    };
	  },
  mounted() {
    // 设置视频源为用户的摄像头
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        let video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
      }).catch(function(err) {
        console.log("An error occurred: " + err);
      });

    // 当点击Snap按钮时，将视频帧画到canvas上
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let video = document.getElementById('video');
    document.getElementById("snap").addEventListener("click", function() {
      context.drawImage(video, 0, 0, 640, 480);
      let image = canvas.toDataURL('image/jpeg');
	  var uphone = uni.getStorageSync("phone");
      // 将图片数据发送到后端
      this.$http.post('http://localhost:8080/api/face', { image: image , phone: uphone})
        .then(response => {
          console.log(response);
          // handle success
        }).catch(error => {
          console.error(error);
          // handle error
        });
    });
  },
  onLoad() {
  	this.getUserinfo();
  },
  onShow() {
      this.getUserinfo();
  },
  methods: {
	  getUserinfo() {
	  		  var that = this
	  		  var uphone = uni.getStorageSync("phone");
	  		  console.log(uphone)
	  		  
	  },
  }
}
</script>