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
            :href="`/${templateName}.xls`"
            class="downlink">
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
    list, update, download, exportExcel,
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
      templateName() {
        switch (this.basicQueryForm.type) {
        case 1: return 'carBrand';
        case 2: return 'partsBrand';
        default: return 'partsFactory';
        }
      },

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
      // downloadTemplate() {
      //   download({ type: this.basicQueryForm.type }).then(data => {
      //     const aLink = document.createElement('a');
      //     const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      //     aLink.href = URL.createObjectURL(blob);
      //     aLink.click();
      //     document.body.appendChild(aLink);
      //   });
      // },
      exportDict() {
        exportExcel(this.basicQueryForm).then(data => {
          const aLink = document.createElement('a');
          const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
          aLink.href = URL.createObjectURL(blob);
          aLink.click();
          document.body.appendChild(aLink);
        });
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
