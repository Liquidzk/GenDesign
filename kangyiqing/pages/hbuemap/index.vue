<template>
  <div class="image-stack" ref="imageStack" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @click = "handleImageClick">
    <img v-for="(image, index) in imageList" 
	:src="image.src" 
	:key="index" 
	:class="'image-' + index"
	:ref="'image' + index"
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
		maxScale: 4, // 最大缩放比例
		translateX: 0,
		translateY: 0,
		touchStartX: 0,
		touchStartY: 0,
		touchMoveX: 0,
		touchMoveY: 0,
		offsetX: 0,
		offsetY: 0,
		windowX: 0,
		windowY: 0,
      imageList: [
        { src: './static/index/map.png', id:'image1' , x: 0, y: 0},
		{ src:'./static/index/室内体育馆.png',id:'image2', x: 765, y: 2640},
		{ src:'./static/index/五人足球场.png',id:'image3', x: 1575, y: 2525},
		{ src:'./static/index/篮球场.png',id:'image4', x: 2110, y: 1430},
		{ src:'./static/index/主足球场.png',id:'image5', x: 1265, y: 1500},
		{ src:'./static/index/板式网球场.png',id:'image6', x: 1615, y: 680},
		{ src:'./static/index/网球场.png',id:'image7', x: 1045, y: 450},
		{ src:'./static/index/游泳馆.png',id:'image8', x: 490, y: 815}
      ],
	  points:[
		  {x: 765/6.5, y: 2640/6.5, callback: () => this.handleImage2Click()},
		  {x: 1575/6.5, y: 2525/6.5, callback: () => this.handleImage3Click()},
		  {x: 2110/6.5, y: 1430/6.5, callback: () => this.handleImage4Click()},
		  {x: 1265/6.5, y: 1500/6.5, callback: () => this.handleImage5Click()},
		  {x: 1615/6.5, y: 680/6.5, callback: () => this.handleImage6Click()},
		  {x: 1045/6.5, y: 450/6.5, callback: () => this.handleImage7Click()},
		  {x: 490/6.5, y: 815/6.5, callback: () => this.handleImage8Click()}
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
			  
		  getDistance(x1,y1,x2,y2){
			  const dx = x2-x1;
			  const dy = y2-y1;
			  return Math.sqrt(dx * dx + dy * dy);
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
	  handleImageClick(event) {
		  var actrualX; var actrualY;
		  var clickX = event.detail.x;// 获取点击的横坐标
		  var clickY = event.detail.y; // 获取点击的纵坐标
		  actrualX=clickX+this.offsetX*this.scale;
		  actrualY=clickY+this.offsetY*this.scale;
		  
		  var multiplier = 2600 / 400;
		  
		        let nearestPoint = null;
		        let minDistance = Infinity;
		  
		        // 遍历所有点，计算点击位置与每个点之间的距离
		        for (let i = 0; i < this.points.length; i++) {
		          const point = this.points[i];
		          const distance = Math.sqrt(
		            Math.pow(actrualX - point.x, 2) + Math.pow(actrualY - point.y, 2)
		          );
		  
		          // 如果当前点的距离比最小距离小，则更新最小距离和最近点
		          if (distance < minDistance) {
		            minDistance = distance;
		            nearestPoint = point;
		          }
		        }
				console.log(this.scale);
				console.log(this.translateX+','+this.translateY);
		        // 执行最近点对应的函数
		        if (nearestPoint && nearestPoint.callback) {
		          nearestPoint.callback();
		    }
	  },
      handleImage1Click() {
		  
      },
      handleImage2Click() {
		uni.showToast({
    				title:'室内体育馆',
    				icon: 'success',
    				duration:1000
    			});  },
      handleImage3Click() {
		  uni.showToast({
		  			title:'五人足球场',
		  			icon: 'success',
		  			duration:1000
		  		});
      },
	  handleImage4Click() {
		  uni.showToast({
		  title:'篮球场',
		  	icon: 'success',
		  	duration:1000
		  });  
	  },
	  handleImage5Click() {
		  uni.showToast({
		  title:'主足球场',
		  	icon: 'success',
		  	duration:1000
		  });  },
	  handleImage6Click() {
		  uni.showToast({
		  title:'板式网球场',
		  	icon: 'success',
		  	duration:1000
		  });  },
	  handleImage7Click() {
		  uni.showToast({
		  title:'网球场',
		  	icon: 'success',
		  	duration:1000
		  });  },
	  handleImage8Click() {
		  uni.showToast({
		  title:'游泳馆',
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
	  width: 390px; /* 根据需要设置宽度 */
	  height: 480px; /* 根据需要设置高度 */
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