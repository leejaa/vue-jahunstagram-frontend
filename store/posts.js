import { BACKEND_URL } from "../env";

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  comments: []
});

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
  addComment(state, payload) {
    state.comments.unshift(payload);
  },
  loadPosts(state, payload) {
    const diff = payload.length - state.mainPosts.length; // 아직 안 불러온 게시글 수

    if(diff <= 0){
      state.hasMorePost = false;
    }
    
    state.mainPosts = payload;

  },
  setComment(state, payload){
    state.comments = payload;
  }
};

export const actions = {
  add({ commit }, payload) {
    // 서버에 게시글 등록 요청 보냄
    
    this.$axios.post(`${BACKEND_URL}/api/post`, {
      title: payload.title,
      content: payload.content,
      image: payload.image,
    }, {
      withCredentials: true,
    })
      .then((res) => {

        commit('addMainPost', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  remove({ commit }, payload) {
    commit('removeMainPost', payload);
  },
  addComment({ commit }, payload) {
    this.$axios.post(`${BACKEND_URL}/api/post/${payload.id}/comment`, {
      content: payload.content,
      id: payload.id
    }, {
      withCredentials: true,
    })
      .then((res) => {
        commit('addComment', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  loadComment({ commit }, payload) {
    this.$axios.get(`${BACKEND_URL}/api/post/${payload.id}/comments`, {
      id: payload.id
    }, {
      withCredentials: true,
    })
      .then((res) => {
        commit('setComment', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  like({ commit }, payload) {

    if(payload.isLiked){
      this.$axios.post(`${BACKEND_URL}/api/post/${payload.id}/dislike`, {
        id: payload.id,
      }, {
        withCredentials: true,
      })
        .then((res) => {
          
        })
        .catch((err) => {
          console.error(err);
        });
    }else{
      this.$axios.post(`${BACKEND_URL}/api/post/${payload.id}/like`, {
        id: payload.id,
      }, {
        withCredentials: true,
      })
        .then((res) => {
          
        })
        .catch((err) => {
          console.error(err);
        });
    }



    
  },
  loadPosts({ commit, state }, payload) {

    console.log(`loadPost 호출...!`);

    if (state.hasMorePost) {
      
      this.$axios.get(`${BACKEND_URL}/api/posts`, {
        params: {
          limit: state.mainPosts.length + 5
        }
      }, {
        withCredentials: true,
      })
        .then((res) => {

          console.log(`res.data : ${JSON.stringify(res.data)}`);
  
          commit('loadPosts', res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  deletePost({ commit, state }, payload) {
    this.$axios.post(`${BACKEND_URL}/api/post/${payload.id}/deletePost`, {
      id: payload.id
    }, {
      withCredentials: true,
    })
      .then((res) => {

        commit('loadPosts', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
