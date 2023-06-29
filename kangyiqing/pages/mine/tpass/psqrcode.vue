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
				src: '', // 二维码生成后的图片地址或base64
				aforeground: '#000000', // 前景色
				pdground: '#309286', // 角标色
				background:'#ffffff',
				val:''
			}
		},
		components: {tkiQrcode},
		onLoad(e) {
			// this.$refs.qrcode._makeCode()
			this.options = JSON.parse(decodeURIComponent(e.detailDate));
            this.val = this.options.phone;
            if(this.options.vaccine == 2){
                this.aforeground = '#fff000';
            }else if(this.options.vaccine == 1){
                this.aforeground = '#00ff00';
            }else{
                this.aforeground = '#000000'
            };
			// this.val = "http://192.168.101.5:8082/jat/api/queryuser?phone="+uphone;
		},
		methods: {
			qrR(res) {
				this.src = res
				
			},
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
            getQrPass(){
                
            }
            
		}
	}
</script>

<style>

</style>
