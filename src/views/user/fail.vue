<template>
  <div>
    <v-table
      :columns="columns"
      :label-width="'130px'"
      :get-data="getData" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';

  export default {
    name: 'Fail',
    components: {
      vTable,
    },

    data() {
      return {
        columns: [
          {
            name: '配件ID',
            id: 'id',
            support: ['query'],
          },
          {
            name: '配件名称',
            id: 'name',
          },
          {
            name: '原厂编码',
            id: 'code',
          },
          {
            name: '车品牌',
            id: 'brand',
          },
          {
            name: '配件品牌',
            id: 'partsBrand',
          }, {
            name: '配件产地',
            id: 'production',
          },
          {
            name: '失败原因',
            id: 'reason',
          },

        ],
      };
    },
    methods: {

      getData() {
        const data = {
          data: [{
            id: 'fsfsf',
            name: '可见',
            code: '2892279',
            brand: '宝马',
            partsBrand: '牛顿',
            production: 'gd',
            reason: 'fdsfdsf',
          }, {
            id: 'fs',
            name: '可见',
            code: '23323',
            brand: '订单',
            partsBrand: '申诉',
            production: 'sz',
            reason: '5656',
          }],
          total: 2,
          code: 0,
        };
        return Promise.resolve(data);
      },

    },
  };
</script>
