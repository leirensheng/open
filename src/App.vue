

<template>
  <div>
    <Top-Menu />
    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<script>
  import TopMenu from '@/views/topMenu/TopMenu.vue';

  export default {
    name: 'App',
    components: {
      TopMenu,
    },

  };
</script>
