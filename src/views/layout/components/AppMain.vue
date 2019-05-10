<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view
          v-if="isRouterAlive"
          :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    data() {
      return {
        isRouterAlive: true,
      };
    },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews;
      },
      key() {
        return this.$route.fullPath;
      },
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
      },
    },
  };
</script>

<style scoped>
.app-main {
  /*56 = navbar  */
  /*50 = TagsView  */
  min-height: calc(100vh - 56px - 42px - 86px);
  position: relative;
  overflow: hidden;
  padding: 6px;
}
</style>
