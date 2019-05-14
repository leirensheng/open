<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="getData" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';

  export default {
    name: 'User',

    components: {
      vTable,
    },
    data() {
      return {
        tableBtnsConfig: [
          {
            name: '编辑',
            editConfig: {
              title: '车品牌字典匹配关系',
            },

          },
          {
            name: '禁用',
            eventName: 'endUse',
            show: item => item.status == 1,
          },
          {
            name: '启用',
            eventName: 'startUse',
            show: item => item.status == 0,
          },
        ],
        topBtnsConfig: [
          {
            name: '添加',
            btnType: 'success',
            addConfig: {
              title: '添加外部用户',
            },
          },
        ],
        columns: [

          {
            name: '账号',
            id: 'account',
            required: true,
            support: ['add', 'edit', 'query'],
          },
          {
            name: '用户名',
            id: 'userName',
            required: true,
            support: ['add', 'edit', 'query'],
          },
          {
            name: '密码',
            id: 'password',
            noShow: true,
            required: true,
            support: ['add'],
          },
          {
            name: '供应商ID',
            id: 'supplierId',
          },
          {
            name: '测试秘钥',
            id: 'secret',
          },

          {
            name: '状态',
            id: 'status',
            queryType: 'radio',
            required: true,

            options: [{ name: '启用', id: 1 }, { name: '禁用', id: 0 }],
            support: ['add', 'query', 'edit'],
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

      getData() {
        const data = {
          data: [{
            account: 'zj',
            userName: '张珊',
            supplierId: '2892279',
            secret: '728DJXO273BD2O0D',
            status: 1,
            lastModify: 'jonN',
            lastModifyTime: '2018-06',
          }, {
            account: 'er',
            userName: '大幅度',
            supplierId: '45464',
            secret: 'fsddfsfsc',
            status: 0,
            lastModify: 'q',
            lastModifyTime: '2018-07',
          }],
          total: 2,
          code: 0,
        };
        return Promise.resolve(data);
      },

    },
  };
</script>
