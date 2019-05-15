<template>
  <div class="container">
    <div class="left">
      <div class="top">
        <img
          :src="menuImg"
          alt="">
        <span
          v-show="!inputShow"
          class="mulu">
          目录
        </span>

        <span class="icon-or-input">
          <i
            v-show="!inputShow"
            class="el-icon-search"
            @click="inputShow=!inputShow" />
          <el-input
            v-show="inputShow"
            v-model="keyword"
            class="icon-input"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            @keyup.native.enter="search"
            @blur="inputShow=!inputShow" />
        </span>
      </div>

      <div
        v-if="loading"
        v-loading="loading"
        class="loading" />
      <!-- 因为每次查询完菜单，重新设置 default-active不会生效，所以需要重新渲染 -->
      <el-menu
        v-if="!loading"
        text-color="#6F6F6F"
        active-text-color="#fff"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @select="handleSelect">
        <el-submenu
          v-for="one in tree"
          :key="one.id"
          :index="one.id+''">
          <template slot="title">
            <span>{{ one.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="item in one.documentDTOList"
              :key="item.id"
              :index="item.id+''">
              {{ item.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right">
      <div class="right-top">
        {{ docData.title }}
      </div>
      <div
        v-loading="docData.loading"
        class="content"
        v-html="docData.content" />
    </div>
  </div>
</template>
<script>
  import menuImg from '@/assets/images/menu.png';
  import { search, docView } from '@/api/document';

  export default {
    data() {
      return {
        menuImg,
        defaultActive: '',
        inputShow: false,
        tree: [],
        keyword: '',
        curDocId: '',
        loading: false,
        docData: {
          title: '',
          content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,
        },

      };
    },
    watch: {
      curDocId() {
        this.docData.content = '';
        this.docData.title = '';
        this.docData.loading = true;
        docView({ id: this.curDocId }).then(({ model: { name, content } }) => {
          this.docData.content = content;
          this.docData.title = name;
          this.docData.loading = false;
        }).catch(e => {
          console.log(e);
          this.docData.loading = false;
        });
      },

    },
    mounted() {
      this.search();
    },
    methods: {
      handleSelect(key, path) {
        if (path.length == 2) {
          this.curDocId = key;
        }
      },
      search() {
        this.loading = true;
        this.docData.title = '';
        this.docData.content = '';
        search({ name: this.keyword }).then(({ model }) => {
          this.tree = model;
          if (this.tree.length) {
            const docList = this.tree[0].documentDTOList;
            if (docList && docList.length) {
              this.defaultActive = `${docList[0].id}`;
              this.curDocId = docList[0].id;
            }
          }
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
 .container{
   .el-menu-item.is-active{
     background-color: #CBCBCB;
   }
   display: flex;
   .left{
     flex: 0 0 270px;
    .top{
      // display: flex;
      // justify-content: space-between;
      background-color: #CBCBCB;
      height: 72px;
      align-items: center;
      padding-right: 22px;
      font-size:22px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(254,255,255,1);
      line-height:72px;
      .mulu{
        display: inline-block;
        margin-left: 20px;
      }
      img{
        height: 72px;
        float: left;
      }
     .icon-or-input{
       float: right;
        .icon-input{
          width: 140px;
          color: black;
        }
     }
    }
    .loading{
      min-height: calc(100vh - 72px - 86px);
    }
   }
   .right{
      flex:1;
      .right-top{
        padding-left:20px;
        height: 72px;
        color:#303133;
        font-size:22px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        line-height: 28px;
        background-color: #EAEAEA;
        display: flex;
        align-items: center;
      }
      .content{
        padding: 20px;
        min-height: 300px;
      }
   }
 }

</style>
