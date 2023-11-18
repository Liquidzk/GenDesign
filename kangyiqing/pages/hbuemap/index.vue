<template>
  <div class="image-stack" ref="imageStack" @touchstart="handleTouchStart" @touchmove="handleTouchMove">
    <img v-for="(image, index) in imageList" 
	:src="image.src" 
	:key="index" 
	:class="'image-' + index"
	:style="{ transform: 'scale(' + scale + ') translate(' + translateX + 'px, ' + translateY + 'px)' }"
	>
  </div>
</template>

<script>
export default {
  data() {
    return {
		scale: 1,
		lastTouchDistance: 0,
		minScale: 0.5, // 最小缩放比例
		maxScale: 2, // 最大缩放比例
		translateX: 0,
		translateY: 0,
		touchStartX: 0,
		touchStartY: 0,
		touchMoveX: 0,
		touchMoveY: 0,
      imageList: [
        { src: './static/index/map.png', id:'image1' },
		{ src:'./static/index/室内体育馆.png',id:'image2'},
		{ src:'./static/index/五人足球场.png',id:'image3'},
		{ src:'./static/index/篮球场.png',id:'image4'},
		{ src:'./static/index/主足球场.png',id:'image5'},
		{ src:'./static/index/板式网球场.png',id:'image6'},
		{ src:'./static/index/网球场.png',id:'image7'},
		{ src:'./static/index/游泳馆.png',id:'image8'}
      ]
    };
  },
  mounted() {
	  
  	
  },
  methods: {
	  handleTouchStart(event) {
		  
		  //滑动功能
		  const touch = event.touches[0];
		        this.touchStartX = touch.clientX;
		        this.touchStartY = touch.clientY;
				
				//缩放功能
	        if (event.touches.length === 2) {
	          const touch1 = event.touches[0];
	          const touch2 = event.touches[1];
	          this.lastTouchDistance = this.getTouchDistance(touch1, touch2);
	        }
	      },
	      handleTouchMove(event) {
			  //滑动功能
			const touch = event.touches[0];
			const deltaX = touch.clientX - this.touchStartX;
			const deltaY = touch.clientY - this.touchStartY;
			this.translateX += deltaX;
			this.translateY += deltaY;
			this.touchStartX = touch.clientX;
			this.touchStartY = touch.clientY;
			  
			  //缩放功能
	        if (event.touches.length === 2) {
	          const touch1 = event.touches[0];
	          const touch2 = event.touches[1];
	          const currentTouchDistance = this.getTouchDistance(touch1, touch2);
	          const delta = currentTouchDistance - this.lastTouchDistance;
	          const newScale = this.scale + delta * 0.01; // 根据需要调整缩放速度
	          this.scale = Math.min(Math.max(newScale, this.minScale), this.maxScale);
	          this.lastTouchDistance = currentTouchDistance;
	        }
	      },
	      handleTouchEnd() {
			this.touchStartX = 0;
			      this.touchStartY = 0;
			      this.touchMoveX = 0;
			      this.touchMoveY = 0;
	        this.lastTouchDistance = 0;
	      },
	      getTouchDistance(touch1, touch2) {
	        const dx = touch1.clientX - touch2.clientX;
	        const dy = touch1.clientY - touch2.clientY;
	        return Math.sqrt(dx * dx + dy * dy);
	      },
      handleImageClick(index, event) {
		handleAnyImageClick(index);
      },
	  
	  handleAnyImageClick(index){
		  const image = this.imageList[index];
		  
		  switch(image.id){
		  	case 'image1':
		  	this.handleImage1Click();
		  	break;
		  	case 'image2':
		  	this.handleImage2Click();
		  	break;
		  	case 'image3':
		  	this.handleImage3Click();
		  	break;
		  	case 'image4':
		  	this.handleImage4Click();
		  	break;
		  	case 'image5':
		  	this.handleImage5Click();
		  	break;
		  	case 'image6':
		  	this.handleImage6Click();
		  	break;
		  	case 'image7':
		  	this.handleImage7Click();
		  	break;
		  	case 'image8':
		  	this.handleImage8Click();
		  	break;
		  	default:
		  	break;
		  }
	  },
      handleImage1Click() {
		  
      },
      handleImage2Click() {
		uni.showToast({
    				title:'室内体育馆信息',
    				icon: 'success',
    				duration:1000
    			});  },
      handleImage3Click() {
		  uni.showToast({
		  			title:'五人足球场信息',
		  			icon: 'success',
		  			duration:1000
		  		});
      },
	  handleImage4Click() {
		  uni.showToast({
		  title:'篮球场信息',
		  	icon: 'success',
		  	duration:1000
		  });  
	  },
	  handleImage5Click() {
		  uni.showToast({
		  title:'主足球场信息',
		  	icon: 'success',
		  	duration:1000
		  });  },
	  handleImage6Click() {
		  uni.showToast({
		  title:'板式网球场信息',
		  	icon: 'success',
		  	duration:1000
		  });  },
	  handleImage7Click() {
		  uni.showToast({
		  title:'网球场信息',
		  	icon: 'success',
		  	duration:1000
		  });  },
	  handleImage8Click() {
		  uni.showToast({
		  title:'游泳馆信息',
		  	icon: 'success',
		  	duration:1000
		  });
	  }
    }
};
</script>

<style>
	.image-stack {
	  position: relative;
	}
	
	.image-stack img {
	  transform-origin: center center;
	  position: absolute;
	  width: 780px; /* 根据需要设置宽度 */
	  height: 960px; /* 根据需要设置高度 */
	}
	
	.image-0 {
	  z-index: 1;
	}
	.image-1 {
	  z-index: 2;
	}
	.image-2{
	  z-index: 3;
	}
	.image-3{
	  z-index: 4;
	}
	.image-4{
	  z-index: 5;
	}
	.image-5{
	  z-index: 6;
	  }
	.image-6{
	  z-index: 7;
	}
	.image-7{
	  z-index: 8;
	}
</style>