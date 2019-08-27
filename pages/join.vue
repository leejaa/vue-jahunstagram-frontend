<template>
    <v-app>
        <v-container fill-height>
            <v-layout align-center justify-center>

                    <v-card width="500" height="600" class="mx-auto">
                        <v-img
                            class="white--text"
                            height="300px"
                            src="http://architect-ikeuchi.co.jp/wp/wp-content/uploads/2019/05/a494ab79f5b4ce3ba3708f9d5580d6b5.png"
                        >
                        </v-img>

                        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                            <v-text-field 
                                label="이메일"
                                v-model="userId"
                                type="email"
                                :rules="emailRules"
                                required
                            >
                            </v-text-field>
                            <v-text-field 
                                v-model="nickname"
                                label="닉네임"
                                type="nickname"
                                :rules="nicknameRules"
                                required
                            >
                            </v-text-field>
                            <v-text-field 
                                v-model="password"
                                label="비밀번호"
                                type="password"
                                :rules="passwordRules"
                                required
                            >
                            </v-text-field>
                            <v-text-field 
                                v-model="passwordCheck"
                                label="비밀번호확인"
                                type="password"
                                :rules="passwordCheckRules"
                                required
                            >
                            </v-text-field>

                            <v-btn block color="secondary" dark height="55" type="submit"><div class="headline">회원가입</div></v-btn>
                        </v-form>

                    </v-card>
            </v-layout>
        </v-container>
    </v-app>
</template>


<script>

  export default {
    head: {
        
    },
    components: {
    },
    data() {
      return {
        valid: false,
        userId: '',
        password: '',
        passwordCheck: '',
        nickname: '',
        terms: false,
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        nicknameRules: [
          v => !!v || '닉네임은 필수입니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
        passwordCheckRules: [
          v => !!v || '비밀번호 확인은 필수입니다.',
          v => v === this.password || '비밀번호가 일치하지 않습니다.',
        ],
      };
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      }
    },
    watch: {
      me(value) {
        if (value) {
          this.$router.push({
            path: '/',
          });
        }
      }
    },
    methods: {
      onSubmitForm() {

        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/signUp', {
            nickname: this.nickname,
            userId: this.userId,
            password: this.password,
          })
            .then(() => {
              this.$router.push({
                path: '/login',
              });
            })
            .catch(() => {
              alert('회원가입 실패');
            });
        }
      }
    },
  };
</script>