<template>
    <view class="content">
        <hchPosition :vpersonData="vpersonData" :markers="markers" ></hchPosition>
    </view>
</template>

<script>
import hchPosition from "../../wxcomponents/hch-position/hch-position"
export default {
    data() {
        return {
			
			vpersonData: [
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
			],
			markers: [
			// 	{
			// 	id:1,
			//     latitude: 24.4483294023427,
			//     longitude: 118.08479034393311,
			   
			// 	callout:{
			// 		content:"确诊患者",
			// 		borderRadius:10,
			// 		padding:10,
			// 		display:"ALWAYS",
			// 	}
			// }, {
			// 	id:2,
			//     latitude: 30.72584,
			//     longitude: 110.880479034,
			//     iconPath: '../../static/hch-position/virus.png',
			// 	callout:{
			// 		content:"疑似患者",
			// 		borderRadius:10,
			// 		padding:10,
			// 		display:"ALWAYS",
			// 	}
			// }
			],
        }
    },
	components:{
		hchPosition,
	}, 
	onLoad() {
		this.getMakers();
		this.getvpersonData();
	},
    methods: {
		getMakers() {
		    var data = {
		        column: "id,latitude,longitude,iconPath,callout" //需要的字段名
		    }; 
		    uni.request({
		        url: 'http://localhost:8082/jat/api/listpatient',
		        data: data,
		        success: (data) => {
		                let list = this.setTime(data.data.patientList);
		                this.markers =  list ;
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
        			            id: e.id,
        			            latitude: e.platitude,
        						longitude: e.plongitude,
								iconPath: '../../static/hch-position/virus.png',
								callout: {
									content:"患者",
									borderRadius:10,
									padding:10,
									display:"ALWAYS",
									}
        			        });
        			    });
        			    return newItems;
        			},
		getvpersonData(){
			var data = {
			    column: "id,address,time" //需要的字段名
			}; 
			uni.request({
			    url: 'http://localhost:8082/jat/api/listpatient',
			    data: data,
			    success: (data) => {
			            let list = this.setData(data.data.patientList);
			            this.vpersonData =  list ;
                        console.log(this.vpersonData);
			    },
			    fail: (data, code) => {
			        console.log('fail' + JSON.stringify(data));
			    }
			})
		},
		setData: function(items) {
		    var newItems = [];
		    items.forEach((e) => {
		        newItems.push({
		            id: e.id,
		            address: e.paddress,
					time: e.ptime
		        });
		    });
		    return newItems;
		},
    },
	    
		
	onShow() {
		
	}
}
</script>

<style lang="scss">
</style>
