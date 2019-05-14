<template>
  <div>
    <div class="systemName">
      {{ systemName }}
    </div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :basic-add-form="basicAddForm"
      :basic-query-form="basicQueryForm"
      :get-data="list"
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
        nameSourceMaps: {
          大有: 1,
          长远: 2,
          用心: 3,
        },
        tableBtnsConfig: [
          {
            name: '编辑',
            editConfig: {
              title: '车品牌字典匹配关系',
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
            noShow: true,
            required: true,
            support: ['add'],
          },
          {
            name: '供应商ID',
            id: 'supplierId',
          },
          {
            name: '测试秘钥',
            id: 'secret',
          },

          {
            name: '状态',
            id: 'state',
            queryType: 'radio',
            required: true,

            options: [{ name: '启用', id: 0 }, { name: '禁用', id: -1 }],
            support: ['add', 'query', 'edit'],
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
          source: this.nameSourceMaps[this.systemName],
        };
      },
      systemName() {
        return this.$route.query.systemName;
      },
    },
    methods: {
      list,
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
