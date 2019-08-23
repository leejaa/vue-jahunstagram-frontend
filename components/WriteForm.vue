<template>
    <v-card
            class="mx-auto"
            height="700"
        >


    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">포스트 작성</v-list-item-title>
        <v-list-item-subtitle>글쓴이</v-list-item-subtitle>
      </v-list-item-content>
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
                        >
                            <template v-slot:selection="{ index, text }">
                            <v-chip
                                v-if="index < 2"
                                color="deep-purple accent-4"
                                dark
                                label
                                small
                            >
                                {{ text }}
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
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>


        
    </v-card>
</template>




<script>

  export default {
    components: {
    },
    data() {
      return {
        name: 'Nuxt.js',
        files: [],
        selected: ['Trevor Handsen'],
        items: ['Trevor Handsen', 'Alex Nelson'],
        title: 'Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa'
      };
    },
//    middleware: 'authenticated'
  };
</script>