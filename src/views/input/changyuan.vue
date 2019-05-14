<template>
  <div>
    <v-table
      ref="table"
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="list"
      :basic-add-form="basicQueryForm"
      :basic-query-form="basicQueryForm"
      @endUse="handleEndUse"
      @addIdChange="handleIdChange"
      @startUse="handleStartUse" />
  </div>
</template>
<script>
  import vTable from '../../components/vTable/vTable.vue';
  import {
    list, add, update, enable, disable,
  } from '@/api/externalInterface';
  import { findCorporationList, findSupplerById } from '@/api/base';

  export default {
    name: 'Changyuan',
    components: {
      vTable,
    },
    data() {
      return {
        basicQueryForm: {
          source: 2,
        },
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
        columns: [
          {
            name: '天戟信息',
            queryType: 'title',
            support: ['add', 'edit'],
          },
          {
            name: '供应商ID',
            id: 'supplierId',
            required: true,
            support: {
              query: {},
              add: {
                eventName: 'addIdChange',
              },
              edit: {
                disabled: true,
              },
            },

          },
          {
            name: '供应商名称',
            id: 'supplierName',
            required: true,
            support: {
              query: {},
              add: {
                disabled: true,
              },
              edit: {
                disabled: true,
              },
            },

          },
          {
            name: '接入主体',
            id: 'corporationId',
            required: true,
            queryType: 'select',
            sourceFormat: {
              label: 'corporationName',
              value: 'id',
            },
            source: findCorporationList,
            support: {
              add: {
                disabled: form => !form.supplierName,
              },
              edit: {
                disabled: true,
              },
            },
          },
          {
            name: '长远信息',
            queryType: 'title',
            support: ['add', 'edit'],
          },
          {
            name: '长远AppKey',
            id: 'Appkey',
            required: true,
            support: {
              add: {
                dialogName: 'AppKey',
              },
              edit: {
                dialogName: 'AppKey',
              },
            },
          },
          {
            name: '接入状态',
            id: 'state',
            queryType: 'radio',
            options: [{ name: '启用', id: 0 }, { name: '禁用', id: -1 }],

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
    methods: {
      list,
      handleStartUse(rowData) {
        enable({ id: rowData.id }).then(() => {
          this.$message.success('保存成功');

          rowData.state = 0;
        });
      },
      handleEndUse(rowData) {
        disable({ id: rowData.id }).then(() => {
          this.$message.success('保存成功');

          rowData.state = -1;
        });
      },


      //  供应商id变化处理
      handleIdChange({
        form,
      }) {
        form.supplierName = '';
        findSupplerById({ id: form.supplierId }).then(({ model }) => {
          form.supplierName = model.orgName;
        });

        findCorporationList({ supplierId: form.supplierId }).then(({ model }) => {
          const target = this.columns.find(one => one.id == 'corporationId');
          const showIds = model.map(one => one.id);
          target.options.forEach(one => {
            if (showIds.includes(one.id)) {
              this.$set(one, 'noShow', false);
            } else {
              this.$set(one, 'noShow', true);
            }
          });
        });
      },


    },
  };
</script>
