<template>
    <view>
        <view class="banner">
            <image class="banner-img" src="../../../static/index/banner2.jpg"></image>
        </view>
        <view class="uni-list">
            <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in listData" :key="key"
                @click="goDetail(value)">
                <view class="uni-media-list">
                    <image class="uni-media-list-logo" :src="value.picUrl" ></image>
                    <view class="uni-media-list-body">
                        <view class="uni-media-list-text-top">{{value.title}}</view>
                        <view class="uni-media-list-text-bottom">
                            <text>{{value.description}}</text>
                            <text>{{value.ctime}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
   // var dateUtils = require('../../utils/util.js').dateUtils;

    export default {
        data() {
            return {
                listData: [],
                last_id: "",
                reload: false
            }
        },
        onLoad() {
            this.getList();
        },
        onPullDownRefresh() {
            this.reload = true;
            this.last_id = "";
            this.getList();
        },
        onReachBottom() {
            this.getList();
        },
        methods: {
			goDetail(data) {
				uni.navigateTo({
					url: '../detail?url='+data.url
				})
			},
            getList() {
                var data = {
                    column: "url,title,description,picUrl,ctime" //需要的字段名
                };
                if (this.last_id) { //说明已有数据，目前处于上拉加载
                    data.minId = this.last_id;
                    data.time = new Date().getTime() + "";
                    data.pageSize = 10;
                }
                uni.request({
                    url: 'https://api.tianapi.com/generalnews/index?key=83fcdb1b0eaf62904f7869267cea8b97&word=疫情&num=30',
                    data: data,
                    success: (data) => {
                        if (data.statusCode == 200) {
                            let list = this.setTime(data.data.newslist);
                            this.listData = this.reload ? list : this.listData.concat(list);
                            this.last_id = list[list.length - 1].id;
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
                        description: e.description,
                        picUrl: e.picUrl,
                        url: e.url,
                        ctime: e.ctime,
                        title: e.title
                    });
                });
                return newItems;
            }
        },
    }
</script>

<style>
    .banner {
        height: 360upx;
        overflow: hidden;
        position: relative;
        background-color: #ccc;
    }

    .banner-img {
        width: 100%;
    }

    .banner-title {
        max-height: 84upx;
        overflow: hidden;
        position: absolute;
        left: 30upx;
        bottom: 30upx;
        width: 90%;
        font-size: 32upx;
        font-weight: 400;
        line-height: 42upx;
        color: white;
        z-index: 11;
    }

    .uni-list {
        background-color: #FFFFFF;
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .uni-list:after {
        position: absolute;
        z-index: 10;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .uni-list::before {
        position: absolute;
        z-index: 10;
        right: 0;
        top: 0;
        left: 0;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .uni-list-cell {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .uni-list-cell-hover {
        background-color: #eee;
    }

    .uni-list-cell::after {
        position: absolute;
        z-index: 3;
        right: 0;
        bottom: 0;
        left: 30upx;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .uni-list .uni-list-cell:last-child::after {
        height: 0upx;
    }

    /* 图文列表 */
    .uni-media-list {
        padding: 22upx 30upx;
        box-sizing: border-box;
        display: flex;
        width: 100%;
        flex-direction: row;
    }

    .uni-navigate-right.uni-media-list {
        padding-right: 74upx;
    }

    .uni-pull-right {
        flex-direction: row-reverse;
    }

    .uni-pull-right>.uni-media-list-logo {
        margin-right: 0upx;
        margin-left: 20upx;
    }

    .uni-media-list-logo image {
        height: 100%;
        width: 100%;
    }


    .uni-media-list-text-bottom {
        width: 100%;
        line-height: 30upx;
        font-size: 26upx;
        color: #8f8f94;
    }

    .uni-media-list-logo {
        width: 180upx;
        height: 140upx;
        margin-right: 20upx;
    }

    .uni-media-list-body {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        overflow: hidden;
        height: auto;
    }

    .uni-media-list-text-top {
        width: 100%;
        line-height: 36upx;
        font-size: 30upx;
        height: 74upx;
        font-size: 28upx;
        overflow: hidden;
    }

    .uni-media-list-text-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
