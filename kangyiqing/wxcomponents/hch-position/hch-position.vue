<template>
    <view>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <map id="myMap" style="width: 100%; height: 640px;" :latitude="latitude" :longitude="longitude" :markers="markers" show-location enable-scroll @tap="bindtap" 
				@callouttap="callouttap" @regionchange="regionchange" @updated="updated">
                </map>
            </view>
			<view class="vperson-tips">
				<cover-view class="vperson-des-box" v-if="vpersonFlag" >
					<cover-image class="vperson-img" src="../../static/hch-position/1.jpg"></cover-image>
					<cover-view class="vperson-des">
						<cover-view class="vperson-name">症状人员</cover-view>
						<cover-view class="vperson-address">地址:{{vperson.address}}</cover-view>					
						<cover-view class="vperson-time">发生时间:{{vperson.time}}</cover-view>					
					</cover-view>
				</cover-view>
			</view>
			<cover-view class="near-num">距离最近的场馆入口{{distanceL}}千米</cover-view>
			<cover-image class="address-icon" src="../../static/hch-position/定位.png"></cover-image>
        </view>
    </view>
</template>

<script>
export default {
	props:{
		vpersonData:{
			type:Array,
			default:[
				// {
				// 	id:1,
				// 	name:'确诊患者',
				// 	address:'湖北经济学院里栎1-666',
				// 	time:'2020-4-7',
				// },{
				// 	id:2,
				// 	name:'疑似患者',
				// 	address:'湖北经济学院桔7-413',
				// 	time:'2020-6-8',
				// },
			]
		},
		 markers:{
			 type:Array,
			 default: [
			// {
			// 	id:1,
			// 	latitude: 30.92584,
			// 	longitude: 110.980479034,
			// 	iconPath: '../../static/hch-position/virus.png',
			// 	callout:{
			// 		content:"确诊患者",
			// 		borderRadius:10,
			// 		padding:10,
			// 		display:"ALWAYS",
			// 	}
			// }, {
			// 	id:2,
			// 	latitude: 30.72584,
			// 	longitude: 110.880479034,
			// 	iconPath: '../../static/hch-position/virus.png',
			// 	callout:{
			// 		content:"疑似患者",
			// 		borderRadius:10,
			// 		padding:10,
			// 		display:"ALWAYS",
			// 	}
			// }
			]
		 },
	},
    data() {
        return {
			vperson:{},
			vpersonFlag:false,
			vpersonAdFlag:true,
			distanceL:0,
            latitude: 39.909,
            longitude: 116.39742,
			controls:[
				
			]
        }
    },
    methods: {
	
		// 点击气泡
		callouttap(e){
			this.vpersonFlag=true;
			this.vpersonAdFlag=false;
			for (let i = 0; i < this.vpersonData.length; i++) {
				const ele = this.vpersonData[i];
				if(ele.id==e.markerId){
					this.vperson = ele;
					break;
				}
			}
			
		},
		// 点击地图
		bindtap(id){
			this.vpersonFlag=false;
			// this.vpersonAdFlag=true;
		},
		
		updated(){
			let _this = this;
			wx.getLocation({
			  type: 'gcj02', //返回可以用于wx.openLocation的经纬度
			  success: function (res) {
				_this.latitude = res.latitude;
				_this.longitude = res.longitude;
				_this.nearDistance(_this.markers,_this.latitude,_this.longitude)
			  },
			   fail: function(res){
				   console.log(res);
			   }
		  })
		},
		// 改变视野时改变经纬度
		regionchange(e){
			let _this = this;
			// 使用 wx.createMapContext 获取 map 上下文
			var mapCtx = wx.createMapContext('myMap',this)
			mapCtx.getCenterLocation({
				success:function(res){
					_this.centerLatitude = res.latitude;
					_this.centerLongitude = res.longitude;
					_this.nearDistance(_this.markers,_this.centerLatitude,_this.centerLongitude)
				},
				fail: function(res){
				   console.log(res);
				}
			}) //获取当前地图的中心经纬度
		},
		// 两点间距离
		distance(la1, lo1, la2, lo2) {
			var La1 = la1 * Math.PI / 180.0;
			var La2 = la2 * Math.PI / 180.0;
			var La3 = La1 - La2;
			var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
			var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
			s = s * 6378.137;//地球半径
			s = Math.round(s * 10000) / 10000;
			return s
		},
		// 计算最近的距离
		nearDistance(array,centerLatitude,centerLongitude){
			let temp=[]
			for (let i = 0,l=array.length; i < l; i++) {
				const element =  array[i];
				let d = this.distance(element.latitude,element.longitude,centerLatitude,centerLongitude);
				temp.push(d)
			};
			this.distanceL = Math.min.apply(null, temp);
		}
		
		
    },
	onShow() {
		
	},
	onReady() {
		
  },
}
</script>

<style lang="scss">
	.content {
		text-align: center;
		height: 400upx;
	}
	.page-section{
		z-index: 0;
	}
	.vperson-tips{
		width: 600upx;
		height: 100upx;
		margin: 10upx auto;
		border-radius: 10upx;
		position: absolute;
		top: 10upx;
		left: 50%;
		transform: translate(-50%,0);
		z-index:2;
		overflow: hidden;
		.vperson-des-box{
			background: #fff;
		}
		.vperson-img{
			width: 80upx;
			height: 80upx;
			border-radious:10upx;
			margin: 10upx;
			float: left;
		}
		.vperson-des{
			padding-top: 8upx;
			float: left;
			line-height: 1;
			font-size: 22upx;
			color: #666;
			padding-left: 20upx;
			.vperson-name{
				font-weight: 600;
				color: deeppink;
			}
		}
		.vperson-clear{
			width: 30upx;
			height: 30upx;
			position: absolute;
			top:7rpx;
			right:7upx;
			maigin:30upx;
	
		}
	}
	.address-icon{
		width:38rpx;
		height:40rpx;
		position:absolute;
		top:22%;
		left:50%;
		z-index:2;
		margin-bottom:-20upx;
		margin-left:-20upx;

	}
	.near-num{
		padding: 10upx 20upx;
		border-radius: 10upx;
		position:absolute;
		top:17%;
		left:50%;
		z-index:2;
		font-size:24upx;
		background:#fff;
		transform: translate(-50%,0)
	}
</style>
