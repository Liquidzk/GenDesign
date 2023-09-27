<template>
	<view>
		<view class="flex padding-top-xl justify-center flex-direction align-center">
			<view class="text-gray">可以将以下二维码保存至本地</view>
			<view class="padding-top-xl">
				<image src="../../../static/index/qrcode.png" style="width: 60vw; height: 60vw;"></image>
<!-- 				<tki-qrcode cid="qrcode2" ref="qrcode2" :val="val" :background="background" :foreground="aforeground" :pdground="pdground" :size="400" :onval="true" :loadMake="true" :usingComponents="true" @result="qrR" />
 -->			</view>
			<view class="padding-top-xl">
				<button class="cu-btn bg-brown" @tap="saveQr">保存本地</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			    return {
			      sign: null
			    };
		},
		created() {
		    // 组件创建时启动定时器
		    this.timer = setInterval(this.fetchData, 1000);
		},
		watch: {
		    sign(newValue) {
		      if (newValue.includes('1')) {
		        alert('认证成功，允许进入！');
		      }
		    }
		},
		
		methods: {
			
			saveQr(){
				uni.saveImageToPhotosAlbum({
					filePath:this.src,
					success: function () {
						uni.showModal({
							title:'Message',
							content:'保存成功',
							showCancel:false
						})
					}
				})
			},
			destroyed() {
			    // 组件销毁时清除定时器
			    clearInterval(this.timer);
			},
			fetchData() {
			      this.loading = true;
			      fetch('http://192.168.31.104/qrcode/result')
			        .then(response => response.text()).then(
					data => {
						this.sign = data;
					})
			        .catch(error => {
			          console.error(error);
			        });
			},
            getQrPass(){
                
            }
            
		}
	}
</script>

<style>

</style>
