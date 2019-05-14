<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :get-data="list"
      :label-width="'120px'"
      @endUse="handleEndUse"
      @startUse="handleStartUse" />
  </div>
</template>
<script>
  import vTable from '../../components/vTable/vTable.vue';
  import {
    list, add, update, enable, disable,
  } from '@/api/user';


  export default {
    name: 'Member',
    components: {
      vTable,
    },

    data() {
      return {
        tableBtnsConfig: [
          {
            name: '编辑',
            editConfig: {
              title: '人员编辑',
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
            btnType: 'success',
            addConfig: {
              title: '新增人员',
              handler: add,
            },
          },
        ],
        columns: [

          {
            name: '账号',
            id: 'username',
            required: true,
            support: ['query', 'add', 'edit'],
          },
          {
            name: '密码',
            id: 'password',
            isShow: false,
            required: true,
            support: ['add', 'edit'],
            getValidator(ctx) {
              return function (rule, value, callback) {
                ctx.$refs.form.validateField('confirmpassword');
                callback();
              };
            },

          },
          {
            name: '确认密码',
            id: 'confirmpassword',
            isShow: false,
            required: true,
            support: ['add'],
            getValidator(ctx) {
              return function (rule, value, callback) {
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else if (value !== ctx.form.password) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              };
            },
          },
          {
            name: '用户名',
            id: 'name',
            required: true,
            support: ['query', 'add', 'edit'],
          },
          {
            name: '联系电话',
            id: 'telephone',
            support: ['add', 'edit'],
          },
          {
            name: '状态',
            id: 'state',
            queryType: 'select',
            options: [{ name: '启用', id: 0 }, { name: '禁用', id: -1 }],
            support: ['add', 'edit', 'query'],
          },
          {
            name: '最近更新人',
            id: 'updateUser',
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
    },
  };
</script>
