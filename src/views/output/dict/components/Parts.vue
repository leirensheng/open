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
        curName: '配件品牌字典',
        tips: '填入对接系统配件品牌名称，表示对接系统传入此名称时，系统识别为巴图鲁的“xxx”配件品牌。不填则接口不会接入"xxx“品牌的数据',
        templateUrl: '/static/xlsTemplate/partsBrand.xls',
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
            name: '巴图鲁配件品牌ID',
            id: 'dataId',
            required: true,
            support: {
              edit: {
                dialogName: '配件品牌ID',
                disabled: true,
              },
            },
          },
          {
            name: '巴图鲁配件品牌名称',
            id: 'dataValue',
            required: true,
            support: {
              query: {
              },
              edit: {
                dialogName: '配件品牌名称',
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
            name: '对接系统配件品牌名称',
            id: 'relValue',
            support: {
              edit: {
                dialogName: '配件品牌名称',
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
          type: 2,
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
