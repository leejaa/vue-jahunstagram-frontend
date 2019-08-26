<template>
    <v-card
            class="mx-auto"
            height="700"
        >


    <v-list-item>
      <v-list-item-avatar color="grey"><v-img :src="me.avatar || 'http://mblogthumb2.phinf.naver.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2'"></v-img></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">포스트 작성</v-list-item-title>
        <v-list-item-subtitle>{{me.nickname}}</v-list-item-subtitle>
      </v-list-item-content>
       <v-btn class="ma-2" outlined color="indigo" @click="onSubmitForm">글 등록</v-btn>
    </v-list-item>

        <v-row>
            <v-col cols="12">

                <v-row 
                    justify="center"
                >

                    <v-col cols="10">

                        <v-file-input
                            v-model="files"
                            color="deep-purple accent-4"
                            counter
                            label="File input"
                            multiple
                            placeholder="사진을 업로드 해주세요"
                            prepend-icon="mdi-paperclip"
                            outlined
                            :display-size="1000"
                            type="file"
                            @change="onFileChange"
                            accept="image/*"
                        >
                            <template v-slot:selection="{ index, text }">
                            <v-chip
                                v-if="index < 2"
                                color="deep-purple accent-4"
                                dark
                                label
                                small
                            >
                                {{ text || "" }}
                            </v-chip>

                            <span
                                v-else-if="index === 2"
                                class="overline grey--text text--darken-3 mx-2"
                            >
                                +{{ files.length - 2 }} File(s)
                            </span>
                            </template>
                        </v-file-input>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row
            align="center"
        >
            <v-col cols="12">
                <v-row 
                    justify="center"
                >
                    <v-col cols="6">
                        <v-textarea
                            label="제목"
                            auto-grow
                            outlined
                            rows="1"
                            row-height="15"
                            name="title"
                            v-model="title"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row
            align="center"
        >
            <v-col cols="12">
                <v-row 
                    justify="center"
                >
                    <v-col cols="10">
                       <v-textarea
                            filled
                            auto-grow
                            label="내용"
                            rows="4"
                            row-height="60"
                            shaped
                            v-model="content"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </v-card>
</template>




<script>

import { mapState } from 'vuex';
import { API_KEY } from '../env'
import axios from 'axios';

  export default {
    components: {
    },
    data() {
      return {
        name: 'Nuxt.js',
        files: [],
        fileUrl: '',
        title: '',
        content: ''
      };
    },
    computed: {
        ...mapState('users', ['me']),
    },
    methods: {
        async onFileChange(file){

            console.log(file[0]);

            if(file){
                const formData = new FormData();
                formData.append("file", file[0]);
                formData.append("api_key", API_KEY);
                formData.append("upload_preset", "nuber-20190814");
                formData.append("timestamp", String(Date.now() / 1000));
                const {
                data: { secure_url }
                } = await axios.post(
                    "https://api.cloudinary.com/v1_1/dbqgymmrx/image/upload",
                    formData
                );
                if (secure_url) {
                    this.fileUrl = secure_url;
                }
            }
        },
        onTextChange(event){
            console.log(event);
        },
        onSubmitForm(){
          this.$store.dispatch('posts/add', {
            title: this.title,
            content: this.content,
            image: this.fileUrl
          });

          this.title = '';
          this.content = '';
          this.image = '';
          this.files = [];

          this.$emit('changeIsWrite', false);

        }
    }
//    middleware: 'authenticated'
  };
</script>