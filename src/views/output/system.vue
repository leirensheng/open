<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="130"
      :get-data="list"
      @gotoDict="(rowData)=>{gotoPage(rowData, 'Dict')}"
      @gotoBusiness="(rowData)=>gotoPage(rowData,'Business')"
      @gotoUser="(rowData)=>gotoPage(rowData,'User')" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';
  import { list, update, add } from '@/api/system';

  export default {
    name: 'System',
    components: {
      vTable,
    },
    data() {
      return {
        tableBtnsConfig: [
          {
            name: '编辑',
            editConfig: {
              title: '编辑对接系统',
              handler: update,
            },
          },
          {
            name: '字典维护',
            eventName: 'gotoDict',
          },
          {
            name: '对接用户管理',
            eventName: 'gotoUser',
          },
          {
            name: '对接商家管理',
            eventName: 'gotoBusiness',
          },

        ],
        topBtnsConfig: [
          {
            name: '添加',
            btnType: { isPlain: true, type: 'primary' },
            addConfig: {
              title: '添加对接系统',
              handler: add,
            },
          },
        ],
        columns: [
          {
            name: '对接系统',
            id: 'name',
            required: true,
            support: ['query', 'add', 'edit'],
          },
          {
            name: '对接商家数',
            id: 'supplierCount',
          },
          {
            name: '接入状态',
            id: 'state',
            required: true,
            queryType: 'select',
            options: [{ name: '启用', id: 0 }, { name: '禁用', id: -1 }],
            support: { query: {}, edit: { type: 'radio' }, add: { type: 'radio' } },
          },
          {
            name: '最近更新人',
            id: 'updateUser',
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
      gotoPage({ id, name }, routeName) {
        this.$router.push({ name: routeName, query: { systemId: id, systemName: name } });
      },


    },
  };
</script>
