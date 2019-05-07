<template>
  <div>
    <router-link :to="'welcome'">
      <div
        class="img"
        :style="{backgroundImage: 'url(' + pic + ')' }" />
    </router-link>
  </div>
</template>
<script>
  import pic from '@/assets/images/home.png';

  export default {
    data() {
      return {
        pic,
      };
    },
    
  };
</script>
<style lang="scss" scoped>
  .img{
        width: 100%;
        height: calc(100vh - 86px);
    }

</style>
