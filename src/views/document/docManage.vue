<template>
  <div class="doc-manage">
    <Doc-Menu
      class="menu"
      @menuIdChange="handleChange" />
    <Doc-List
      class="list"
      :menu-id="curId" />
  </div>
</template>
<script>
  import DocMenu from './components/docMenu.vue';
  import DocList from './components/docList.vue';

  export default {
    name: 'DocManage',
    components: {
      DocMenu,
      DocList,
    },
    data() {
      return {
        curId: '',
      };
    },
    // 为了编辑完成后，跳回来的时候重新刷新
    activated() {
      if (this.curId) {
        const temp = this.curId;
        this.curId = '';
        this.$nextTick(() => {
          this.curId = temp;
        });
      }
    },
    methods: {
      handleChange(id) {
        this.curId = id;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .doc-manage{
    display: flex;
    margin: 6px ;
    border: 1px solid #DCDEE0;
    min-height: 750px;
    .menu{
       width: 270px;
    }
    .list{
      flex:1;
    }
  }
</style>
