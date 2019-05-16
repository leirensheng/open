<template>
  <div>
    <v-table
      ref="table"
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="list"
      :basic-query-form="basicQueryForm"
      :basic-add-form="basicQueryForm"
      @endUse="handleEndUse"
      @addCorporationChange="addCorporationChange"
      @addIdChange="handleIdChange"
      @startUse="handleStartUse" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';
  import {
    list, add, update, enable, disable,
  } from '@/api/externalInterface';
  import { findCorporationList, findSupplerById } from '@/api/base';

  export default {
    name: 'Dayou',
    components: {
      vTable,
    },
    props: {
      basicQueryForm: {
        type: Object,
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
              title: '对接商家管理-编辑',
              handler: update,
            },
          },
          {
            name: '禁用',
            eventName: 'endUse',
            show: item => item.state == 0,
          },
          {
            name: '启用',
            eventName: 'startUse',
            show: item => item.state == -1,
          },
        ],
        topBtnsConfig: [
          {
            name: '添加',
            btnType: 'success',
            addConfig: {
              title: '添加对接商家',
              handler: add,
            },
          },
        ],

      };
    },
    methods: {
      list,
      handleStartUse(rowData) {
        enable({ id: rowData.id }).then(() => {
          rowData.state = 0;
          this.$message.success('保存成功');
        });
      },
      handleEndUse(rowData) {
        disable({ id: rowData.id }).then(() => {
          rowData.state = -1;
          this.$message.success('保存成功');
        });
      },


      // 主体选中后添加name参数
      addCorporationChange({ form }) {
        const options = this.columns.find(one => one.id == 'corporationId').options;
        form.corporationName = options.find(one => one.id == form.corporationId).name;
      },
      //  供应商id变化处理
      handleIdChange({
        form,
      }) {
        form.supplierName = '';
        form.corporationName = '';
        form.corporationId = '';
        const target = this.columns.find(one => one.id == 'corporationId');
        target.options = [];

        findSupplerById({ supplierId: form.supplierId }).then(({ model }) => {
          if (model) {
            form.supplierName = model.orgName;
          } else {
            this.$message.warning('找不到供应商!');
          }
        });

        findCorporationList({ supplierId: form.supplierId }).then(({ model }) => {
          target.options = model.map(one => ({
            name: one.corporationName,
            id: one.id,
          }));
        });
      },
    },
  };
</script>
