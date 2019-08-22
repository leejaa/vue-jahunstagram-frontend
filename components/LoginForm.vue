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

                        <form>
                            <v-text-field v-model="name" label="아이디">
                            </v-text-field>
                            <v-text-field label="비밀번호">

                            </v-text-field>

                            <v-btn block color="secondary" dark height="55"><div class="headline">로그인</div></v-btn>
                        </form>

                    </v-card>
            </v-layout>
        </v-container>
    </v-app>
</template>