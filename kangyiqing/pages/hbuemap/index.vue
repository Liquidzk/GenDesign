<template>
  <div>
    <image src="../../static/index/map.png" style="height: 70vh; width: 96vh;">
		<image src="../../static/index/室内体育馆.png" click=""></image>
		<image src="../../static/index/五人足球场.png" click=""></image>
		<image src="../../static/index/篮球场.png" click=""></image>
		<image src="../../static/index/主足球场.png" click=""></image>
		<image src="../../static/index/板式网球场.png" click=""></image>
		<image src="../../static/index/网球场.png" click=""></image>
		<image src="../../static/index/游泳馆.png" click=""></image>
	</image>
	<!-- <image src="../../static/index/position.png" style="height: 8vh; width: 20vw; bottom: 34vh; left: 15vw;"></image> -->
	
  </div>
</template>

<script>
	import axios from 'axios';
export default {
  data() {
    return {
      settingEnabled: false
    }
  },
  methods: {
    toggleSetting() {
      this.settingEnabled = !this.settingEnabled;

      const url = this.settingEnabled ? 'http://192.168.31.104/led/on' : 'http://192.168.31.104/led/off';
      this.sendToServer(url);
		},
		sendToServer(url) {
			  
			  axios.get(url)
				.then(response => {
				  console.log('ready');
				 // 处理响应
				})
				.catch(error => {
				  console.log('error');
				  // 处理错误
				});
			}
	  }
}
</script>