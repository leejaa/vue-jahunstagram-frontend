<template>
    <v-app>
        <v-toolbar height="60" color="white" flat>
            <v-btn icon text color="black" to="/">
                <v-icon large>mdi-instagram</v-icon>
            </v-btn>
            <div class="flex-grow-1"></div>
            <v-btn icon text color="black" @click="isWrite = true">
                <v-icon large>mdi-pencil</v-icon>
            </v-btn>
                <v-btn icon text color="black" to="/search">
                    <v-icon large>mdi-radius-outline</v-icon>
                </v-btn>
            <v-btn icon text color="black" :to="`/user/${me && me.id}`">
                <v-icon large>mdi-account</v-icon>
            </v-btn>
        </v-toolbar>
        <v-dialog v-model="isWrite" max-width="700">
            <write-form v-on:changeIsWrite="changeIsWrite"></write-form>
        </v-dialog>
        <nuxt />
    </v-app>
</template>
<script>
    import { mapState } from 'vuex';
    import WriteForm from "~/components/WriteForm";

    export default {
        components: {
            WriteForm
        },
        data() {
            return {
                name: 'Nuxt.js',
                isWrite: false
            };
        },
        computed: {
             ...mapState('users', ['me']),
        },
        beforeCreate() {
            this.$store.dispatch('users/loadUser');
        },
        methods: {
            changeIsWrite(arg){

                this.isWrite = arg;
            }
        }
    };
</script>