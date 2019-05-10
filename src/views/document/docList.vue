<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="list"
      :basic-query-form="basicQueryForm"
      @gotoModify="gotoModify"
      @hide="handleHide"
      @move="handleMove"
      @show="handleShow" />
  </div>
</template>
<script>
//  todo:menuId
  import vTable from '../../components/vTable/vTable.vue';
  import { list, hide, show } from '@/api/document';

  export default {
    name: 'DocList',
    components: {
      vTable,
    },
    props: {
      basicQueryForm: {
        type: Object,
        default: () => {},
      },
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
            show: item => item.state == 0,
          },
          {
            name: '设为可见',
            eventName: 'show',
            show: item => item.state == -1,
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
            name: '优先级',
            id: 'id',
            noShow: true,
          },
          {
            name: '文档名称',
            id: 'name',
            support: ['query'],
          },
          {
            name: '优先级',
            id: 'seq',
          },

          {
            name: '状态',
            id: 'state',
            queryType: 'select',
            required: true,
            options: [{ name: '可见', id: 0 },
                      { name: '隐藏', id: -1 }],
            support: ['query'],
          },
          {
            name: '最近更新人',
            id: 'updateUserName',
          },
          {
            name: '最近更新时间',
            id: 'updateTime',
          },
        ],
      };
    },
    methods: {
      list,
      handleHide(rowData) {
        hide({ id: rowData.id }).then(() => {
          rowData.state = -1;
        });
      },
      handleMove() {},
      handleShow(rowData) {
        show({ id: rowData.id }).then(() => {
          rowData.state = 0;
        });
      },
      gotoModify({ id }) {
        this.$router.push({ name: 'DocEdit', query: { id } });
      },
    },
  };
</script>
