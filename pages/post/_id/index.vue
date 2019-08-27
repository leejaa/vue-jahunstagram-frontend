<template>
  <v-container v-if="post">
	<feed :post="post" />
  </v-container>
  <div v-else>
    해당 게시글이 존재하지 않습니다.
  </div>
</template>

<script>
  import Feed from '~/components/Feed';

  export default {
    components: {
      Feed,
    },
    computed: {
      post() {
        return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10));
      },
    },
  };
</script>

<style>

</style>
