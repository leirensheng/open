export default function generateColumnConfig(that) {
  return [{
          name: "1. 基本属性",
          id: "基本属性",
          isShow: false,
          queryType: "title",
          support: [{
                  name: "add",
                  disabled: false
              },
              {
                  name: "edit",
                  disabled: false
              }
          ]
      },
      {
          name: "ID",
          id: "id",
          isShow: false
      },
      {
          name: "业务",
          id: "busId",
          isShow: false,
          queryType: "select",
          clearable: true,
          options: [],
          className: "基本属性",
          changeEvent: true,
          eventName: "busChange",
          source: () => that.$store.dispatch("getBusinessList"),
          sourceFormat: {
              label: "busName",
              value: "id"
          },
          sourceConstrutor: "businesses",
          tips: "为空则代表规则对所有业务生效",
          support: [{
                  name: "query",
                  disabled: false
              },
              {
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: true,
                  show: true
              }
          ]
      },
      {
          name: "内容类型",
          id: "contentType",
          options: [],
          queryType: "select",
          clearable: true,
          tableShowAlone: true,
          className: "基本属性",
          changeEvent: true,
          eventName: "contentTypeChange",
          source: () => that.$store.dispatch("getAuditContentType"),
          tips: "为空则代表对该业务所有内容类型生效",
          support: [{
                  name: "query",
                  disabled: false
              },
              {
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "配置描述",
          id: "dupName",
          width: 150,
          required: true,
          className: "基本属性",
          tableShowAlone: true,

          tips: "请描述当前规则代码的业务意义",

          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "规则分类",
          id: "operationClass",
          className: "基本属性",
          tableShowAlone: true,
          tips: "请选择规则分类",
          queryType: "select",
          source: () => that.$store.dispatch("getOperationClasses"),
          support: [{
                  name: "query",
                  disabled: false
              },

              {
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "2. 复审规则",
          id: "复审规则",
          isShow: false,
          queryType: "title",
          subText: "（所有规则的配置都是且的关系，没有或的关系）",
          support: [{
                  name: "add",
                  disabled: false
              },
              {
                  name: "edit",
                  disabled: false
              }
          ]
      },
      {
          name: "复审触发点",
          id: "triggerPoint",
          className: "复审规则",
          tableShowAlone: true,
          tips: "请选择复审触发点",
          queryType: "select",
          changeEvent: true,
          eventName: "triggerPointChange",
          source: () => that.$store.dispatch("getTriggerPoints"),
          support: [{
                  name: "query",
                  disabled: false
              },
              {
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "复审业务优先级",
          id: "dupBizPriority",
          className: "复审规则",
          triggerPointShow: [0],
          tableClassName: "命中规则",
          tips: "请填写复审业务优先级，范围0-120",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "一审业务优先级",
          id: "bizPriority",
          className: "复审规则",
          tableClassName: "命中规则",
          triggerPointShow: [0, 1, 2],
          tips: "请填写一审业务优先级，范围0-100",
          queryType: "select",
          optionsForTable: [],
          source: () => that.$store.dispatch("listBizPriority", `busId=1`),
          sourceFormat: {
              label: "comment",
              value: "priorityVal"
          },
          support: [{
                  name: "query",
                  disabled: true
              },
              {
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "人审审核区",
          id: "auditType",
          className: "复审规则",
          tableClassName: "命中规则",
          queryType: "multipleSelect",
          triggerPointShow: [2],
          options: [],
          tips: "请选择人审审核区，可多选",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ],
          source: () =>
              Promise.resolve(that.$store.getters.app_constant.audit_type)
      },
      {
          name: "人审结果",
          id: "auditResult",
          className: "复审规则",
          tableClassName: "命中规则",
          options: [],
          triggerPointShow: [2],
          queryType: "multipleSelect",
          tips: "请选择人审结果，可多选",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ],
          source: () => that.$store.dispatch("getAuditResults")
      },
      {
          name: "人审问题类型",
          id: "problemType",
          options: [],
          className: "复审规则",
          tableClassName: "命中规则",
          queryType: "multipleSelect",
          sourceFormat: {
              label: "text",
              value: "value"
          },
          tips: "请选择人审问题类型，可多选",
          triggerPointShow: [2],
          support: [{
                      name: "add",
                      disabled: false,
                      show: true
                  },
                  {
                      name: "edit",
                      disabled: false,
                      show: true
                  }
              ]
              // source: () => Promise.resolve(that.$store.getters.app_constant.audit_type)
      },
      {
          name: "机审应用点",
          id: "appId",
          options: [],
          width: 200,
          className: "复审规则",
          tableClassName: "命中规则",
          queryType: "multipleSelect",
          triggerPointShow: [1, 2, 5],
          // showAlone: true,
          tips: "请选择机审应用点，可多选",
          // defaultProps: {
          //     children: "children",
          //     label: "text",
          //     value: "id"
          // },
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ],
          sourceFormat: {
              label: "appName",
              value: "appId"
          },

          source: () => that.$store.dispatch("moduleApp")
              // valueArr: [],
              // multipleValueArr: [],
              // formatter(val) {
              //     let target = that.options.find(
              //         one =>
              //             one.children &&
              //             one.children.find(
              //                 oneChild =>
              //                     oneChild.children &&
              //                     oneChild.children.find(
              //                         item => item.id == val
              //                     )
              //             )
              //     );
              //     let target2 = target.children.find(
              //         one =>
              //             one.children &&
              //             one.children.find(
              //                 oneChild => oneChild.id == val
              //             )
              //     );
              //     that.valueArr = [target.id, target2.id, val];
              //     return target2.children.find(one => one.id == val).text;
              // }
      },
      {
          name: "机审问题类型",
          id: "mProblemType",
          options: [],
          sourceFormat: {
              label: "name",
              value: "id"
          },
          queryType: "select",
          className: "复审规则",
          tableClassName: "命中规则",
          tips: "请选择机审问题类型",
          triggerPointShow: [1, 2, 5],
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ],
          source: () => that.$store.dispatch("queryViolation")
      },
      {
          name: "机审分区",
          id: "auditPartition",
          options: [],
          className: "复审规则",
          tableClassName: "命中规则",
          triggerPointShow: [1, 2, 5],
          queryType: "select",
          tips: "请选择机审分区",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "模块ID",
          id: "moduleId",
          options: [],
          className: "复审规则",
          tableClassName: "命中规则",
          tips: "请选择模块ID，可多选",
          triggerPointShow: [0, 1, 2, 5],
          queryType: "multipleSelect",
          sourceFormat: {
              label: "text",
              value: "id"
          },
          source: () => that.$store.dispatch("getModuleIds"),
          support: [{
                  name: "add",
                  disabled: true,
                  show: true
              },
              {
                  name: "edit",
                  disabled: true,
                  show: true
              }
          ]
      },
      // {
      //     name: "复审路由节点",
      //     id: "auditRouteType",
      //     options: [],
      //     queryType: "select",
      //     className: "复审规则",
      //     tableClassName: "命中规则",
      //     tips: "请选择复审路由节点",
      //     support: [
      //         { name: "add", disabled: false },
      //         { name: "edit", disabled: false }
      //     ],
      //     source: () => that.$store.dispatch("getAuditRoutes")
      // },

      {
          name: "人审结果交叉审规则",
          id: "manualResultCompare",
          className: "复审规则",
          defaultArr: true,
          triggerPointShow: [2],
          tableClassName: "命中规则",
          showAlone: true,
          width: 250,
          tips: "请选择人审结果交叉审规则",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "应用点结果规则",
          tips: "请填写应用点结果规则",
          id: "appResult",
          width: 250,
          triggerPointShow: [1, 2, 5],
          className: "复审规则",
          tableClassName: "命中规则",
          defaultArr: true,
          showAlone: true,
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "机审结果匹配规则",
          id: "appTypePartition",
          width: 150,
          className: "复审规则",
          triggerPointShow: [1, 2, 5],
          tableClassName: "命中规则",
          defaultArr: true,
          align: "left",
          showAlone: true,
          tips: "请填写机审结果匹配规则",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "其它审核前置条件",
          id: "otherCondition",
          showAlone: true,
          className: "复审规则",
          tableClassName: "命中规则",
          defaultArr: true,
          triggerPointShow: [0, 1, 2, 5],
          width: 200,
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "3. 复审结果",
          id: "复审结果",
          isShow: false,
          queryType: "title",
          support: [{
                  name: "add",
                  disabled: false
              },
              {
                  name: "edit",
                  disabled: false
              }
          ]
      },
      {
          name: "新审核区",
          id: "dupAuditType",
          required: true,
          queryType: "select",
          className: "复审结果",
          clearable: true,
          tableShowAlone: true,
          tips: "请选择新审核区",
          source: () =>
              Promise.resolve(that.$store.getters.app_constant.audit_type),
          support: [{
                  name: "query",
                  disabled: false
              },
              {
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "审核流程",
          id: "auditNode",
          isShow: false,
          clearable: true,
          tips: "请选择审核流程",
          queryType: "select",
          source: () => that.$store.dispatch("getAuditNodes"),
          support: [{
              name: "query",
              disabled: false
          }]
      },
      {
          name: "审核节点",
          id: "appType",
          isShow: false,
          options: [],
          tips: "请选择审核节点",
          queryType: "select",
          support: [{
                      name: "add",
                      disabled: false,
                      show: false
                  },
                  {
                      name: "edit",
                      disabled: false,
                      show: false
                  }
              ]
              // source: () => that.$store.dispatch("getAuditNodes"),
              // support: [{ name: "query", disabled: false }]
      },
      {
          name: "新专审通道",
          id: "channelName",
          tableShowAlone: true
      },
      // 无参数获取的专审通道无效，这里仅仅为了生成formatter
      {
          name: "新专审通道",
          id: "channelId",
          isShow: false,
          className: "复审结果",
          align: "right",
          options: [],
          sourceFormat: {
              label: "text",
              value: "value"
          },
          queryType: "select",
          source: () => that.$store.dispatch("auditchannelSingle"),
          tips: "请选择专审通道",
          support: [{
                  name: "add",
                  disabled: true,
                  show: true
              },
              {
                  name: "edit",
                  disabled: true,
                  show: true
              }
          ]
      },
      {
          name: "新数据最终优先级",
          id: "priority",
          className: "复审结果",
          tableShowAlone: true,
          tips: "请填写新数据最终优先级，范围0-120",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "新数据机审分区",
          id: "dupAuditPartition",
          className: "复审结果",
          tableClassName: "命中结果",
          options: [],
          queryType: "select",
          tips: "请填写新数据机审区，为空则根据节点计算机审结果",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "透传给业务的标识",
          id: "dupBusType",
          className: "复审结果",
          tableClassName: "命中结果",
          options: [],
          width: 150,
          queryType: "select",
          tips: "请选择透传给业务的标识",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ],
          source: () => that.$store.dispatch("getDupBusTypes")
      },
      {
          name: "数据处理结果",
          id: "dupOperationType",
          className: "复审结果",
          tableShowAlone: true,
          options: [],
          required: true,
          queryType: "select",
          tips: "请选择数据处理结果",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ],
          source: () => that.$store.dispatch("getDupOperationTypes")
      },
      {
          name: "复审规则优先级",
          id: "matchOrder",
          className: "复审结果",
          tableShowAlone: true,
          required: true,
          tips: "请填写复审规则优先级（由大到小），范围0-120",
          support: [{
                  name: "add",
                  disabled: false,
                  show: true
              },
              {
                  name: "edit",
                  disabled: false,
                  show: true
              }
          ]
      },
      {
          name: "修改人",
          id: "modifier",
          tableShowAlone: true
      },
      {
          name: "修改时间",
          id: "modifyTimeStr",
          width: 150,
          tableShowAlone: true
      },
      // {
      //     name: "回调类型",
      //     id: "callbackType",
      //     className: "复审结果",
      //     tableClassName: "命中结果",
      //     options: [],
      //     queryType: "select",
      //     tips: "请选择回调类型",
      //     support: [
      //         { name: "add", disabled: false },
      //         { name: "edit", disabled: false }
      //     ],
      //
      //     source: () => that.$store.dispatch("getCallbackTypes")
      // },

      {
          name: "计算方法",
          isShow: false,
          id: "calMethodList",
          options: [],
          support: [{
                  name: "add",
                  disabled: false,
                  show: false
              },
              {
                  name: "edit",
                  disabled: false,
                  show: false
              }
          ],
          source: () => that.$store.dispatch("getCalMethod")
      },
      {
          name: "其它条件字段名",
          isShow: false,

          id: "columnCodeForOther",
          options: [],
          support: [{
                  name: "add",
                  disabled: false,
                  show: false
              },
              {
                  name: "edit",
                  disabled: false,
                  show: false
              }
          ],
          source: () => that.$store.dispatch("getColumnCodeList")
      },
      {
          name: "机审分区",
          isShow: false,
          id: "partitionList",
          options: [],
          support: [{
                  name: "add",
                  disabled: false,
                  show: false
              },
              {
                  name: "edit",
                  disabled: false,
                  show: false
              }
          ],
          source: () => that.$store.dispatch("getPartitions")
      }
  ];
}
