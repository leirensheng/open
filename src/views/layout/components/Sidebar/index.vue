<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical">
      <div class="logo">
        <router-link to="/welcome">
          <span>天戟ERP开放平台</span>
        </router-link>
      </div>
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex';
  import variables from '@/styles/variables.scss';
  import SidebarItem from './SidebarItem.vue';

  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar',
        'routes',
      ]),

      variables() {
        return variables;
      },
      isCollapse() {
        return !this.sidebar.opened;
      },
    },
  };
</script>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
  height: 56px;
  background-color: #2E82FF;
  padding: 15px 18px;
  color:white;
  font-size: 16px;
  line-height: 28px;
  font-family:HYk1gj;
  font-weight:bold;

}
</style>
