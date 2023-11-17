<template>
	<view>
		<view class="example-body" isShadow v-for="(item, key) in listData" :key="key" @click="goDetail(item)">
			<uni-card title="申请信息"  >
            <view class="content-box-text">姓名：{{item.name}}</view>
            <view class="content-box-text">电话：{{item.phone}}</view>
            <view class="content-box-text">审核状态：{{item.status}}</view>
            </uni-card>
		</view>
        
        <button @click="goPass()">申请临时通行证</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: []
			}
		},
        onLoad() {
            this.getList();
        },
		methods: {
			getList() {
                var data = {
                    column: "id,name,phone,status,vaccine" //需要的字段名
                }; 
                var userinfo = uni.getStorageSync("userInfo");
                var uid = userinfo.id;
                 var uid = 10;
			      uni.request({
			          url: "http://192.168.31.188:8082/jat/api/queryPass?uid=" + uid,
                      data: data,
			          success: (data) => {
                          console.log(data.data.passList)
			              let list = this.setTime(data.data.passList);
                          this.listData = this.reload ? list : this.listData.concat(list);
                          console.log(list)
			          },
			          fail: (data, code) => {
			              console.log('fail' + JSON.stringify(data));
			          }
			      })
			  },    
			  setTime: function(items) {
			      var newItems = [];
			      items.forEach((e) => {
                      if(e.status == 1){
                          var pstatus = "审核通过";
                      }else{
                          var pstatus = "待审核";
                      };
			          newItems.push({
                          id: e.id,
			              name: e.name,
			              phone: e.phone,
                          vaccine: e.vaccine,
                          status: pstatus
			          });
			      });
			      return newItems;
			  },
              goDetail: function(e) {
                  console.log(e.status);
                  if(e.status == "审核通过"){
                     let detail = {
                      id: e.id,
                      phone: e.phone,
                      vaccine: e.vaccine
                  }
                  uni.navigateTo({
                      url: "tpass/psqrcode?detailDate=" + encodeURIComponent(JSON.stringify(
                          detail))
                  }) ;
                  }else{
                  uni.showModal({
                      	content: '待审核',
                      	showCancel: false
                      });
                      }
              },
            goPass() {
                uni.navigateTo({
                    url: "tpass/phealthy"
                }) ;
            }
		}
	}
</script>


<style lang="scss">
	@import '@/common/uni-nvue.scss';

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 1px 0;
	}

	.example-box {
		margin: 12px 0;
	}

	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		height: 350rpx;
		overflow: hidden;
	}

	.image {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1;
	}

	.content-box {
		padding-top: 20rpx;
	}

	.content-box-text {
		font-size: 12px;
		line-height: 22px;
	}

	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;

	}

	.footer-box__item {
		align-items: center;
		padding: 2px 0;
		font-size: 12px;
		color: #666;
	}
</style>

