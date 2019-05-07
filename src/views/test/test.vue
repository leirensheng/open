<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :get-data="getData"
      :page-title="pageTitle"
      @tableBtnTest="tableBtnTest"
      @refreshChange="refresh" />
  </div>
</template>
<script>
  import vTable from '../../components/vTable/vTable.vue';

  export default {
    components: {
      vTable,
    },
    data() {
      return {
        pageTitle: '标题呀',
        tableBtnsConfig: [
          {
            name: '编辑',
            eventName: 'tableBtnTest',
            // disabled: item => item.busId === 1,
            // show: item => item.busId == 2,
            editConfig: {
              title: 'dialog标题',
              handler: form => this.handleEdit(form),
            },
          },
          {
            name: '其他的',
            eventName: 'tableBtnTest',
            // disabled: item => item.busId === 1,
            // show: item => item.busId == 2,
          },
        ],
        topBtnsConfig: [
          {
            name: '新增',
            addConfig: {
              title: '新增',
              handler: form => this.handlerAdd(form),
            },
            eventName: 'refreshChange',
          },
        ],
        columns: [
          {
            name: '天启信息',
            subText: 'hhhh',
            queryType: 'title',
            support: [
              {
                name: 'add',
                disabled: false,
                show: true,
              },
              {
                name: 'edit',
                disabled: true,
                show: true,
              },
            ],
          },
          {
            name: '业务',
            id: 'busId',
            // isShow: true,
            queryType: 'select',
            clearable: true,
            options: [],
            required: true,

            className: '基本属性',
            eventName: 'busChange',
            source: () => Promise.resolve([{ busName: 'abc', id: 1 }, { busName: 'bcd', id: 2 }]),
            sourceFormat: {
              label: 'busName',
              value: 'id',
            },
            sourceConstrutor: 'businesses',
            tips: '为空则代表规则对所有业务生效',
            support: [{
                        name: 'query',
                        disabled: false,
                      },
                      {
                        name: 'add',
                        disabled: false,
                        show: true,
                      },
                      {
                        name: 'edit',
                        disabled: true,
                        show: true,
                      },
            ],
          },
          {
            name: '文章',
            id: 'article',
            support: [{
                        name: 'query',
                        disabled: false,
                      },
                      {
                        name: 'add',
                        disabled: false,
                        show: true,
                      },
                      {
                        name: 'edit',
                        disabled: false,
                        show: true,
                      },
            ],
          },
          {
            name: '独立创造',
            id: 'author',
            queryType: 'radio',
            options: [{ name: '是', id: 1 }, { name: '否', id: 0 }],
            support: [
              {
                name: 'add',
                disabled: false,
                show: true,
              },
              {
                name: 'edit',
                disabled: false,
                show: true,
              },
            ],
          },
          {
            name: '内容类型',
            id: 'contentType',
            options: [],
            queryType: 'select',
            clearable: true,
            tableShowAlone: true,
            className: '基本属性',
            changeEvent: true,
            eventName: 'contentTypeChange',
            source: () => Promise.resolve([{ name: '类型1', id: 1 }, { name: '类型2', id: 2 }]),
            tips: '为空则代表对该业务所有内容类型生效',
            support: [{
                        name: 'query',
                        disabled: false,
                      },
                      {
                        name: 'add',
                        disabled: false,
                        show: true,
                      },
                      {
                        name: 'edit',
                        disabled: false,
                        show: true,
                      },
            ],
          },
        ],
      };
    },
    methods: {
      handleEdit(form) {
        return Promise.resolve(1);
      },
      handlerAdd(form) {
        return Promise.resolve(12);
      },
      refresh(data, queryParams) {
        console.log(data, queryParams);
      },
      tableBtnTest(row, tableData) {
        console.log(row, tableData);
      },
      getData() {
        const data = {
          data: [{
            busId: 2, contentType: 2, article: 'repubilChina', author: 1,
          }, {
            busId: 1, contentType: 1, article: 'Tellyou', author: 0,
          }],
          total: 1,
          code: 0,
        };
        return Promise.resolve(data);
      },
      test() {
        console.log('表格内');
      },
    },
  };
</script>
