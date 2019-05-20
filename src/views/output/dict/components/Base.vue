<template>
  <div>
    <v-table
      ref="brandTable"
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="130"
      :basic-query-form="basicQueryForm"
      :get-data="list"
      @uploadDone="uploadDone"
      @queryChange="handlerQueryChange"
      @exportDict="exportDict">
      <div slot="tips">
        <div>
          {{ tips }}
        </div>
      </div>
      <div slot="template">
        <span>
          导入为覆盖式更新， 请务必
          <a
            class="downlink"
            :href="templateUrl">
            下载导入模板
          </a>
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
    props: {
      tips: {
        type: String,
        required: true,
      },
      templateUrl: {
        type: String,
        required: true,
      },
      basicQueryForm: {
        type: Object,
        required: true,
      },
      curName: {
        type: String,
        required: true,
      },
      columns: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        tableBtnsConfig: [
          {
            name: '编辑',
            editConfig: {
              title: `${this.curName}关系`,
              handler: update,
            },
          },
        ],
      };
    },
    computed: {


      topBtnsConfig() {
        return [
          {
            name: '字典导出',
            btnType: { isPlain: true, type: 'primary' },
            eventName: 'exportDict',
          },
          {
            name: '字典导入',
            btnType: { isPlain: true, type: 'primary' },
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
      handlerQueryChange(id, value) {
        console.log(value);
        this.basicQueryForm.dataValue = value;
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
<style lang="scss" scoped>
 .downlink{
   text-decoration:underline;
   color: #2E82FF;
   cursor: pointer;
 }

</style>
