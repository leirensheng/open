

<template>
  <div id="top-menu">
    <div class="menu">
      <div
        v-for="item in menusShow"
        :key="item.url"
        :class="item.active()?'active':''"
        class="one-menu">
        <router-link :to="item.url">
          {{ item.name }}
        </router-link>
      </div>
    </div>
    <div class="right">
      <div
        v-if="!name"
        class="no-login">
        <router-link to="/login">
          <img
            src="@/assets/images/user.png"
            class="user-avatar">
          <span class="user-name">
            登录
          </span>
        </router-link>
      </div>
      <el-dropdown
        v-else
        class="avatar-container"
        trigger="click">
        <div class="avatar-wrapper">
          <img
            src="@/assets/images/user.png"
            class="user-avatar">
          <span class="user-name">
            {{ name }}
          </span>
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="user-dropdown">
          <router-link
            class="inlineBlock"
            to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span
              style="display:block;"
              @click="logout">
              退出
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'TopMenu',
    data() {
      return {
        publicPath: process.env.BASE_URL,
        menus: [
          { name: 'API文档', url: '/doc/index', active: () => this.$route.path == '/doc/index' },
          { name: '用户中心', url: '/welcome/index', active: () => !['/', '/login/index', '/404', '/doc/index'].includes(this.$route.path) },
          { name: '管理中心', url: '/welcome/index', active: () => !['/', '/login/index', '/404', '/doc/index'].includes(this.$route.path) }],
      };
    },
    computed: {
      ...mapGetters([
        'avatar',
        'name',
        'hasUserRoute',
      ]),

      menusShow() {
        if (this.name) {
          if (this.hasUserRoute) {
            return this.menus.filter(one => one.name !== '管理中心');
          }
          return this.menus.filter(one => one.name !== '用户中心');
        }
        return this.menus.filter(one => !['管理中心', '用户中心'].includes(one.name));
      },

    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut');
      },
    },
  };
</script>
<style lang="scss" scoped>
   #top-menu{
     z-index: 1001;
     height: 56px;
    //  color:white;
    //  position: fixed;
    //  top:0;
    //  right:0;
    //  left:0;
     display: flex;
     align-items: center;
     justify-content: space-between;

     .menu{
        display: flex;
        flex:0 1 1400px;
        .one-menu{
          font-family:MicrosoftYaHei;
          font-size: 18px;
          width: 80px;
          margin: 0 20px;
          text-align: center;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          &.active{
            color:#2E82FF;
            border-bottom: 2px solid #2E82FF;
          }
        }
     }
     .right{
       padding-right: 12px;
       display: flex;
       align-items: center;
       color: #2E82FF;
        .no-login{
          width: 60px;
          cursor: pointer;
          .user-avatar{
             top:3px;
             position: relative;
          }
        }
        .avatar-container {
          display: inline-block;
          position: absolute;
          right: 35px;
          .avatar-wrapper {
            cursor: pointer;
            position: relative;
            line-height: initial;
            .user-avatar{
              top:3px;
              position: relative;
            }
            .user-name {
              font-size:16px;
              font-family:MicrosoftYaHeiLight;
              font-weight:300;
              color:rgba(0,0,0,1);
              line-height:28px;
            }
            .el-icon-caret-bottom {
              position: absolute;
              right: -20px;
              top: 5px;
              font-size: 12px;
            }
          }
        }
     }
   }
</style>
