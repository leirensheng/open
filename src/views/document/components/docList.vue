<template>
  <div style="padding:12px">
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="list"
      :basic-query-form="basicQueryForm"
      @gotoModify="gotoModify"
      @hide="handleHide"
      @show="handleShow" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';
  import { list, hide, show } from '@/api/document';

  export default {
    components: {
      vTable,
    },
    props: {
      menuId: {
        type: [String, Number],
        default: () => '',
      },
    },
    data() {
      return {
        tableBtnsConfig: [

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
            btnType: { isPlain: true, type: 'primary' },
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
    computed: {
      basicQueryForm() {
        return {
          menuId: this.menuId,
        };
      },
    },
    watch: {

    },
    methods: {
      list,
      handleHide(rowData) {
        hide({ id: rowData.id }).then(() => {
          rowData.state = -1;
          this.$message.success('保存成功');
        });
      },
      handleShow(rowData) {
        show({ id: rowData.id }).then(() => {
          rowData.state = 0;
          this.$message.success('保存成功');
        });
      },
      gotoModify({ id }) {
        this.$router.push({ name: 'DocEdit', query: { id } });
      },
    },
  };
</script>
