<template>
  <div>
    <v-table
      ref="table"
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="130"
      :get-data="list"
      :basic-query-form="basicQueryForm"
      :basic-add-form="basicQueryForm"
      @beforeAssignToTable="beforeAssignToTable"
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
  import { findCorporationList, findSupplierById } from '@/api/base';

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
      specialColumns: {
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
              handler: this.handleAddOrEdit,
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
            btnType: { isPlain: true, type: 'primary' },
            addConfig: {
              title: '添加对接商家',
              handler: this.handleAddOrEdit,
            },
          },
        ],

      };
    },
    methods: {
      list,
      handleAddOrEdit(form) {
        const copy = { ...form };
        copy.externalInterfaceExtendDTOs = this.specialColumns.map(one => ({
          name: one,
          value: form[one],
          id: form[`${one}Id`],
        }));
        this.specialColumns.forEach(one => {
          delete copy[one];
          delete copy[`${one}Id`];
        });

        return form.id !== undefined ? update(copy) : add(copy);
      },
      // 从后端获取表格数据后进行处理
      beforeAssignToTable(data) {
        data.forEach(obj => {
          obj.externalInterfaceExtendDTOs.forEach(one => {
            obj[one.name] = one.value;
            obj[`${one.name}Id`] = one.id;
          });
        });
      },

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

        findSupplierById({ supplierId: form.supplierId }).then(({ model }) => {
          if (model) {
            form.supplierName = model.orgName;
          } else {
            this.$message.warning('找不到供应商!');
          }
        });

        findCorporationList({ supplierId: form.supplierId }).then(({ model }) => {
          if (model) {
            target.options = model.map(one => ({
              name: one.corporationName,
              id: one.id,
            }));
          }
        });
      },
    },
  };
</script>
