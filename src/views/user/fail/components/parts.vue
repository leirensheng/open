<template>
  <div>
    <v-table
      ref="partsTable"
      :basic-query-form="basicQueryForm"
      :columns="columns"
      :label-width="'130px'"
      :get-data="partsFailList" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';
  import { partsFailList } from '@/api/systemSupplier';

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
            name: '配件ID',
            id: 'partsCode',
            support: ['query'],
          },
          {
            name: '配件名称',
            id: 'partName',
          },
          {
            name: '原厂编码',
            id: 'originPartsCode',
          },
          {
            name: '车品牌',
            id: 'carBrandName',
          },
          {
            name: '配件品牌',
            id: 'partsBrandName',
          }, {
            name: '配件产地',
            id: 'originPlaceName',
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
      partsFailList,
      search() {
        this.$refs.partsTable.search();
      },
    },
  };
</script>
