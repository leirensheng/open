<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item,index) in levelList"
        :key="item.path">
        <span
          v-if="item.redirect==='noredirect'||index==levelList.length-1"
          class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a
          v-else
          @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import { mapGetters } from 'vuex';
  import pathToRegexp from 'path-to-regexp';

  export default {
    data() {
      return {
        levelList: null,
      };
    },
    computed: {
      ...mapGetters([
        'hasUserRoute',
      ]),
      firstMatch() {
        const isAdmin = !this.hasUserRoute;
        return { path: '/welcome/index', meta: { title: isAdmin ? '管理中心' : '用户中心' } };
      },
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      },
    },
    created() {
      this.getBreadcrumb();
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name);
        const first = matched[0];
        if (first && first.name !== 'welcome/index') {
          matched = [this.firstMatch, ...matched];
        }
        const levelListFilter = v => v.meta && v.meta.title && v.meta.breadcrumb !== false;

        this.levelList = matched.filter(levelListFilter);
      },
      pathCompile(path) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route;
        const toPath = pathToRegexp.compile(path);
        return toPath(params);
      },
      handleLink(item) {
        const { redirect, path } = item;
        if (redirect) {
          this.$router.push(redirect);
          return;
        }
        this.$router.push(this.pathCompile(path));
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
