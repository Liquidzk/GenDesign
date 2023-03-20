<template>
	<view class="page">
		<view class="banner">
			<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box">
					<swiper-item v-for="(item, index) in info" :key="index">
						<view :class="item.colorClass" class="swiper-item">
							<image :src="item.url" mode="aspectFill" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="notice">
			<view class="icon">
				<image mode="aspectFit" src="../../static/index/banner1.jpg"></image>
			</view>
			<view class="text">经安通助力疫情防控,践行科技工作者使命担当，抗疫复学专线</view>
		</view>
		<view class="fast">
			<view class="item" @click="goto('/pages/home/myqrcode/qrcode')">
				<view class="icon">
					<image mode="aspectFit" src="../../static/icons/index/qrcode.png"></image>
				</view>
				<view class="name">居安通行证</view>
			</view>
			<view class="item" @click="goto('/pages/home/data/data')">
				<view class="icon">
					<image mode="aspectFit" src="../../static/icons/index/wenduji2.png"></image>
				</view>
				<view class="name">疫情数据</view>
			</view>
		</view>

		<view class="options">
			<view class="option" @click="goto('/pages/home/news/news')">
				<view class="icon">
					<image mode="aspectFit" src="../../static/icons/index/dianhua.png"></image>
				</view>
				<view class="name">新闻信息</view>
			</view>

			<view class="option" @click="goto('/pages/home/message/message')">
				<view class="icon">
					<image mode="aspectFit" src="../../static/icons/index/jiandujubao.png"></image>
				</view>
				<view class="name">管控通知</view>
			</view>

			<view class="option" @click="goto('/pages/home/yaoyan/yaoyan')">
				<view class="icon">
					<image mode="aspectFit" src="../../static/icons/index/yibaogezhangshouquanchaxun.png"></image>
				</view>
				<view class="name">谣言粉碎</view>
			</view>

			<view class="option" @click="goto('/pages/home/healthynews/healthynews')">
				<view class="icon">
					<image mode="aspectFit" src="../../static/icons/index/xunyiwenzhen.png"></image>
				</view>
				<view class="name">抗疫贴士</view>
			</view>
		</view>

		<view class="banner-ad">
			<image src="../../static/index/banner1.jpg" mode="aspectFill"></image>
		</view>

		<view class="news-title">- 今日动态 -</view>

		<view class="content">
			<view class="list">
				<view class="item" v-for="(item,key) in listData" @click="goDetail(item)" :key="key">
					<view class="name">{{item.title}}</view>
					<view class="info">
						<view class="author">{{item.infoSource}}</view>
						<view class="date">{{item.pubDateStr}}</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
var loginRes;
export default{
	data() {
		return{
			listData: [],
			info: [{
				colorClass: 'uni-bg-red',
				url: '../../static/index/banner2.jpg',
				content: '内容 A'
			},
			{
				colorClass: 'uni-bg-green',
				url: '../../static/index/banner3.jpg',
				content: '内容 B'
			}],
			dotStyle: [{
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				{
					backgroundColor: 'rgba(255, 90, 95,0.3)',
					border: '1px rgba(255, 90, 95,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
					selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
				},
				{
					backgroundColor: 'rgba(83, 200, 249,0.3)',
					border: '1px rgba(83, 200, 249,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
					selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
				}
			],
			modeIndex: -1,
			styleIndex: -1,
			current: 0,
			mode: 'default',
			dotsStyles: {},
		};
	},
	onLoad() {
	    this.getList();
	},
	methods: {
			goto(page) {
				uni.navigateTo({
					url: page
				})
			},
			goDetail: function(e) {
			    let detail = {
			        mtime: e.mtime,
			        title: e.title,
			        infoSource: e.infoSource,
			        summary: e.summary
			    }
			    uni.navigateTo({
			        url: "newsdetail?detailDate=" + encodeURIComponent(JSON.stringify(
			            detail))
			    })
			},
			getList() {
			    var data = {
			        column: "title,pubDateStr,infoSource" //需要的字段名
			    }; 
			    uni.request({
			        url: 'https://api.tianapi.com/txapi/ncov/index?key=83fcdb1b0eaf62904f7869267cea8b97',
			        data: data,
			        success: (data) => {
			            if (data.statusCode == 200) {
			                let list = this.setTime(data.data.newslist[0].news);
			                this.listData = this.reload ? list : this.listData.concat(list);
			                this.reload = false;
			            }
			        },
			        fail: (data, code) => {
			            console.log('fail' + JSON.stringify(data));
			        }
			    })
			},
			setTime: function(items) {
			    var newItems = [];
			    items.forEach((e) => {
			        newItems.push({
			            pubDateStr: e.pubDateStr,
			            title: e.title,
						infoSource: e.infoSource,
						summary: e.summary
			        });
			    });
			    return newItems;
			},
}
};

</script>

<style lang="scss" scoped>
	.page {
		width: 750upx;

		.banner-ad {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			background: #FFFFFF;
			margin-top: 20upx;
			padding: 20upx 20upx;

			image {
				width: 100%;
				height: 160upx;
				border-radius: 10upx;
			}
		}

		.notice {
			display: flex;
			background-color: rgb(255, 251, 232);
			height: 100upx;
			align-items: center;
			padding: 10upx 20upx;

			.icon {
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 30upx;
					height: 30upx;
				}
			}

			.text {
				flex: 1;
				margin-left: 10upx;
				color: rgb(222, 140, 23);
				font-size: 26upx;
				padding:0 20upx;
			}

			.option {
				font-size: 26upx;
				color: rgb(153, 153, 153);
			}
		}

		.banner {
			width: 100%;

			.swiper-box {
				height: 400upx;
			}

			.swiper-item {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				background: #eee;
				color: #fff;
			}

			.swiper-item image {
				width: 100%;
				height: 100%;
			}
		}

		.fast {
			display: flex;
			height: 100upx;
			width: 100%;
			padding: 0 15upx;
			margin-bottom: 20upx;
			margin-top: 20upx;

			.item {
				display: flex;
				justify-content: center;
				margin: 0 20upx;
				align-items: center;
				height: 100%;
				width: 50%;
				background: #FFFFFF;
				height: 100upx;
				border-radius: 20upx;

				.icon {
					image {
						height: 50upx;
						width: 50upx;
					}
				}

				.name {
					margin-left: 20upx;
					line-height: 30upx;
					font-size: 24upx;
				}
			}
		}

		.options {
			display: flex;
			width: 750upx;
			height: 140upx;
			align-items: center;
			background-color: #FFFFFF;
			flex-wrap: wrap;

			.option {
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 140upx;

				.icon {
					image {
						height: 80upx;
						width: 80upx;
					}
				}

				.name {
					color: #333;
					line-height: 30upx;
				}
			}
		}


		.news-title {
			font-size: 30upx;
			font-weight: bold;
			color: #666;
			margin-top: 20upx;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			width: 750upx;
		}


		.content {
			display: flex;
			flex-direction: column;
			margin-top: 20upx;
			background-color: #FFFFFF;

			.list {
				.item {
					display: flex;
					flex-direction: column;
					border-bottom: 1px solid #EEEEEE;
					min-height: 130upx;
					padding: 20upx 30upx;
					justify-content: center;

					.name {
						font-size: 30upx;
						font-weight: bold;
						color: #333333;
					}

					.info {
						display: flex;
						justify-content: space-between;
						color: #666666;
						font-size: 26upx;
					}
				}
			}
		}

		.more {
			height: 70upx;
			color: #0A98D5;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
