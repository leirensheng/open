

<template>
  <div id="top-menu">
    <div class="logo">
      <img
        src="@/assets/images/btr.png"
        alt="">
    </div>
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
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span
              style="display:block;"
              @click="logout">
              LogOut
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
    name: 'App',
    data() {
      return {
        publicPath: process.env.BASE_URL,
        menus: [{ name: '首页', url: '/', active: () => this.$route.path === '/' },
                { name: 'API文档', url: '/doc', active: () => this.$route.path == '/doc' },
                { name: '用户中心', url: '/welcome/index', active: () => !['/', '/login', '/404'].includes(this.$route.path) },
                { name: '管理中心', url: '/welcome/index', active: () => !['/', '/login', '/404'].includes(this.$route.path) }],
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
     background-color: #212636;
     height: 86px;
     color:white;
     position: fixed;
     top:0;
     right:0;
     left:0;
     display: flex;
     align-items: center;
     justify-content: space-between;
     .logo{
       margin-left:30px;
       width: 140px;
       flex:0 0 auto;
     }
     .menu{
        display: flex;
        flex:0 1 1400px;
        .one-menu{
          font-family:MicrosoftYaHei;
          font-size: 18px;
          width: 143px;
          cursor: pointer;
          &.active{
            color:#02B588;
          }
        }
     }
     .right{
       padding-right: 12px;
       display: flex;
       align-items: center;
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
              width:31px;
              height:15px;
              font-size:16px;
              font-family:MicrosoftYaHeiLight;
              font-weight:300;
              color:rgba(255,255,255,1);
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
