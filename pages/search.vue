
<template>
  <v-row>

    <v-col cols="12" sm="6" offset-sm="3">

        <v-text-field
            label="검색단어를 입력해주세요"
            v-model="searchWord"
            v-on:keyup.13="submitSearch"
        ></v-text-field>


    <v-slide-group
      v-model="model"
      class="pa-4"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="user in allUsers"
        :key="user.id"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          height="100"
          width="100"
          @click="toggle"
          elevation="0"
            :to="`/user/${user.id}`"
        >
          <v-layout
            align-center
            fill-height
            justify-center
          >
            <v-scale-transition>
                <v-list-item-avatar color="grey" height="80" width="80">
                    <v-img :src="user.avatar || 'http://mblogthumb2.phinf.naver.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2'">
                    </v-img>
                </v-list-item-avatar>
            </v-scale-transition>
          </v-layout>
        </v-card>
      </v-slide-item>
    </v-slide-group>


      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="post in searchPosts"
              :key="post.id"
              class="d-flex child-flex"
              cols="2"
            >
              <v-card flat tile class="d-flex" :to="`/post/${post.id}`">
                <v-img
                  :src="post.Images[0].src"
                  :lazy-src="post.Images[0].src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>

                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>

  export default {
    head: {
        
    },
    data() {
      return {
        model: null,
        searchWord: ""
      };
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      searchPosts(){
          return this.$store.state.search.searchPosts;
      },
      allUsers(){
          return this.$store.state.users.allUsers;
      }
    },
    beforeCreate() {
        this.$store.dispatch('users/allUsers');
        this.$store.dispatch('search/searchPosts', {
            searchWord: null
        });
    },
    methods: {
      submitSearch(){

          if(this.searchWord !== ""){
              this.$store.dispatch('search/searchPosts', {
                  searchWord: this.searchWord
              });

          }

      }
    },
    middleware: 'authenticated',
  };
</script>