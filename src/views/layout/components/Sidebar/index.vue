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
      <div>
        <router-link to="/welcome/index">
          <div class="logo">
            <img
              src="@/assets/images/logo.png">
            <div>开放平台</div>
          </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:18px;
  font-family:SourceHanSansCN-Medium;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:28px;
  div{
    margin-left: 8px;
  }
}
</style>
