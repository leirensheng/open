<template>
  <div>
    <div class="systemName">
      {{ systemName }}
    </div>
    <v-table
      ref="businessTable"
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="130"
      :get-data="list"
      :basic-add-form="basicAddForm"
      :basic-query-form="basicQueryForm"
      @endUse="handleEndUse"
      @startUse="handleStartUse"
      @addIdChange="handleIdChange" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';
  import {
    list, update, add, disable, enable,
  } from '@/api/systemSupplier';
  import { findSupplierById, findRegion } from '@/api/base';

  export default {
    name: 'Business',

    components: {
      vTable,
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
            show: item => item.state === 0,
          },
          {
            name: '启用',
            eventName: 'startUse',
            show: item => item.state === -1,
          },
        ],
        topBtnsConfig: [
          {
            name: '添加',
            btnType: { isPlain: true, type: 'primary' },
            addConfig: {
              title: '添加对接供应商',
              handler: add,
            },
          },
        ],
        columns: [
          {
            name: '供应商ID',
            required: true,
            id: 'supplierId',
            support: {
              query: {},
              add: {
                eventName: 'addIdChange',
              },
              edit: {
                eventName: 'editIdChange',
                disabled: true,
              },
            },
          },
          {
            name: '供应商名称',
            required: true,
            id: 'supplierName',
            support: {
              add: {
                disabled: true,
              },
              edit: {
                disabled: true,
              },
              query: {},
            },
          },
          {
            name: '区域',
            required: true,
            id: 'areaId',
            queryType: 'select',
            support: ['add', 'edit'],
            source: findRegion,
            sourceFormat: {
              value: 'regionID',
              label: 'regionName',
            },
          },
          {
            name: 'appId',
            id: 'Appkey',
          },
          {
            name: 'secretKey',
            id: 'appSecret',
          },
          {
            name: 'supplierKey',
            id: 'supplierKey',
          },
          {
            name: '状态',
            id: 'state',
            queryType: 'select',
            required: true,
            options: [{ name: '启用', id: 0 }, { name: '禁用', id: -1 }],
            support: {
              add: { type: 'radio' },
              query: {},
            },
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
      basicAddForm() {
        return {
          systemId: this.$route.query.systemId,
        };
      },
      basicQueryForm() {
        return {
          systemId: this.$route.query.systemId,
        };
      },
      systemName() {
        return this.$route.query.systemName;
      },
    },
    mounted() {
      this.$refs.businessTable.search();
    },
    methods: {
      //  供应商id变化处理
      handleIdChange({
        form,
      }) {
        form.supplierName = '';
        findSupplierById({ supplierId: form.supplierId }).then(({ model: { orgName } }) => {
          form.supplierName = orgName;
        });
      },
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
    },
  };
</script>
