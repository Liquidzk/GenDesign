<template>
    <view class="content">
    	<view class="list">
    		<view class="item" v-for="(item,key) in listData" :key="key" @click="goDetail(item)" >
    			<view class="name">{{item.title}}</view>
    			<view class="info">
    				<view class="author">{{item.infoSource}}</view>
    				<view class="date">{{item.mtime}}</view>
    			</view>
    		</view>
    	</view>
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
        			goDetail: function(e) {
        			    // 				if (!/前|刚刚/.test(e.published_at)) {
        			    // 					e.published_at = dateUtils.format(e.published_at);
        			    // 				}
        			    let detail = {
        			        mtime: e.mtime,
        			        title: e.title,
        			        infoSource: e.infoSource,
        			        summary: e.summary
        			    }
        			    uni.navigateTo({
        			        url: "messagedetail?detailDate=" + encodeURIComponent(JSON.stringify(
        			            detail))
        			    })
        			},
        			getList() {
        			    var data = {
        			        column: "title,mtime,infoSource,summary" //需要的字段名
        			    }; 
        			    uni.request({
        			        url: 'http://192.168.31.188:8082/jat/api/listmessage',
        			        data: data,
        			        success: (data) => {
        			            if (data.statusCode == 200) {
        			                let list = this.setTime(data.data.messageList);
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
        			            mtime: e.mtime,
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
</style>