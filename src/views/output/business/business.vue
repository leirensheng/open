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
      :get-data="list"
      :basic-add-form="basicAddForm"
      :basic-query-form="basicQueryForm"
      @addIdChange="handleIdChange" />
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';
  import { list, update, add } from '@/api/systemSupplier';
  import { findSupplerById } from '@/api/base';

  export default {
    name: 'Business',

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
        systemName: '',
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
            options: [{ name: '华南', id: 4 }, { name: '花呗', id: 2 }],
          },
          {
            name: '正式对接秘钥',
            id: 'appSecret',
          },

          {
            name: '状态',
            id: 'state',
            queryType: 'select',
            required: true,
            options: [{ name: '启用', id: 0 }, { name: '禁用', id: -1 }],
            support: {
              add: { type: 'radio' },
              edit: { type: 'radio' },
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
          source: this.nameSourceMaps[this.systemName],
        };
      },
    },
    created() {
      console.log(1);
      this.systemName = this.$route.query.systemName;
    },
    methods: {
      //  供应商id变化处理
      handleIdChange({
        form,
      }) {
        findSupplerById({ id: form.supplierId }).then(({ model: { orgName } }) => {
          form.supplierName = orgName;
        });
      },
      list,

    },
  };
</script>
