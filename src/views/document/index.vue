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
