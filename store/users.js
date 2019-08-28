import Cookies from 'js-cookie';
import { BACKEND_URL } from "../env";

export const state = () => ({
    me: null,
    allUsers: [],
    user: {}
  });


export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  allUsers(state, payload) {
    state.allUsers = payload;
  },
  getUser(state, payload) {
    state.user = payload;
  },
  editUser(state, payload) {
    state.user.avatar = payload;
  },
  follow(state, payload) {
    state.me.Followings.push(payload);
    state.user.Followers = state.user.Followers + 1;
  },
  unfollow(state, payload) {
    const index = state.me.Followings.findIndex(v => v.id === payload);
    state.me.Followings.splice(index, 1);

    state.user.Followers = state.user.Followers - 1;

  }
};


export const actions = {

  async signUp({ commit, state }, payload) {
    const result = await this.$axios.post(`${BACKEND_URL}/api/user`, {
      userId: payload.userId,
      nickname: payload.nickname,
      password: payload.password,
    }, {
      withCredentials: true,
    });

    const { status } = result;

    if(status === 200){
      commit('setMe', result.data);
    }
  },
  logIn({ commit }, payload) {
    this.$axios.post(`${BACKEND_URL}/api/user/login`, {
      userId: payload.email,
      password: payload.password,
    }, {
      withCredentials: true,
    })
      .then((res) => {

        commit('setMe', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  loadUser({ commit }, payload) {

    this.$axios.get(`${BACKEND_URL}/api/user`, {
      withCredentials: true,
    })
      .then((res) => {
        commit('setMe', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  allUsers({ commit }, payload) {

    this.$axios.get(`${BACKEND_URL}/api/users`, {
      withCredentials: true,
    })
      .then((res) => {
        commit('allUsers', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  getUser({ commit }, payload) {
    this.$axios.get(`${BACKEND_URL}/api/user/${payload.id}`, {
      withCredentials: true,
    })
      .then((res) => {

        console.log(`res.data : ${JSON.stringify(res.data)}`);

        commit('getUser', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  editUser({ commit }, payload) {
    this.$axios.post(`${BACKEND_URL}/api/user/avatar`,{
      avatar: payload.avatar
    }, {
      withCredentials: true,
    })
      .then((res) => {

        console.log(`res.data : ${JSON.stringify(res.data)}`);

        commit('editUser', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  logOut({ commit }) {
    this.$axios.post(`${BACKEND_URL}/api/user/logout`, {}, {
      withCredentials: true,
    })
      .then((data) => {
        commit('setMe', null);
      })
      .catch((err) => {
        console.error(err);
      });

  },
  follow({ commit }, payload) {
    this.$axios.post(`${BACKEND_URL}/api/user/${payload.id}/follow`,{
      id: payload.id
    }, {
      withCredentials: true,
    })
      .then((res) => {

        console.log(`res.data : ${JSON.stringify(res.data)}`);

        commit('follow', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  unfollow({ commit }, payload) {
    this.$axios.post(`${BACKEND_URL}/api/user/${payload.id}/unfollow`,{
      id: payload.id
    }, {
      withCredentials: true,
    })
      .then((res) => {

        console.log(`res.data : ${JSON.stringify(res.data)}`);

        commit('unfollow', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
};