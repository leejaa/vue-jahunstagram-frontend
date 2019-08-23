<template>
		<v-container fill-height>
			<v-layout>
                    <v-card
                            width="500" height="400"
                            class="mx-auto"
                        >
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-img src="https://i.pinimg.com/originals/60/00/35/600035c0e351085fced5e3473da3a147.jpg"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="headline">제목입니다</v-list-item-title>
                                <v-list-item-subtitle>글쓴이</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-img
                                src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                                height="194"
                            ></v-img>
                        <v-card-text>
                                내용입니다
                            </v-card-text>
                        <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn icon text color="red">
                                <v-icon>mdi-heart-outline</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-send</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
			</v-layout>
		</v-container>
</template>




<script>
  import Feed from '~/components/Feed';

  export default {
    components: {
      Feed
    },
    data() {
      return {
        name: 'Nuxt.js',
      };
    },
//    middleware: 'authenticated'
  };
</script>