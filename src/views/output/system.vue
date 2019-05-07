<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="getData"
      @gotoDict="gotoPage('/brand')"
      @gotoBusiness="gotoPage('/business')"
      @gotoUser="gotoPage('/user')" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';

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
            addConfig: {
              title: '添加对接系统',
            },
          },
        ],
        columns: [
          {
            name: '对接系统',
            id: 'system',
            required: true,
            support: ['query', 'add', 'edit'],
          },
          {
            name: '对接商家数',
            id: 'count',
          },
          {
            name: '接入状态',
            id: 'status',
            queryType: 'select',
            options: [{ name: '启用', id: 1 }, { name: '禁用', id: 0 }],
            support: { query: {}, edit: { type: 'radio' }, add: { type: 'radio' } },
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
      gotoPage(route) {
        this.$router.push(route);
      },
      getData() {
        const data = {
          data: [{
            system: '思锐ERP',
            count: 23,
            status: 1,
            lastModify: 'jon',
            lastModifyTime: '2018-01',
          }, {
            system: '民车',
            count: 3,
            status: 0,
            lastModify: 'jon',
            lastModifyTime: '2018-01',
          }],
          total: 2,
          code: 0,
        };
        return Promise.resolve(data);
      },

    },
  };
</script>
