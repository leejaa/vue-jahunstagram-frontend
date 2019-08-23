import { BACKEND_URL } from "../env";

export const state = () => ({
    me: null,
    followerList: [],
    followingList: [],
    hasMoreFollower: true,
    hasMoreFollowing: true,
  });


export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  }
};


export const actions = {
  async signUp({ commit, state }, payload) {
    const result = await this.$axios.post(`${BACKEND_URL}/api/user`, {
      userId: payload.userId,
      nickname: payload.nickname,
      password: payload.password,
    });

    const { status } = result;

    if(status === 200){
      commit('setMe', payload);
    }
  },
  logIn({ commit }, payload) {
    commit('setMe', payload);
  },
};