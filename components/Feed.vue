<template>
		<v-container fill-height>
			<v-layout>
                    <v-card
                            width="500" height="400"
                            class="mx-auto"
                        >
                        <v-list-item>
                          <nuxt-link :to="`/user/${post.User.id}`">
                            <v-list-item-avatar>
                                <v-img :src="post.User.avatar"></v-img>
                            </v-list-item-avatar>
                          </nuxt-link>
                            <v-list-item-content>
                                <v-list-item-title class="headline">{{post.title}}</v-list-item-title>
                                <v-list-item-subtitle>{{post.User.nickname}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-img
                                :src="post.Images[0] && post.Images[0].src"
                                height="194"
                            ></v-img>
                            <v-card-text>
                                {{post.content}}
                            </v-card-text>
                        <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn icon text color="red" @click="fnLike">
                                <v-icon>{{isLiked ? "mdi-heart-outline" : "mdi-heart"}}</v-icon>
                            </v-btn>

                          <v-dialog v-model="dialog" scrollable max-width="600px" max-height="400px">
                            <template v-slot:activator="{ on }">
                              <v-btn icon v-on:click="openComments">
                                  <v-icon>mdi-message-text-outline</v-icon>
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-title>댓글창</v-card-title>
                              <v-divider></v-divider>

                              <v-list-item v-for="comment in comments" :key="comment.id">
                                <v-list-item-avatar>
                                  <v-img :src="comment.User.avatar"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-list-item-title style="font-family: 'Nanum Pen Script', cursive;font-size:2rem;"><strong>{{comment.content}}</strong></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-icon style="font-family: 'Nanum Pen Script', cursive;font-size:1rem;">
                                  {{comment.createdAt}}
                                </v-list-item-icon>
                              </v-list-item>

                              <v-divider></v-divider>


                              <v-list-item>
                                <v-list-item-avatar>
                                  <v-img :src="me.avatar && me.avatar"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-text-field
                                    label="댓글을 입력해주세요"
                                    single-line
                                    v-model="comment"
                                    v-on:keyup.13="submitComment"
                                  ></v-text-field>
                                </v-list-item-content>

                              </v-list-item>




                              
                              <v-divider></v-divider>
                              <v-card-actions>
                                <v-btn color="blue darken-1" text @click="dialog = false">취소</v-btn>
                                <v-btn color="blue darken-1" text v-on:click="submitComment">등록</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>

                            <v-btn icon v-if="post.User.id === me.id" @click="deletePost">
                                <v-icon>mdi-trash-can</v-icon>
                            </v-btn>
                        </v-card-actions>

                    </v-card>
			</v-layout>
		</v-container>
</template>




<script>
import { mapState } from 'vuex';

  export default {
    head: {
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nanum+Pen+Script&display=swap' }
        ]
    },
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
    components: {
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      comments() {
        return this.$store.state.posts.comments;
      }
    },
    data() {

      return {
        name: 'Nuxt.js',
        isLiked: this.post.Likers.findIndex(liker => liker.id === this.$store.state.users.me.id) === -1,
        dialogm1: '',
        dialog: false,
        comment: ''
      };
    },
    methods: {
      fnLike(){

        this.isLiked = !this.isLiked;

        this.$store.dispatch('posts/like', {
          id: this.post.id,
          isLiked: this.isLiked
        });
      },
      async submitComment(value){

        if(this.comment !== ''){
          await this.$store.dispatch('posts/addComment', {
            content: this.comment,
            id: this.post.id,
            User: {
              id: this.$store.state.users.me.id,
              avatar: this.$store.state.users.me.avatar
            }
          });
        }

        this.comment = '';

      },
      async openComments(){
        
          await this.$store.dispatch('posts/loadComment', {
            content: this.comment,
            id: this.post.id,
          });

        this.dialog = true;
      },
      deletePost(){
          this.$store.dispatch('posts/deletePost', {
            id: this.post.id,
          });
      }
    }
//    middleware: 'authenticated'
  };
</script>