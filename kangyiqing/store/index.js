import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		phone:'',
		userInfo: {}
	},
	mutations: {
		adduser(state,provider){
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({
				key: 'userInfo',
				data: provider
			})
			console.log(state.userInfo);
		},
		login(state, phone) {
			state.phone = phone;
			state.hasLogin = true;
			uni.setStorage({
				key: 'phone',
				data: phone
			})
			console.log(state.phone);
		},
		logout(state) {
			state.userInfo = {};
			state.phone = '';
			state.hasLogin = false;
			uni.removeStorage({
				key: 'userInfo',
				key: 'phone',
			})
		}
	}
})

export default store
