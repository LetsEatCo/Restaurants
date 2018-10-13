import Vue from 'vue';
import {AUTH_LOGOUT} from '../actions/auth.actions';
import {
	STORE_PROFILE_REQUEST,
	STORE_PROFILE_REQUEST_ERROR,
	STORE_PROFILE_REQUEST_SUCCESS,
	STORE_CREATE_KIOSK
} from '../actions/store.actions';

const state = {
	status: '',
	jwt: '',
	profile: {}};

const getters = {
	isAuthenticated: state => !!state.jwt,
	getProfile: state => state.profile,
	isProfileLoaded: state => !!state.profile.name
};

const actions = {
	[STORE_PROFILE_REQUEST]: function ({commit, dispatch}, jwt) {
		commit(STORE_PROFILE_REQUEST, jwt);
		this.$axios.$get('http://localhost/stores/me')
			.then(res => {
				commit(STORE_PROFILE_REQUEST_SUCCESS, res);
				this.$router.push('/dashboard');
			})
			.catch(err => {
				commit(STORE_PROFILE_REQUEST_ERROR);
				dispatch(AUTH_LOGOUT);
			});
	},
	[STORE_CREATE_KIOSK]: function ({commit,state}, payload) {

		commit(STORE_CREATE_KIOSK, payload);

		const headers = {
			headers: {
				Authorization: "Bearer " + state.jwt,
			}
		};

		this.$axios.$post('http://localhost/stores/me/kiosks', payload, headers)
			.then(res => res)
			.catch(err => err);

	}
};

const mutations = {
	[STORE_PROFILE_REQUEST]: (state, jwt) => {
		state.status = 'loading';
		Vue.set(state, 'jwt', jwt);
	},
	[STORE_PROFILE_REQUEST_SUCCESS]: (state, res) => {
		state.status = 'success';
		Vue.set(state, 'profile', res.data);
	},
	[AUTH_LOGOUT]: state => {
		state.profile = {};
	},
	[STORE_CREATE_KIOSK]: (state, payload) => {

		// console.log(payload + ' jwt ' + state.jwt);

	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
