<template>
  <div>
    <v-table
      ref="priceTable"
      :basic-query-form="basicQueryForm"
      :columns="columns"
      :label-width="'130px'"
      :get-data="priceFailList" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';
  import { priceFailList } from '@/api/systemSupplier.js';

  export default {
    components: {
      vTable,
    },
    props: {
      basicQueryForm: {
        type: Object,
        required: false,
        default: () => {},
      },
    },
    data() {
      return {
        columns: [

          {
            name: '区域',
            id: 'region',
          },
          {
            name: '配件ID',
            id: 'partsCode',
            support: ['query'],
          },
          {
            name: '价格',
            id: 'price',
          },
          {
            name: '库存',
            id: 'num',
          },

          {
            name: '失败原因',
            id: 'errorMessageList',
            type: Array,
          },
        ],
      };
    },
    methods: {
      search() {
        this.$refs.priceTable.search();
      },
      priceFailList,
    },
  };
</script>
