<template>
  <div class="container">
    <div class="left">
      <div class="top">
        <span
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
  import { search, docView } from '@/api/document';

  export default {
    data() {
      return {
        defaultActive: '',
        inputShow: false,
        tree: [],
        keyword: '',
        curDocId: '',
        loading: false,
        docData: {
          title: '',
          content: '',
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
   z-index: 1002;
   position: fixed;
   background-color: white;
   min-height: calc(100vh - 56px);
   top:56px;
   left:0;
   right:0;
   padding: 42px 110px;
   .el-menu-item.is-active{
     background-color: #CBCBCB;
   }
   display: flex;
   .left{
     flex: 0 0 270px;
    box-shadow:0px 1px 10px 0px rgba(0, 0, 0, 0.06);
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
      line-height:72px;
      .mulu{
        display: inline-block;
        margin-left: 20px;
        font-size:18px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(96,98,102,1);
        line-height:28px;
      }

     .icon-or-input{
       float: right;
       i{
         cursor: pointer;
         color: #2E82FF;
       }
        .icon-input{
          width: 140px;
          color: black;
        }
     }
    }
    .loading{
      min-height: calc(100vh - 72px - 86px);
    }
    .el-menu{
      border-right: 0;
    }
   }
   .right{
      flex:1;
      box-shadow:0px 1px 10px 0px rgba(0, 0, 0, 0.06);
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
