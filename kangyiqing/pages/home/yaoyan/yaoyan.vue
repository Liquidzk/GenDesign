<template>
	<div class="page">
  <div class="hm-news-card" v-for="(options,key) in listData" :key="key">
    <div class="container">
      <div class="box" @click="onClick" >
        <img class="img" :src="options.imgsrc" />
        <span class="title">{{ options.title }}</span>
        <div class="submain">
          <span class="author">{{ options.author }}</span>
          <span class="date">{{ options.date }}</span>
        </div>
        <span class="summary">{{ options.desc }}</span>
        <div class="row_2" />
        <div class="ft">
          <span class="comments">{{ options.markstyle }}</span>
          <span class="likes" >{{ options.explain }}</span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  // name: 'HmNewsCard',
  // props: {
  //   dataId: {
  //     type: String,
  //     default: 'hm-news-card'
  //   },
  //   options: {
  //     type: Object,
  //     default: function() {
  //       return {
  //         img: '/static/hm-news-card/images/img_22726_0_0.png',
  //         title: '新闻标题',
  //         author: '作者',
  //         date: '16 MAY 2016',
  //         summary:
  //           '新闻概要。新闻概要长度最好控制在50字符以内',
  //         comments: "14 评论",
  //         likes: "254 喜欢",
  //         url: '',
  //         showComments: true,
  //         showLikes: true
  //       };
  //     }
  //   }
  // },
  data() {
    return {
		listData: [],
		reload: false
	}
  },
  onLoad() {
	  this.getList();
  },
  methods: {
	  getList() {
	      var data = {
	          column: "date,title,desc,imgsrc,author,markstyle,explain" //需要的字段名
	      }; 
	      uni.request({
	          url: 'https://api.tianapi.com/txapi/rumour/index?key=83fcdb1b0eaf62904f7869267cea8b97',
	          data: data,
	          success: (data) => {
	              if (data.statusCode == 200) {
	                  let list = this.setTime(data.data.newslist);
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
	              desc: e.desc,
	              imgsrc: e.imgsrc,
	              date: e.date,
	              author: e.author,
	              title: e.title,
				  markstyle: e.markstyle,
				  explain: e.explain
	          });
	      });
	      return newItems;
	  },
    onClick() {
      uni.navigateTo({
        url: this.options.url
      });
    }
  }
};
</script>
<style>
.hm-news-card {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 750rpx;
  height: 774rpx;
}

.container {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  height: 736rpx;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}

.box {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #ffffff;
  width: 692rpx;
  height: 736rpx;
  filter: drop-shadow(0px 1px 6px 1px rgba(0, 0, 0, 0.05));
}

.img {
  width: 692rpx;
  height: 378rpx;
  overflow: hidden;
}

.title {
  margin-top: 26rpx;
  margin-left: 38rpx;
  max-width: 630rpx;
  height: 44rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 44rpx;
  letter-spacing: 0px;
  white-space: pre;
  color: #030303;
  font-family: Helvetica;
  font-size: 36rpx;
  font-weight: normal;
}

.submain {
  display: flex;
  flex-direction: row;
  margin-top: 14rpx;
}

.author {
  margin-left: 38rpx;
  width: 150rpx;
  height: 28rpx;
  line-height: 28rpx;
  white-space: nowrap;
  color: #b8e986;
  font-family: Helvetica;
  font-size: 24rpx;
  font-weight: normal;
}

.date {
  margin-left: 28rpx;
  width: 146rpx;
  height: 28rpx;
  line-height: 28rpx;
  white-space: pre;
  color: #c7c7cd;
  font-family: Helvetica;
  font-size: 24rpx;
  font-weight: normal;
}

.summary {
  margin-top: 16rpx;
  margin-left: 38rpx;
  width: 554rpx;
  height: 88rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 44rpx;
  letter-spacing: 0px;
  white-space: pre-wrap;
  color: #8f8e94;
  font-family: Helvetica;
  font-size: 28rpx;
  font-weight: normal;
}

.row_2 {
  display: flex;
  margin-top: 42rpx;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgba(239, 239, 244, 1);
  width: 692rpx;
  height: 8rpx;
}

.ft {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 28rpx;
  padding-right: 48rpx;
  padding-left: 40rpx;
  width: 692rpx;
}

.comments {
  width: 182rpx;
  height: 24rpx;
  line-height: 24rpx;
  letter-spacing: 1.67px;
  white-space: pre;
  color: #8f8e94;
  font-family: Helvetica;
  font-size: 20rpx;
  font-weight: normal;
}

.likes {
  width: 126rpx;
  height: 24rpx;
  line-height: 24rpx;
  letter-spacing: 1.67px;
  white-space: pre;
  color: #8f8e94;
  font-family: Helvetica;
  font-size: 20rpx;
  font-weight: normal;
}

</style>
