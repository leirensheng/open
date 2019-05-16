<template>
  <div>
    <v-table
      ref="brandTable"
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :basic-query-form="basicQueryForm"
      :get-data="list"
      @uploadDone="uploadDone"
      @exportDict="exportDict">
      <div slot="tips">
        <div>
          填入对接系统车品牌名称，表示对接系统传入此名称时，系统识别为巴图鲁的“xxx”车品牌。不填则接口不会接入"xxx“品牌的数据
        </div>
      </div>
      <div slot="template">
        <span>
          导入为覆盖式更新， 请务必 <span @click="downloadTemplate">
            下载导入模板
          </span>
        </span>
      </div>
    </v-table>
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';
  import {
    list, update, download, 
  } from '@/api/dataRel';

  export default {
    // name:''
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
              handler: update,
            },
          },
        ],

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
          dataValue: '巴图鲁车品牌名称',
          systemId: this.$route.query.systemId,
        };
      },

      topBtnsConfig() {
        return [
          {
            name: '字典导出',
            eventName: 'exportDict',
          },
          {
            name: '字典导入',
            type: 'upload',
            action: '/open/supplier/dataRel/import',
            eventName: 'uploadDone',
            data: this.basicQueryForm,
          },
          {
            type: 'slot',
            slotName: 'template',
          },
        ];
      },
    },
    methods: {
      list,
      downloadTemplate() {
        download({ type: 1 });
      },

      uploadDone() {
        this.search();
      },

      exportDict() {
        download(this.basicQueryForm);
      },
      search() {
        this.$refs.brandTable.search();
      },
    },
  };
</script>
