<template>
  <div
    v-show="isShow"
    class="tags-view__wrap">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.title }}
        <span
          v-if="visitedViews.length > 1"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{left:left+'px',top:top+'px'}"
      class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        刷新
      </li>
      <li @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">
        关闭其他
      </li>
      <li @click="closeAllTags">
        关闭全部
      </li>
    </ul>
  </div>
</template>

<script>
  import ScrollPane from '@/components/ScrollPane/ScrollPane.vue';
  // import { generateTitle } from '@/utils/i18n'

  export default {
    inject: ['reload'],
    components: { ScrollPane },
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {},
      };
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews;
      },
      isShow() {
        return !['/doc/index', '/welcome/index'].includes(this.$route.path);
      },
    },
    watch: {
      $route() {
        this.addViewTags();
        this.moveToCurrentTag();
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu);
        } else {
          document.body.removeEventListener('click', this.closeMenu);
        }
      },
    },
    mounted() {
      this.addViewTags();
    },
    methods: {
      isActive(route) {
        return route.path === this.$route.path;
      },
      addViewTags() {
        const { name } = this.$route;
        if (name) {
          this.$store.dispatch('addView', this.$route);
        }
        return false;
      },
      moveToCurrentTag() {
        this.$nextTick(() => {
          const tags = this.$refs.tag;
          if (tags) {
            for (let i = 0; i < tags.length; i += 1) {
              const tag = tags[i];
              if (tag.to.path === this.$route.path) {
                this.$refs.scrollPane.moveToTarget(tag);
                // when query is different then update
                if (tag.to.fullPath !== this.$route.fullPath) {
                  this.$store.dispatch('updateVisitedView', this.$route);
                }
                break;
              }
            }
          }
        });
      },
      refreshSelectedTag(view) {
        this.$store.dispatch('delCachedView', view).then(() => {
          const targetFullPath = view.fullPath;
          const currentFullPath = this.$route.fullPath;
          if (targetFullPath === currentFullPath) {
            this.reload();
            return;
          }
          this.$router.replace({
            path: targetFullPath,
          });
        });
      },
      closeSelectedTag(view) {
        this.$store.dispatch('delView', view).then(({ visitedViews }) => {
          if (this.isActive(view)) {
            const latestView = visitedViews.slice(-1)[0];
            if (latestView) {
              this.$router.push(latestView);
            } else {
              this.$router.push('/');
            }
          }
        });
      },
      closeOthersTags() {
        this.$router.push(this.selectedTag);
        this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
          this.moveToCurrentTag();
        });
      },
      closeAllTags() {
        this.$store.dispatch('delAllViews');
        this.$router.push('/');
      },
      openMenu(tag, e) {
        const menuMinWidth = 105;
        const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
        const { offsetWidth } = this.$el; // container width
        const maxLeft = offsetWidth - menuMinWidth; // left boundary
        const left = e.clientX - offsetLeft + 15; // 15: margin right

        if (left > maxLeft) {
          this.left = maxLeft;
        } else {
          this.left = left;
        }
        this.top = e.clientY;

        this.visible = true;
        this.selectedTag = tag;
      },
      closeMenu() {
        this.visible = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
.tags-view__wrap {
  height: 39px;
  width: 100%;
  background: #fff;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 32px;
      line-height: 32px;
      border: 1px solid #d8dce5;
      border-bottom: unset;
      color: #909399;
      background: #eff1f4;
      padding: 0 10px;
      font-size: 12px;
      margin-left: -1px;
      margin-top: 9px;
      &:first-of-type {
        margin-left: 20px;
      }
      &:last-of-type {
        margin-right: 20px;
      }
      &.active {
        position: relative;
        background-color: #ffffff;
        color: #2e82ff;
        &::before {
          content: "";
          background: #2e82ff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
        &::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          height: 2px;
          background-color: #ffffff;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view__wrap {
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
  .el-scrollbar__view {
    border-bottom: 1px solid #dcdee0;
  }
}
</style>
