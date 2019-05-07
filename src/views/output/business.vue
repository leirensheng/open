<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="getData"
      @addIdChange="handleIdChange" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';

  export default {
    name: 'Business',

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
            name: '供应商ID',
            required: true,
            id: 'supplierId',
            support: {
              query: {},
              add: {
                eventName: 'addIdChange',
              },
              edit: {
                eventName: 'editIdChange',
                disabled: true,
              },
            },
          },
          {
            name: '供应商名称',
            required: true,
            id: 'supplierName',
            support: {
              add: {
                disabled: true,
              },
              edit: {
                disabled: true,
              },
              query: {},
            },
          },
          {
            name: '区域',
            required: true,
            id: 'region',
            support: ['add', 'edit'],
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
            support: {
              add: { type: 'radio' },
              edit: { type: 'radio' },
              query: {},
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
      //  供应商id变化处理
      handleIdChange({
        form, 
      }) {
        form.supplierName = '焊接连接';
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
            lastModifyTime: '2018-06',
          }, {
            region: '花呗',
            supplierName: '大幅度',
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
