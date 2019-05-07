<template>
  <el-menu
    class="navbar"
    mode="horizontal">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar" />
    <breadcrumb />
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Breadcrumb from '@/components/Breadcrumb/index.vue';
  import Hamburger from '@/components/Hamburger/index.vue';

  export default {
    components: {
      Breadcrumb,
      Hamburger,
    },
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters([
        'sidebar',
      ]),
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar');
      },

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 56px;
  line-height: 56px;
  border-radius: 0px !important;
  .hamburger-container {
    float: left;
    width: 56px;
    line-height: 56px;
    height: 56px;
    padding: 0 18px;
    border-right: 1px solid #dcdee0;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

}
</style>
