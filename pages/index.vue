<template>
    <feeds/>
</template>






<script>
  import LoginForm from '~/components/LoginForm';
  import Feeds from '~/components/Feeds';

  export default {
    components: {
      LoginForm,
      Feeds
    },
    data() {
      return {
        name: 'Nuxt.js',
      };
    }
  };
</script>