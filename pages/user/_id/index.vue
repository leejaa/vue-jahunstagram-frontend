
<template>
  <v-row>

    <v-col cols="12" sm="6" offset-sm="3">

        <v-row style="margin-bottom:20px;">
                <v-col cols="3">
                    <div>
                        <v-list-item-avatar color="grey" height="130" width="130" @click="$refs.file.click()">
                            <input type="file" ref="file" style="display:none;" v-on:change="onFileChange">
                            <v-img :src="user.avatar || 'http://mblogthumb2.phinf.naver.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2'">
                            </v-img>
                        </v-list-item-avatar>
                    </div>
                </v-col>

                <v-col cols="9">
                    <p style="font-family: 'Jua', sans-serif;font-size:1.5rem;margin-left:80px;">닉네임 : {{user.nickname}}</p>
                    <p style="font-family: 'Jua', sans-serif;font-size:1.5rem;margin-left:80px;">이메일 주소 : {{user.userId}}</p>
                    <p style="font-family: 'Jua', sans-serif;font-size:1.5rem;margin-left:80px;">팔로워 {{user.Followers}}   팔로잉 {{user.Followings}} </p>
                    <p style="margin-left:70px;">
                        <v-btn class="ma-2" color="primary" dark style="font-family: 'Jua', sans-serif;font-size:1rem;" width="150" 
                            v-if="user.id === me.id" @click="onLogOut">로그아웃
                        </v-btn>
                        
                        <v-btn class="ma-2" color="primary" dark style="font-family: 'Jua', sans-serif;font-size:1rem;" width="150"
                             v-if="me.Followers.findIndex(v => v.id === user.id) === -1 && user.id !== me.id">팔로우
                        </v-btn>

                        <v-btn class="ma-2" color="red" dark style="font-family: 'Jua', sans-serif;font-size:1rem;" width="150"
                             v-if="me.Followers.findIndex(v => v.id === user.id) !== -1">팔로우 취소
                        </v-btn>
                    </p>


                </v-col>
        </v-row>
        
    <v-divider></v-divider>

        <v-row style="margin-top:20px;">

          <div v-if="user.Posts"><strong>게시물이 없습니다.</strong></div>

            <v-card v-else>
                <v-container fluid>
                <v-row>
                    <v-col
                        v-for="post in user.Posts"
                        :key="post.id"
                        class="d-flex child-flex"
                        cols="4"
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
        </v-row>

    </v-col>
  </v-row>

</template>

<script>

import axios from "axios";
import { API_KEY } from '../../../env'

  export default {
    head: {
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Jua&display=swap' }
        ]
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
      user(){
        return this.$store.state.users.user;
      }
      
    },
    beforeCreate() {
        this.$store.dispatch('users/getUser', {
            id: parseInt(this.$route.params.id, 10)
        });
    },
    methods: {
      onLogOut(){
        this.$store.dispatch('users/logOut');

        this.$router.push({
          path: `/login`,
        });

      },
      async onFileChange(event){
        
            const {
              target: { files }
            } = event;

            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("api_key", API_KEY);
            formData.append("upload_preset", "nuber-20190814");
            formData.append("timestamp", String(Date.now() / 1000));
            const {
            data: { secure_url }
            } = await axios.post(
                "https://api.cloudinary.com/v1_1/dbqgymmrx/image/upload",
                formData
            );

        this.$store.dispatch('users/editUser', {
          avatar: secure_url
        });

      },
      changeAvatar(){
        document.getElementById("fileId").click;
      }
    },
    middleware: 'authenticated',
  };
</script>