<template>
  <div>
    <v-table
      ref="table"
      :columns="columns"
      :label-width="130"
      :get-data="getData"
      :no-show-pagination="true" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';

  export default {
    name: 'TestParams',

    components: {
      vTable,
    },
    data() {
      return {
        columns: [
          {
            name: '供应商ID',
            id: 'id',
          },
          {
            name: '供应商名称',
            id: 'name',
          },
          {
            name: '供应商秘钥',
            id: 'secret',
          },

        ],
      };
    },
    methods: {

      getData() {
        const data = {
          data: [{
            id: '1552137',
            name: '测试供应商1',
            secret: 9898,
          }],
          total: 2,
          code: 0,
        };
        return Promise.resolve(data);
      },

    },
  };
</script>
