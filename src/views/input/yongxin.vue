<template>
  <div>
    <Base
      :special-columns="specialColumns"
      :basic-query-form="basicQueryForm"
      :columns="columns" />
  </div>
</template>
<script>
  import Base from './components/base.vue';

  export default {
    components: {
      Base,
    },
    data() {
      return {
        basicQueryForm: {
          source: 3,
        },
        specialColumns: ['psign', 'gsign'],

        columns: [
          {
            name: '天戟信息',
            queryType: 'title',
            support: ['add', 'edit'],
          },
          {
            name: '供应商ID',
            id: 'supplierId',
            required: true,
            support: {
              query: {},
              add: {
                eventName: 'addIdChange',
              },
              edit: {
                disabled: true,
              },

            },
          },
          {
            name: '供应商名称',
            id: 'supplierName',
            required: true,
            support: {
              query: {},
              add: {
                disabled: true,
              },
              edit: {
                disabled: true,
              },
            },

          },
          {
            id: 'corporationName',
            name: '接入主体',
            support: {
              edit: {
                disabled: true,
              },
            },
          },
          {
            name: '接入主体',
            id: 'corporationId',
            required: true,
            queryType: 'select',
            isShow: false,
            options: [],
            support: {
              add: {
                disabled: form => !form.supplierName,
                eventName: 'addCorporationChange',
              },

            },
          },
          {
            name: '用心信息',
            queryType: 'title',
            support: ['add', 'edit'],
          },
          {
            name: '用心psign',
            id: 'psign',
            required: true,
            support: {
              add: {
                dialogName: 'psign',
              },
              edit: {
                dialogName: 'psign',
              },
            },
          },
          {
            name: '用心gsign',
            id: 'gsign',
            required: true,
            support: {
              add: {
                dialogName: 'gsign',
              },
              edit: {
                dialogName: 'gsign',
              },
            },
          },
          {
            name: '接入状态',
            id: 'state',
            queryType: 'radio',
            options: [{ name: '启用', id: 0 }, { name: '禁用', id: -1 }],

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
  };
</script>
