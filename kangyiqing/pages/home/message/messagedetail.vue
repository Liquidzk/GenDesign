<template>
  <div class="hm-news-detail">
    <div class="hd">
      <div class="container">
        <div class="outer">
          <span class="author">{{ options.infoSource }}</span>
        </div>
        <span class="time">{{ options.mtime }}</span>
      </div>
    </div>
    <span class="title">{{ options.title }}</span>
    <div class="ft">
      <span class="content">{{ options.summary }}</span>
    </div>
  </div>
</template>
<script>
  export default {
        data() {
            return {
                title: 'list-triplex-row',
                options: {},
            }
        },
        onLoad(event) {
            // 目前在某些平台参数会被主动 decode，暂时这样处理。
            try {
                this.options = JSON.parse(decodeURIComponent(event.detailDate));
            } catch (error) {
                this.options = JSON.parse(event.detailDate);
            }
            uni.setNavigationBarTitle({
                title: this.options.title
            });
        },
        methods: {
   
        }
    }

</script>
<style>
.hm-news-detail {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
  width: 750rpx;
  height: 1228rpx;
}

.hd {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 52rpx;
  width: 748rpx;
}

.yunshu {
  width: 76rpx;
  height: 76rpx;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.09));
}

.container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 20rpx;
  height: 76rpx;
}

.outer {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rpx;
  width: 510rpx;
  height: 46rpx;
}

.author {
  max-width: 368rpx;
  height: 44rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 44rpx;
  white-space: nowrap;
  color: #000000;
  font-size: 32rpx;
  font-weight: 400;
}

.wrap {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 12rpx;
  height: 34rpx;
}

.like {
  opacity: 0.5;
  width: 38rpx;
  height: 34rpx;
}

.share {
  opacity: 0.5;
  margin-left: 52rpx;
  width: 30rpx;
  height: 30rpx;
}

.time {
  opacity: 0.6;
  max-width: 560rpx;
  height: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 28rpx;
  white-space: pre;
  color: #000000;
  font-family: Helvetica;
  font-size: 24rpx;
  font-weight: normal;
}

.title {
  margin-top: 36rpx;
  margin-left: 68rpx;
  width: 512rpx;
  height: 100rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 50rpx;
  white-space: pre-wrap;
  color: #000000;
  font-size: 36rpx;
  font-weight: 400;
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 16rpx;
  width: 748rpx;
}

.entryPicWrap {
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 686rpx;
  height: 368rpx;
}

.img {
  position: relative;
  width: 686rpx;
  height: 368rpx;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.05));
}

.ft {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50rpx;
  width: 748rpx;
}

.content {
  width: 670rpx;
  height: 496rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 62rpx;
  letter-spacing: 0px;
  white-space: pre-wrap;
  color: #000000;
  font-size: 36rpx;
  font-weight: 400;
}

</style>
