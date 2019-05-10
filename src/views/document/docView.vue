<template>
  <div class="container">
    <div class="left">
      <div class="top">
        <div>目录</div>
        <transition
          name="fade-transform"
          mode="out-in">
          <div>
            <i
              v-show="!inputShow"
              class="el-icon-search"
              @click="inputShow=!inputShow" />
            <el-input
              v-show="inputShow"
              v-model="keyword"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              @keyup.native.enter="search"
              @blur="inputShow=!inputShow" />
          </div>
        </transition>
      </div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu
          v-for="one in tree"
          :key="one.id"
          index="1">
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
      <div class="rig-top">
        {{ docData.title }}
      </div>
      youbian
    </div>
  </div>
</template>
<script>
  import { menuAndDoc, docView } from '@/api/document';

  export default {
    data() {
      return {
        inputShow: false,
        tree: [],
        docTitle: 'fafdasf',
        keyword: '',
        docData: {
          title: '',
          content: '',
        },
      };
    },
    watch: {
       
    },
    mounted() {
      this.search();
    },
    methods: {
      search() {
        this.docData.title = '';
        this.docData.content = '';
        menuAndDoc({ name: this.keyword }).then(({ model }) => {
          this.tree = model;
        });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>
<style lang="scss" scoped>
 .container{
   display: flex;
   .left{
     flex: 0 0 270px;
    .top{
      display: flex;
      justify-content: space-between;
      background-color: #EAEAEA;
      height: 72px;
      align-items: center;
      padding: 22px;
      font-size:22px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(254,255,255,1);
      line-height:28px;
    }
   }
   .right{
      flex:1;
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
 }

</style>
