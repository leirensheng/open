<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="list"
      @seeFail="handleSeeFail" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';
  import { list, update } from '@/api/systemSupplier';

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
              handler: update,
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
            id: 'area',
          },
          {
            name: 'appId',
            id: 'appKey',
          },
          {
            name: 'secretKey',
            id: 'appSecret',
          },
          {
            name: 'supplierKey',
            id: 'supplierKey',
          },

          {
            name: '状态',
            id: 'state',
            queryType: 'select',
            required: true,
            options: [{ name: '启用', id: 0 }, { name: '禁用', id: -1 }],
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
      handleSeeFail(rowData) {
        const { supplierId, supplierName, systemId } = rowData;
        this.$router.push({ name: 'Fail', query: { supplierName, supplierId, systemId } });
      },
    },
  };
</script>
