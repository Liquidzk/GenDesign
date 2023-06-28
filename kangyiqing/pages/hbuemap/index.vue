<template>
  <div>
    <image src="../../static/index/map.jpg" style="height: 115vh;"></image>
	<image src="../../static/index/position.png" style="height: 8vh; width: 20vw; bottom: 34vh; left: 15vw;"></image>
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