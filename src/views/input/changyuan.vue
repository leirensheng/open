<template>
  <div>
    <v-table
      ref="table"
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="getData"
      @endUse="handleEndUse"
      @beforeDialogOpen="handleDialogOpen"
      @addIdChange="handleIdChange"
      @startUse="handleStartUse" />
  </div>
</template>
<script>
  import vTable from '../../components/vTable/vTable.vue';

  export default {
    name: 'Changyuan',
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
            },
          },
          {
            name: '禁用',
            eventName: 'endUse',
            show: item => item.status == 1,
          },
          {
            name: '启用',
            eventName: 'startUse',
            show: item => item.status == 0,
          },
        ],
        topBtnsConfig: [
          {
            name: '添加',
            btnType: 'success',
            addConfig: {
              title: '添加对接商家',
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
            id: 'id',
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
            id: 'name',
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
            id: 'mainPart',
            required: true,
            queryType: 'select',
            options: [{ name: '广州', id: 0 }, { name: '杭州', id: 1 }, { name: '上海', id: 2 }],
            support: {
              add: {
                disabled: form => !form.name,
              },
              edit: {
                disabled: form => !form.name,
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
            id: 'appkey',
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
            id: 'status',
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
      handleStartUse() {},
      handleEndUse() {},
      handleDialogOpen(dataForDialog) {
        const config = dataForDialog.items.find(one => one.id == 'mainPart');
        this.$set(config.options.find(one => one.id == 2), 'noShow', true);
      },
      //  供应商名称变化处理
      handleNameChange(val, id, form, allConfig) {
        if (val) {
          const target = allConfig.find(one => one.id == 'mainPart');
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
        form.name = '焊接连接';
        this.handleNameChange(form.name, 'name', form, allConfig);
      },
      getData() {
        const data = {
          data: [{
                   id: '1552137',
                   name: '测试供应商1',
                   mainPart: 0,
                   webname: 'BTL_GZXX',
                   appkey: 'yishu434',
                   appPwd: 'fsdfjs',
                   status: 1,
                   lastModify: 'jon',
                   lastModifyTime: '2018-01',
                 }, {
                   id: '33',
                   name: '测试供应商2',
                   mainPart: 1,
                   webname: 'BTL_GZ5X',
                   appkey: 'SD',
                   appPwd: 'KILE',
                   status: 0,
                   lastModify: 'jonN',
                   lastModifyTime: '2018-06',
                 },
                 {
                   id: '33',
                   name: '测试供应商2',
                   mainPart: 2,
                   webname: 'BTL_GZ5X',
                   appkey: 'SD',
                   appPwd: 'KILE',
                   status: 0,
                   lastModify: 'jonN',
                   lastModifyTime: '2018-06',
                 }],
          total: 2,
          code: 0,
        };
        return Promise.resolve(data);
      },

    },
  };
</script>
