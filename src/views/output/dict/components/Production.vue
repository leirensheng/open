<template>
  <div>
    <v-table
      :table-btns-config="tableBtnsConfig"
      :top-btns-config="topBtnsConfig"
      :columns="columns"
      :label-width="'130px'"
      :get-data="getData">
      <div slot="tips">
        <div>
          填入对接系统配件产地名称，表示对接系统传入此名称时，系统识别为巴图鲁的“xxx”配件产地。不填则接口不会接入"xxx“产地的数据
        </div>
      </div>

      <div slot="template">
        <span>
          导入为覆盖式更新， 请务必 <span>下载导入模板</span>
        </span>
      </div>
    </v-table>
  </div>
</template>
<script>
  import vTable from '@/components/vTable/vTable.vue';

  export default {
    components: {
      vTable,
    },
    data() {
      return {
        tableBtnsConfig: [
          {
            name: '编辑',
            editConfig: {
              title: '配件产地字典匹配关系',
            },
          },
        ],
        topBtnsConfig: [
          {
            name: '字典导出',
            eventName: 'exportDict',
          },
          {
            name: '字典导入',
            eventName: 'importDict',
          },
          {
            type: 'slot',
            slotName: 'template',
            // name: '字典导入',
          },
        ],
        columns: [
          {
            name: '巴图鲁',
            queryType: 'title',
            support: ['edit'],
          },
          {
            name: '巴图鲁配件产地名称',
            id: 'id',
            required: true,
            support: {
              edit: {
                dialogName: '配件产地名称',
                disabled: true,
              },
            },
          },

          {
            name: '对接系统',
            queryType: 'title',
            support: ['edit'],
          },
          {
            name: '对接系统配件产地名称',
            id: 'name2',
            support: {
              edit: {
                dialogName: '配件产地名称',
              },
            },
          },
          {
            queryType: 'slot',
            slotName: 'tips',
            support: ['edit'],
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


      getData() {
        const data = {
          data: [{
            id: '1552137',
            name: '测试供应商1',
            name2: 'ffff',

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
            name2: 'dddd',

            mainPart: 1,
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
