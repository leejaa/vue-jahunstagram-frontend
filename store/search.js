import { BACKEND_URL } from "../env";

export const state = () => ({
    searchPosts: [],
});


export const mutations = {
    searchPosts(state, payload) {
        state.searchPosts = payload;
    }
};


export const actions = {

    searchPosts({ commit, state }, payload) {
        this.$axios.get(`${BACKEND_URL}/api/hashtag`, {
            params : {
                tag : payload.searchWord
            }
        }, {
            withCredentials: true,
          })
            .then((res) => {
                commit('searchPosts', res.data);
            })
            .catch((err) => {
              console.error(err);
            });
    }
};