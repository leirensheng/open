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
      :basic-edit-form="basicQueryForm"

      @endUse="handleEndUse"
      @beforeDialogOpen="handleDialogOpen"
      @addIdChange="handleIdChange"
      @startUse="handleStartUse" />
  </div>
</template>
<script>
  import vTable from '../../components/vTable/vTable.vue';
  import {
    list, add, update, enable, disable,
  } from '@/api/externalInterface';

  export default {
    name: 'Dayou',
    components: {
      vTable,
    },
    data() {
      return {
        basicQueryForm: {
          source: 1,
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
            show: item => item.state == 1,
          },
          {
            name: '启用',
            eventName: 'startUse',
            show: item => item.state == 0,
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
                eventName: 'editIdChange',
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
            options: [{ name: '广州', id: 0 }, { name: '杭州', id: 1 }, { name: '上海', id: 2 }],
            support: {
              add: {
                disabled: form => !form.supplierName,
              },
              edit: {
                disabled: form => !form.supplierName,
              },
            },
          },
          {
            name: '大有信息',
            queryType: 'title',
            support: ['add', 'edit'],
          },
          {
            name: '大有Webname',
            id: 'Webname',
            required: true,
            support: {
              add: {
                dialogName: 'Webname',
              },
              edit: {
                dialogName: 'Webname',
              },
            },
          },
          {
            name: '大有AppKey',
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
            name: '大有AppPwd',
            id: 'Appwd',
            required: true,
            support: {
              add: {
                dialogName: 'AppPwd',
              },
              edit: {
                dialogName: 'AppPwd',
              },
            },
          },
          {
            name: '接入状态',
            id: 'state',
            queryType: 'radio',
            options: [{ name: '启用', id: 1 }, { name: '禁用', id: 0 }],

          },
          {
            name: '最近更新人',
            id: 'lastModify',
          },
          {
            name: '最近更新时间',
            id: 'lastModifyTime',
          },
        ],
      };
    },
    methods: {
      list,
      handleStartUse(rowData) {
        enable({ id: rowData.id }).then(() => {
          rowData.state = 0;
        });
      },
      handleEndUse(rowData) {
        disable({ id: rowData.id }).then(() => {
          rowData.state = -1;
        });
      },
      handleDialogOpen(dataForDialog) {
        const config = dataForDialog.items.find(one => one.id == 'corporationId');
        this.$set(config.options.find(one => one.id == 2), 'noShow', true);
      },
      //  供应商名称变化处理
      handleNameChange(val, id, form, allConfig) {
        if (val) {
          const target = allConfig.find(one => one.id == 'corporationId');
          if (target) {
            this.$set(target.options.find(one => one.id == 2), 'noShow', true);
            // 这里保证dialog的操作不会有任何副作用
            this.$refs.table.$on('dialogClose', () => {
              this.$set(target.options.find(one => one.id == 2), 'noShow', false);
            });
          }
        }
      },
      //  供应商id变化处理
      handleIdChange({
        form, allConfig,
      }) {
        form.supplierName = '焊接连接';
        this.handleNameChange(form.supplierName, 'supplierName', form, allConfig);
      },


    },
  };
</script>
