<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="getData"
      @seeFail="handleSeeFail" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';

  export default {
    name: 'Info',
    components: {
      vTable,
    },
    data() {
      return {
        tableBtnsConfig: [
          {
            name: '备注',
            editConfig: {
              title: '添加备注',
            },

          },
          {
            name: '查看失败明细',
            eventName: 'seeFail',
          },

        ],

        columns: [
          {
            name: '供应商ID',
            required: true,
            id: 'supplierId',
            support: {
              query: {},
              edit: {
                disabled: true,
                type: 'text',
              },
            },
          },
          {
            name: '供应商名称',
            required: true,
            id: 'supplierName',
            support: {
              edit: {
                type: 'text',
              },
              query: {},
            },
          },
          {
            name: '区域',
            required: true,
            id: 'region',
          },
          {
            name: '正式对接秘钥',
            id: 'secret',
          },

          {
            name: '状态',
            id: 'status',
            queryType: 'select',
            required: true,
            options: [{ name: '启用', id: 1 }, { name: '禁用', id: 0 }],
            support: ['query'],
          },
          {
            name: '备注',
            id: 'remark',
            support: {
              query: {
              },
              edit: {
                type: 'textarea',
              },
            },
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
      handleSeeFail() {
      },
      getData() {
        const data = {
          data: [{
            region: '环南',
            supplierName: '张珊',
            supplierId: '2892279',
            secret: '728DJXO273BD2O0D',
            status: 1,
            lastModify: 'jonN',
            remark: 'fdsfdsf',
            lastModifyTime: '2018-06',
          }, {
            region: '花呗',
            supplierName: '大幅度',
            supplierId: '45464',
            secret: 'fsddfsfsc',
            status: 0,
            remark: 'fff',
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
