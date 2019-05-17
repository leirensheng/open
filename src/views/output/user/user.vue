<template>
  <div>
    <div class="systemName">
      {{ systemName }}
    </div>
    <v-table
      ref="userTable"
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :basic-add-form="basicAddForm"
      :basic-query-form="basicQueryForm"
      :get-data="list"
      @beforeDialogOpen="beforeDialogOpen"
      @startUse="startUse"
      @endUse="endUse" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';
  import {
    list, add, update, enable, disable,
  } from '@/api/user';

  export default {
    name: 'User',

    components: {
      vTable,
    },
    data() {
      return {

        tableBtnsConfig: [
          {
            name: '编辑',
            editConfig: {
              title: '对接用户-编辑',
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
            btnType: {
              isPlain: true,
              type: 'primary',
            },
            addConfig: {
              title: '添加外部用户',
              handler: add,
            },
          },
        ],
        columns: [

          {
            name: '账号',
            id: 'username',
            required: true,
            support: ['add', 'edit', 'query'],
          },
          {
            name: '用户名',
            id: 'name',
            required: true,
            support: ['add', 'edit', 'query'],
          },
          {
            name: '密码',
            id: 'password',
            isShow: false,
            required: true,
            support: ['add', 'edit'],
          },
          {
            name: '供应商ID',
            id: 'supplierId',
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
              add: {
                type: 'radio',
              },
              edit: {
                type: 'radio',
              },
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
      this.$refs.userTable.search(true);
    },
    methods: {
      list,
      // 因为后端返回的密码是md5加密后的，所以前端不应该显示，防止只修改其他字段导致密码丢失
      beforeDialogOpen({ form }, mode) {
        if (mode === 'edit') {
          form.password = '';
        }
      },
      startUse(rowData) {
        enable({ id: rowData.id }).then(() => {
          rowData.state = 0;
          this.$message.success('保存成功');
        });
      },
      endUse(rowData) {
        disable({ id: rowData.id }).then(() => {
          rowData.state = -1;
          this.$message.success('保存成功');
        });
      },
    },
  };
</script>
