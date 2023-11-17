<template>
	<view >
		<image :src="setting.top_thumb ? setting.top_thumb : '../../../static/index/banner4.jpg'" mode="widthFix" style="width: 100%;">
			<view class="cu-bar bg-white">
				<view class="action title-style-3">
					<text class="text-xl text-bold">最新疫情</text>
					<text class="text-Abc text-gray self-end margin-left-sm">截止：{{dtime}}</text>

				</view>
				<view class="">
					<text class="text-gray self-end margin-right-sm" @tap="showModal" data-target="shuoming">数据说明</text>
					<view class="cu-modal" :class="modalName=='shuoming'?'show':''" @tap="hideModal">
						<view class="cu-dialog" @tap.stop>
							<view class="text-xl margin-top-xl">
								疫情数据说明
							</view>
							<view class="text-left padding">
								<view>1. 数据来源： </view>
								<view>全部数据来源于国家卫健委、各省市区卫健委、各省市区政府、港澳台官方渠道公开数据；</view>
								<view>2. 数据更新时间：</view>
								<view>实时更新全国及各省市区数据，因核实计算需求，会与官方的发布时间存在一定时间的延迟；</view>
								<view>3. 数据统计方法：</view>
								<view>a）每日上午优先将全国数据与国家卫健委公布数据保持一致（此时各省市数据尚未及时更新，会出现全国数据大于各省份合计数的情况）；</view>
								<view>b）当各省公布数据总和大于国家公布数据时，则全国数据直接切换为各省数据总和；</view>
								<view>c）全国数据含港澳台地区数据；</view>
								<view>4. 全国疫情状况中，除疑似病例数据以外，“较昨日+/-”的数据为“当前实时数据-昨日24小时内国家卫健委公布的官方数据” ；</view>
								<view>5. 疑似病例数据统计按日更新，仅同步全国总数，采用国家卫健委每日通报的数据，暂不呈现分省疑似病例；“较昨日+/-”数据来源于国家卫健委每日公布的新增疑似病例数据；</view>
							</view>
							<view class="cu-bar bg-white justify-end">
								<view class="action">
									<!-- <button class="cu-btn line-green text-green" @tap="hideModal">取消</button> -->
									<button class="cu-btn bg-green margin-left" @tap="hideModal">知道了</button>

								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="grid col-4 text-center margin-tb-sm">
				<view class="padding-xs">
					<view class="padding radius text-center shadow-blur bg-blue">
						<view class="text-lg">确诊</view>
						<view class="text-Abc text-xxl">{{Mdata.patientExecution.qnum}}</view>
						<view class="text-xs">较昨日</view>
						<view class="text-xs">+{{mdata.pe.qnum}}</view>
					</view>
				</view>
				<view class="padding-xs">
					<view class="padding radius text-center shadow-blur bg-brown">
						<view class="text-lg">无症状</view>
						<view class="text-Abc text-xxl">{{Mdata.patientExecution.wnum}}</view>
						<view class="text-xs">较昨日</view>
						<view class="text-xs">+{{mdata.pe.wnum}}</view>
					</view>
				</view>
				<view class="padding-xs">
					<view class="padding radius text-center shadow-blur bg-green">
						<view class="text-lg">疑似</view>
						<view class="text-Abc text-xxl">{{Mdata.patientExecution.ynum}}</view>
						<view class="text-xs">较昨日</view>
						<view class="text-xs">+{{mdata.pe.ynum}}</view>
					</view>
				</view>
				<view class="padding-xs">
					<view class="padding radius text-center shadow-blur bg-gray" >
						<view class="text-lg">密接</view>
						<view class="text-Abc text-xxl">{{Mdata.patientExecution.mnum}}</view>
						<view class="text-xs">较昨日</view>
						<view class="text-xs" >+{{mdata.pe.mnum}}</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	var that
	// #ifdef H5
	const wx = require('weixin-js-sdk')
	// #endif
	export default {
		data() {
			return {
			    mdata:[],
				Mdata:[],
				setting: [],
				dtime: new Date,
				modalName: null,
				url: ''
			}
		},
		onLoad(res) {
			this.getmnum();
			this.getMnum();
		},
		async onShow() {
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			getmnum(){
				var data = {
					column: "qnum,wnum,ynum,mnum"
				}
				const _this = this
				uni.request({
					url:'http://192.168.31.188:8082/jat/api/getpatientcount',
					method: 'GET',
					data: data,
					success:function(res){
						console.log(res);
						_this.mdata = res.data;
					},
					fail: (data, code) => {
					    console.log('fail' + JSON.stringify(data));
					}
				})
			},
			getMnum(){
				var data = {
					column: "qnum,wnum,ynum,mnum"
				}
				const _this = this
				uni.request({
					url:'http://192.168.31.188:8082/jat/api/getpatientcountbystatus',
					method: 'GET',
					data: data,
					success:function(resp){
						console.log(resp);
						_this.Mdata = resp.data;
					},
					fail: (data, code) => {
					    console.log('fail' + JSON.stringify(data));
					}
				})
			}
		}
	}
</script>

<style>

</style>
