<template>
    <v-app>
        <v-container fill-height>
            <v-layout align-center justify-center>

                    <v-card width="500" height="500" class="mx-auto">
                        <v-img
                            class="white--text"
                            height="300px"
                            src="http://architect-ikeuchi.co.jp/wp/wp-content/uploads/2019/05/a494ab79f5b4ce3ba3708f9d5580d6b5.png"
                        >
                        </v-img>

                        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                            <v-text-field 
                                v-model="email"
                                :rules="emailRules"
                                label="이메일"
                                type="email"
                                required
                            >
                            </v-text-field>
                            <v-text-field 
                                v-model="password"
                                :rules="passwordRules"
                                label="비밀번호"
                                type="password"
                                required
                            >
                            </v-text-field>

                            <nuxt-link to="/join">
                                <p style="font-family:'Do Hyeon', sans-serif;font-style:italic;color:#1a73e8;text-decoration: underline;cursor:pointer;">
                                    회원이 아니신가요?
                                </p>
                            </nuxt-link>

                            <v-btn block color="secondary" dark height="55" type="submit"><div class="headline">로그인</div></v-btn>
                        </v-form>

                    </v-card>
            </v-layout>
        </v-container>
    </v-app>
</template>


<script>

  export default {
    head: {
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap' }
        ]
    },
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
      };
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/logIn', {
            email: this.email,
            password: this.password,
          });
        }
      }
    },
  };
</script>