<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :get-data="getData"
      :label-width="'120px'"
      @endUse="handleEndUse"
      @startUse="handleStartUse" />
  </div>
</template>
<script>
  import vTable from '../../components/vTable/vTable.vue';

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
              title: '新增人员',
            },
          },
        ],
        columns: [

          {
            name: '账号',
            id: 'account',
            required: true,
            support: ['query', 'add', 'edit'],
          },
          {
            name: '密码',
            id: 'password',
            isShow: false,
            required: true,
            support: ['add', 'edit'],
          },
          {
            name: '确认密码',
            id: 'confirmpassword',
            isShow: false,
            required: true,
            support: ['add'],
          },
          {
            name: '用户名',
            id: 'userName',
            required: true,
            support: ['query', 'add', 'edit'],
          },
          {
            name: '联系电话',
            id: 'phone',
            support: ['add', 'edit'],
          },
          {
            name: '状态',
            id: 'status',
            queryType: 'radio',
            options: [{ name: '启用', id: 1 }, { name: '禁用', id: 0 }],
            support: ['add', 'edit'],
          },
          {
            name: '最近更新人',
            id: 'lastModify',
          },
        ],
      };
    },
    methods: {
      handleStartUse() {},
      handleEndUse() {},


      getData() {
        const data = {
          data: [{
            phone: '1552137',
            account: 'leirensheng',
            userName: 'syk',
            status: 1,
            lastModify: 'jon',
          }, {
            phone: '4545',

            account: 'dongx',
            userName: 'her',
            status: 0,
            lastModify: 'sddd',
          }],
          total: 1,
          code: 0,
        };
        return Promise.resolve(data);
      },

    },
  };
</script>
