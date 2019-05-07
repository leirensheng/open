<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="getData"
      @gotoModify="gotoModify"
      @hide="handleHide"
      @move="handleMove"
      @show="handleShow" />
  </div>
</template>
<script>
  import vTable from '../../components/vTable/vTable.vue';

  export default {
    name: 'DocList',

    components: {
      vTable,
    },
    data() {
      return {
        tableBtnsConfig: [
          {
            name: '移动',
            eventName: 'move',
          },
          {
            name: '编辑',
            eventName: 'gotoModify',
          },
          {
            name: '设置为隐藏',
            eventName: 'hide',
            show: item => item.status == 1,
          },
          {
            name: '设为可见',
            eventName: 'show',
            show: item => item.status == 2,
          },
        ],
        topBtnsConfig: [
          {
            name: '添加文档',
            btnType: 'success',
            eventName: 'gotoModify',
          },
        ],
        columns: [
          {
            name: '文档名称',
            id: 'docName',
            support: ['query'],
          },
          {
            name: '优先级',
            id: 'priority',
          },

          {
            name: '状态',
            id: 'status',
            queryType: 'select',
            required: true,
            options: [{ name: '全部', id: 0 }, { name: '可见', id: 1 },
                      { name: '隐藏', id: 2 }],
            support: ['query'],
          },
          {
            name: '最近更新人',
            id: 'lastModify',
          },
          {
            name: '最近更新时间',
            id: 'lastModifyTime',
          },
        ],
      };
    },
    methods: {
      handleHide() {},
      handleMove() {},
      handleShow() {},
      gotoModify() {
        this.$router.push('/editDoc');
      },

      getData() {
        const data = {
          data: [{
                   docName: '添加SKU属性数据',
                   priority: 23,
                   status: 1,
                   lastModify: 'jonN',
                   lastModifyTime: '2018-06',
                 },
                 {
                   docName: '更新库存、价格信息',
                   priority: 1,
                   status: 2,
                   lastModify: 'df',
                   lastModifyTime: '2018-05',
                 }],
          total: 2,
          code: 0,
        };
        return Promise.resolve(data);
      },

    },
  };
</script>
