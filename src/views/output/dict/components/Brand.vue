<template>
  <div>
    <Base
      :ref="curName"
      :columns="columns"
      :cur-name="curName"
      :basic-query-form="basicQueryForm"
      :template-url="templateUrl"
      :tips="tips" />
  </div>
</template>
<script>
  import Base from './Base.vue';


  export default {
    components: {
      Base,
    },
    data() {
      return {
        curName: '车品牌字典',
        tips: '填入对接系统车品牌名称，表示对接系统传入此名称时，系统识别为巴图鲁的“xxx”车品牌。不填则接口不会接入"xxx“品牌的数据',
        templateUrl: '/static/xlsTemplate/carBrand.xls',
        columns: [
          {
            name: 'id',
            isShow: false,
          },
          {
            name: '巴图鲁',
            queryType: 'title',
            support: ['edit'],
          },
          {
            name: '巴图鲁车品牌ID',
            id: 'dataId',
            required: true,
            support: {
              edit: {
                dialogName: '车品牌ID',
                disabled: true,
              },
            },
          },
          {
            name: '巴图鲁车品牌名称',
            id: 'dataValue',
            required: true,
            support: {
              query: {},
              edit: {
                dialogName: '车品牌名称',
                disabled: true,
              },
            },

          },
          {
            name: '对接系统',
            queryType: 'title',
            support: ['edit'],
          },
          {
            name: '对接系统车品牌名称',
            id: 'relValue',
            support: {
              edit: {
                dialogName: '车品牌名称',
              },
            },
          },
          {
            queryType: 'slot',
            slotName: 'tips',
            support: ['edit'],
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
    computed: {
      basicQueryForm() {
        return {
          type: 1,
          // dataValue: '',
          systemId: this.$route.query.systemId,
        };
      },
    },
    methods: {
      search() {
        this.$refs[this.curName].search();
      },
    },
  };
</script>
