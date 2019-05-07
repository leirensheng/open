<template>
    <div class="dup">
        <h2 class="title">流程规则配置</h2>
        <div class="content">
            <div class="top">
                <el-popover ref="popover1" placement="top-start" width="200" trigger="hover" content="不懂点我～">
                </el-popover>
                <i class="el-icon-question" @click="goToDocument" v-popover:popover1 style="font-size: 1.1rem; cursor: pointer;margin-right: 6px"></i>
                <div class="selContainer" v-for="(column,index) in columns " :key="index" v-if="column.support&&column.support.find(one=>one.name=='query')">
                    <el-select size="small" :disabled="column.support.find(one=>one.name=='query').disabled" style="width:102px" v-if="column.queryType=='select'" v-model="queryParams[column.id]" filterable :placeholder="column.name" :clearable="true" @change="(val)=>{handleQueryChange(val,column.id)}">
                        <el-option v-for="(option,index) in column.optionsForTable||column.options" :key="index" :value="column.sourceFormat?option[column.sourceFormat.value]:option.id" :label="column.sourceFormat?option[column.sourceFormat.label]: option.text"></el-option>
                    </el-select>
                </div>
                <div class="selContainer" v-if="currentCount==initCount">
                    <el-button type="primary" @click="search(true)" size="small">查询</el-button>
                    <el-button type="primary" @click="add" size="small">添加配置</el-button>
                    <el-button @click="watchLog" size="mini">操作日志</el-button>
                    <el-button type="danger" v-if="multipleSelection.length" @click="deleteSel" size="small">删除选中项</el-button>
                </div>
            </div>
            <div class="table">
                <el-table @selection-change="handleSelectionChange" :data="tableDataHandled" border v-loading="loading" v-if="currentCount==initCount&&columnWidthCalculated ">
                    <el-table-column type="selection" align="center" width="55">
                    </el-table-column>
                    <el-table-column :label="one.name" header-align="center" :align="one.align||'center'" v-for="(one,index) of tableColumnHandled" :key="index" v-if="tableColumnHandled.length" :min-width="one.width||100">
                        <template slot-scope="scope">

                            <div v-if="one.children">
                                <div v-if="scope.row[oneColumn.id]||scope.row[oneColumn.id]===0" v-for="(oneColumn,indexForColumn) of one.children" :key="indexForColumn" class="oneColumnContainer">
                                    <div class="columnTitle">{{oneColumn.name}}</div>

                                    <!--命中规则-->
                                    <div v-if="oneColumn.id=='appTypePartition'">
                                        <div v-for="(oneRule,index) in scope.row.appTypePartition" :key="index" class="oneRule">
                                            <div class="ruleRow">（{{index+1}}）</div>

                                            <div class="ruleRow">审核节点：{{columns.find(one=>one.id=="appType").options.find(one=>one.id==oneRule.appType).text}}</div>

                                            <div class="ruleRow">
                                                分区：{{oneRule.partition.map(id=>columns.find(one=>one.id=='partitionList').options.find(one=>id == one.id).text).join(',') }}
                                            </div>
                                        </div>

                                    </div>

                                    <!-- 前置条件 -->
                                    <div v-else-if="oneColumn.id=='otherCondition'">
                                        <div v-for="(oneAuditPartionObj,index) in scope.row.otherCondition" :key="index" style="padding:6px">
                                            <div>
                                                <span>
                                                    {{index+1+'.'}}
                                                </span>
                                                <span>
                                                    {{columns.find(one=>one.id=='columnCodeForOther').options.find(one=>one.value===oneAuditPartionObj.columnCode).text}}
                                                </span>

                                                <span>
                                                    {{calMethodList.find(one=> oneAuditPartionObj.calculationMethod == one.id)&&calMethodList.find(one=> oneAuditPartionObj.calculationMethod == one.id).text}}
                                                </span>
                                                <span>
                                                    {{oneAuditPartionObj.columnValue}}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 人审交叉 -->
                                    <div v-else-if="oneColumn.id=='manualResultCompare'">
                                        <div v-for="(oneAuditPartionObj,index) in scope.row.manualResultCompare" :key="index" style="padding:6px">
                                            <div>
                                                <span>
                                                    {{index+1+'.'}}
                                                </span>
                                                <span>
                                                    {{oneAuditPartionObj.auditType.map(val=>columns.find(one=>one.id=="auditType").formatter(val)).join(',')}}
                                                </span>

                                                <span>
                                                    {{oneAuditPartionObj.auditResult.map(val=>columns.find(one=>one.id=="auditResult").formatter(val)).join(',')}}
                                                </span>

                                            </div>
                                        </div>
                                    </div>

                                    <!--命中结果-->
                                    <div class="oneColumn" v-else-if="oneColumn.id=='appResult'">
                                        <div v-for="(oneAuditPartionObj,index) in scope.row.appResult" :key="index" class="auditPartition">
                                            <div class="title">
                                                {{columns.find(one=>one.id=='appId').formatter(oneAuditPartionObj.appId)}}
                                            </div>
                                            <div class="rule">
                                                <div class="oneRule" v-for="(oneRuleObj,index) in oneAuditPartionObj.rule" :key="index">
                                                    <span>
                                                        {{index+1+'.'}}
                                                    </span>
                                                    <span v-if="oneAuditPartionObj.appResultParams">
                                                        {{JSON.parse(oneAuditPartionObj.appResultParams).find(one=>one.value==oneRuleObj.columnCode)?JSON.parse(oneAuditPartionObj.appResultParams).find(one=>one.value==oneRuleObj.columnCode).text:oneRuleObj.columnCode}}
                                                    </span>

                                                    <span>
                                                        {{calMethodList.find(one=> oneRuleObj.calculationMethod == one.id)&&calMethodList.find(one=> oneRuleObj.calculationMethod == one.id).text}}
                                                    </span>
                                                    <span>
                                                        {{oneRuleObj.columnValue}}
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="oneColumn.id=='bizPriority'">
                                        {{oneColumn.formatterForTable(scope.row.bizPriority)}}
                                    </div>
                                    <div v-else class="columnContent">
                                        {{oneColumn.formatter? (Array.isArray(scope.row[oneColumn.id])? scope.row[oneColumn.id].map(val=>oneColumn.formatter(val)).join(',') :oneColumn.formatter(scope.row[oneColumn.id])):scope.row[oneColumn.id]}}
                                    </div>

                                </div>
                            </div>
                            <div v-else-if="one.tableShowAlone" style="line-height:19px">
                                {{one.formatter? (Array.isArray(scope.row[one.id])? scope.row[one.id].map(val=>one.formatter(val)).join(',') :one.formatter(scope.row[one.id])):scope.row[one.id]}}
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination v-show="tableDataHandled.length" :currentPage=pageNo :total=total :pageSizes=pageSizes :pageSize="pageSize" v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></Pagination>

            </div>
        </div>
        <log-dialog :inputs="dataForLogDialog"></log-dialog>
        <dup-dialog ref="dialog" :inputs="dataForDialog" :items="columns" @busChange="updateBusId" @contentTypeChange="updateContentType" @triggerPointChange="handleTriggerPointChange" @edit="confirmEditOrAdd" @add="confirmEditOrAdd"></dup-dialog>
    </div>
</template>
<script>
// import fakeData from "./fackData";
import dupDialog from "./dupDialog";
import logDialog from "../keyword/logDialog.vue";
import Pagination from "components/common/Pagination";
import generateColumnConfig from "./columnConfig";
export default {
    components: { Pagination, dupDialog, logDialog },

    data() {
        return {
            timmer: "",
            dataForDialog: {
                mode: "",
                title: "",
                show: false,
                form: "",
                items: [],
                labelWidth: "150px",
                loading: false,
                defaultValue: {
                    busId: "",
                    contentType: ""
                },
                dataChangeFormParent: {}
            },
            dataForLogDialog: {
                noNeedToFormat: [],
                dataWidth: "300",
                title: "所有————操作日志",
                show: false,
                loading: false,
                columns: [],
                modelKey: ""
            },
            multipleSelection: [],
            total: 0,
            pageSize: 20,
            pageSizes: [20, 50, 100],
            pageNo: 1,
            columnWidthCalculated: false,
            queryParams: {},
            loading: false,
            tableDataHandled: [],
            initCount: 0,
            currentCount: 0,
            tableColumnName: ["命中规则", "命中结果"],
            tableColumnHandled: [],
            columns: generateColumnConfig(this)
        };
    },
    computed: {
        calMethodList() {
            return this.columns.find(one => one.id == "calMethodList").options;
        }
    },
    watch: {
        tableDataHandled: {
            handler() {
                this.columnWidthCalculated = false;
                let num = 1;
                // if (this.tableDataHandled.length) {
                //     num = Math.max(
                //         ...this.tableDataHandled.map(
                //             row => (row.appResult ? row.appResult.length : 1)
                //         )
                //     );
                // }
                this.$nextTick(() => {
                    this.columnWidthCalculated = true;
                });
                this.columns.find(one => one.id == "appResult").width = 100;
            },
            deep: true
        },
        currentCount(val) {
            if (val == this.initCount) {
                this.handleColumnForTable();
            }
        }
    },
    methods: {
        findFormatter(id) {
            return this.columns.find(one => one.id == id).formatter;
        },
        generateFormatterForArr(id) {
            return arr => arr.map(one => this.findFormatter(id)(one)).join(",");
        },
        handleColumnForLogDialog() {
            // console.log("=======================column=============");
            let specialColumn = [
                { label: "创建时间", prop: "createTime" },
                {
                    label: "应用点结果规则",
                    prop: "appResult",
                    children: [
                        { label: "应用点", prop: "appId" },
                        {
                            label: "规则",
                            prop: "rule",
                            children: [
                                {
                                    label: "columnCode",
                                    prop: "columnCode"
                                },
                                {
                                    label: "值",
                                    prop: "columnValue"
                                },
                                {
                                    label: "判断类型",
                                    prop: "calculationMethod",
                                    formatter: val =>
                                        this.findFormatter("calMethodList")(val)
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "人审结果交叉审规则",
                    prop: "manualResultCompare",
                    children: [
                        {
                            label: "审核区",
                            prop: "auditType",
                            formatter: arr =>
                                this.generateFormatterForArr("auditType")(arr)
                        },
                        {
                            label: "结果",
                            prop: "auditResult",
                            formatter: arr =>
                                this.generateFormatterForArr("auditResult")(arr)
                        }
                    ]
                },
                {
                    label: "机审结果匹配规则",
                    prop: "appTypePartition",
                    children: [
                        { label: "审核节点", prop: "appType" },
                        {
                            label: "机审结果",
                            prop: "rule",
                            formatter: arr =>
                                this.generateFormatterForArr("auditPartition")(arr)
                        }
                    ]
                },
                {
                    label: "其它审核前置条件",
                    prop: "otherCondition",
                    children: [
                        {
                            label: "columnCode",
                            prop: "columnCode",
                            formatter: val =>
                                this.findFormatter("columnCodeForOther")(val)
                        },
                        {
                            label: "值",
                            prop: "columnValue"
                        },
                        {
                            label: "判断类型",
                            prop: "calculationMethod",
                            formatter: val =>
                                this.findFormatter("calMethodList")(val)
                        }
                    ]
                }
            ];
            let columns = [...this.columns].filter(one =>
                !specialColumn
                    .map(oneColumn => oneColumn.prop)
                    .includes(one));

            // let columns = [];
            columns.forEach(one => {
                one.label = one.name;
                one.prop = one.id;

                if (this.dataForLogDialog.noNeedToFormat.includes(one.id)) {
                    one.formatterForLogDialog = val => val;
                } else if (one.queryType == "multipleSelect") {
                    one.formatterForLogDialog = function(val) {
                        let arr =
                            typeof val === "string" ? JSON.parse(val) : val;
                        return arr
                            .map(oneValue => one.formatter(oneValue))
                            .join(",");
                    };
                } else if (one.id == "channelId") {
                    delete one.formatterForLogDialog;
                } else if (one.id == "bizPriority") {
                    one.formatterForLogDialog = one.formatterForTable;
                }
            });
            columns.push(specialColumn);
            this.dataForLogDialog.columns = columns;
        },
        watchLog() {
            this.dataForLogDialog.tableName = "XTDupAuditConfig";
            this.dataForLogDialog.loading = true;

            this.dataForLogDialog.modelKey = this.queryParams.busId;
            if (this.dataForLogDialog.modelKey) {
                this.dataForLogDialog.noNeedToFormat = ["problemType"];

                let name = this.findFormatter("busId")(this.dataForLogDialog.modelKey);
                this.dataForLogDialog.title = `${name}————操作日志`;
                this.getChannelIds({ busId: this.queryParams.busId },
                    false).then(() => {
                    this.handleColumnForLogDialog();
                    this.dataForLogDialog.show = true;
                });
            } else {
                this.dataForLogDialog.noNeedToFormat = [
                    "channelId",
                    "problemType"
                ];
                this.handleColumnForLogDialog();
                this.dataForLogDialog.title = `所有—————操作日志`;
                this.dataForLogDialog.show = true;
            }
        },
        // 查询条件变化
        handleQueryChange(val, id) {
            if (id == "busId") {
                this.getlistBizPriority(val, false, "query").then(() => {
                    this.queryParams.bizPriority = "";
                });
            }
        },
        handleTriggerPointChange(val) {
            this.dataForDialog.items.forEach(one => {
                if (one.hasOwnProperty("triggerPointShow")) {
                    let condition = [
                        ...one.triggerPointShow,
                        undefined,
                        ""
                    ].includes(val);
                    if (condition) {
                        one.support.forEach(mode => {
                            mode.show = true;
                        });
                    } else {
                        one.support.forEach(mode => {
                            mode.show = false;
                        });

                        if (one.id in this.$refs.dialog.form) {
                            let resetData =
                                one.defaultArr ||
                                one.queryType == "multipleSelect"
                                    ? []
                                    : "";
                            this.$refs.dialog.form[one.id] = resetData;
                        }
                    }
                }
            });
        },
        handleColumnForTable() {
            let columnShowAlone = this.columns.filter(one => one.tableShowAlone);
            this.tableColumnHandled.push(...columnShowAlone);

            for (let oneColumnName of this.tableColumnName) {
                let obj = { name: oneColumnName };
                let columns = this.columns.filter(one =>
                    one.tableClassName == oneColumnName &&
                        !one.tableShowAlone &&
                        one.isShow !== false);
                let maxWidth = Math.max(...columns.map(one => one.width || 120));
                this.$set(obj, "children", columns);
                this.$set(obj, "width", maxWidth);
                this.$set(obj, "align", "left");

                this.tableColumnHandled.push(obj);
            }
        },
        goToDocument() {
            window.open("https://lark.alipay.com/dy5789/fwrwag/tulgwd");
        },
        //          把选中的数据传入
        handleSelectionChange(rows) {
            this.multipleSelection = rows;
        },
        deleteSel() {
            this.$confirm("确定要删除吗？").then(() => {
                let body = {
                    ids: this.multipleSelection.map(one => one.id)
                };
                this.$store
                    .dispatch("deleteDupApp", {
                        body
                    })
                    .then(rst => {
                        if (rst.body.code == 0) {
                            this.$message.success("删除成功");
                            this.search();
                        } else {
                            this.$message.error(rst.body.msg);
                        }
                    })
                    .catch(e => {
                        console.error(e);
                        this.$message.error("删除失败");
                    });
            });
        },
        confirmEditOrAdd(form, name) {
            this.deleteUnnecessaryKeyword(form);
            this.$store
                .dispatch("saveDupApp", { body: form })
                .then(res => {
                    if (res.body.code == 0) {
                        this.$message.success(name + "成功");
                        this.search();
                    } else {
                        this.$message.error(name + "失败" + res.body.msg);
                    }
                })
                .catch(() => {
                    this.$message.error("服务器错误");
                });
        },
        deleteUnnecessaryKeyword(form) {
            let keywords = this.columns.map(one => one.id);
            for (let [key, value] of Object.entries(form)) {
                if (!keywords.includes(key)) {
                    delete form[key];
                }
                if (key == "appResult") {
                    for (let one of value) {
                        delete one.appIdArr;
                        delete one.resultParams;
                    }
                }
            }
        },
        getProblemTypes(contentType, clearData = true) {
            let map = {
                1: "video_problems",
                2: "text_problems",
                4: "imgGroup_problems"
            };
            let target = this.columns.find(one => one.id == "problemType");
            clearData && (this.$refs.dialog.form.problemType = []);

            return new Promise(resolve => {
                if (map[contentType]) {
                    this.$store
                        .dispatch("getOptionText", {
                            key: map[contentType]
                        })
                        .then(() => {
                            let data = this.$store.getters.app_options[
                                map[contentType]
                            ];

                            target.options = data;
                            this.generateFormatter(target);
                            clearData &&
                                (this.$refs.dialog.form.problemType = []);
                            resolve();
                        });
                } else {
                    target.options = [];
                    resolve();
                }
            });
        },
        updateContentType(obj, clearData = true) {
            console.log("updataContentType");
            return Promise.all([
                this.getProblemTypes(obj.contentType, clearData),
                this.getModuleIds(obj, clearData)
            ]);
        },
        updateBusId(obj, clearData = true) {
            console.log("updateBusId");
            return Promise.all([
                this.getChannelIds(obj, clearData),
                this.getModuleIds(obj, clearData),
                this.getModuleApp(obj, clearData),
                this.getlistBizPriority(obj.busId,
                    clearData,
                    this.dataForDialog.mode)
            ]);
        },
        // 更新一审业务优先级(options区分table和dialog)
        getlistBizPriority(busId, clearData = true, mode = "all") {
            let target = this.columns.find(one => one.id == "bizPriority");
            if (busId === undefined || busId === "") {
                if (mode == "all") {
                    target.support.forEach(one => {
                        one.disabled = true;
                    });
                } else {
                    target.support.find(one => one.name == mode).disabled = true;
                }

                if (mode !== "query") {
                    target.options = [];
                    this.timmer = setTimeout(() => {
                        this.$refs.dialog.form.bizPriority = "";
                        clearTimeout(this.timmer);
                    }, 1000);
                } else {
                    target.optionsForTable = [];
                }

                return Promise.resolve();
            }
            return this.$store
                .dispatch("listBizPriority", `busId=${busId}`)
                .then(response => {
                    if (mode == "query") {
                        target.optionsForTable = response.body.data;
                    } else {
                        target.options = response.body.data;
                    }
                    if (mode == "all") {
                        target.support.forEach(one => {
                            one.disabled = false;
                        });
                    } else {
                        target.support.find(one => one.name == mode).disabled = false;
                    }
                    clearData && (this.$refs.dialog.form.bizPriority = "");
                });
        },

        // 更新应用点
        getModuleApp({ busId }, clearData = true) {
            let params = {};
            if (busId) {
                params.busId = busId;
            }
            return this.$store.dispatch("moduleApp", params).then(response => {
                let target = this.columns.find(one => one.id == "appId");
                target.options = response.body.data;
                clearData && (this.$refs.dialog.form.appId = []);
            });
        },
        // 更新channelId
        getChannelIds({ busId }, clearData = true) {
            let params = {};
            let target = this.columns.find(one => one.id == "channelId");
            // 有业务加载的专审通道才有意义
            if (busId) {
                params.busId = busId;
                return this.$store
                    .dispatch("auditchannelSingle", params)
                    .then(response => {
                        if (response.body.data) {
                            target.support.forEach(one => {
                                one.disabled = false;
                            });
                            target.options = response.body.data;
                            clearData &&
                                (this.$refs.dialog.form.channelId = "");
                        }
                    });
            } else {
                target.options = [];
                if (this.dataForDialog.show) {
                    target.support.forEach(one => {
                        one.disabled = true;
                    });
                }
                return Promise.resolve();
            }
        },
        // 更新moduIds(一开始已经有全数据)
        getModuleIds({ busId, contentType }, clearData = true) {
            let params = {
                busId,
                contentType
            };
            this.handleQueryParams(params);
            return this.$store
                .dispatch("getModuleIds", params)
                .then(response => {
                    let target = this.columns.find(one => one.id == "moduleId");
                    target.support.forEach(one => {
                        one.disabled = false;
                    });
                    target.options = response.body.data;
                    clearData && (this.$refs.dialog.form.moduleId = []);
                });
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.search();
        },
        //          分页跳转
        handleCurrentChange(currentPage) {
            this.pageNo = currentPage;
            this.search();
        },
        // 机审应用点appId 数组转换
        // getMultipleValueArr(id, row) {
        //     let target = this.columns.find(one => one.id == id);
        //     let tempArr = [];
        //     for (let one of row[id]) {
        //         target.formatter(one);
        //         tempArr.push(target.valueArr);
        //     }
        //     target.multipleValueArr = tempArr;
        // },
        // 新增
        add() {
            this.dataForDialog.defaultValue.busId = this.queryParams.busId;
            this.dataForDialog.defaultValue.contentType = this.queryParams.contentType;

            this.dataForDialog.mode = "add";
            this.dataForDialog.title = "新增流程规则配置";
            this.dataForDialog.items = this.columns.filter(one => one.support && one.support.find(one => one.name == "add"));
            this.dataForDialog.show = true;
        },
        edit(row) {
            this.loading = true;
            // row.appId && this.getMultipleValueArr("appId", row);
            this.dataForDialog.mode = "edit";
            this.dataForDialog.title = "流程规则配置修改";
            this.dataForDialog.form = row;
            this.dataForDialog.items = this.columns.filter(one =>
                one.support && one.support.find(one => one.name == "edit"));
            Promise.all([
                this.getModuleIds(row, false),
                this.getProblemTypes(row.contentType, false),
                this.getChannelIds(row, false),
                this.getModuleApp(row, false),
                this.getlistBizPriority(row.busId, false, "edit")
            ]).then(() => {
                this.dataForDialog.show = true;
                this.loading = false;
            });
        },
        search(clearPage = false) {
            this.loading = true;
            clearPage && (this.pageNo = 1);
            let params = {
                pageSize: this.pageSize,
                pageNo: this.pageNo
            };
            Object.assign(params, this.queryParams);
            this.handleQueryParams(params);
            this.$store
                .dispatch("getDupList", params)
                .then(res => {
                    this.loading = false;

                    if (res.body.code == 0) {
                        this.tableDataHandled = res.body.data;
                        this.total = res.body.total;
                    } else {
                        this.$message.error(res.body.msg);
                    }
                })
                .catch(() => {
                    this.loading = false;
                    this.$message.error("查询失败");
                });
        },
        generateFormatter(column,
            optionsName = "options",
            formatterName = "formatter") {
            column[formatterName] = val => {
                let target = column[optionsName].find(one =>
                    one[
                        column.sourceFormat
                            ? column.sourceFormat.value
                            : "id"
                    ] == val);
                return target
                    ? target[
                        column.sourceFormat
                            ? column.sourceFormat.label
                            : "text"
                    ]
                    : val;
            };
        }
    },
    mounted() {
        // this.tableDataHandled = fakeData;
        this.initCount = this.columns.filter(one => one.source).length;
        this.columns.forEach(column => {
            // 初始化数据来源
            if (column.source) {
                column
                    .source()
                    .then(res => {
                        let data;
                        if (Array.isArray(res)) {
                            data = res;
                        } else {
                            data = column.sourceConstrutor
                                ? res.body.data[column.sourceConstrutor]
                                : res.body.data;
                        }
                        // 一审业务优先级获取的数据是不准确的，而且需要有另外的formatter
                        if (column.id == "bizPriority") {
                            data = [];
                            this.generateFormatter(column,
                                "optionsForTable",
                                "formatterForTable");
                        }
                        // 优先级数据也是不准确的
                        if (column.id == "channelId") {
                            data = [];
                        }
                        this.$set(column, "options", data);
                        if (column.source && !column.formatter) {
                            this.generateFormatter(column);
                        }
                        // 重复请求处理
                        if (column.id == "partitionList") {
                            let target1 = this.columns.find(one => one.id == "dupAuditPartition");
                            let target2 = this.columns.find(one => one.id == "auditPartition");
                            this.$set(target1, "options", [...data]);
                            this.$set(target2, "options", [...data]);

                            this.generateFormatter(target1);
                            this.generateFormatter(target2);
                        }
                        if (column.id == "auditNode") {
                            let target = this.columns.find(one => one.id == "appType");
                            this.$set(target, "options", [...data]);
                            this.generateFormatter(target);
                        }
                        this.currentCount++;
                    })
                    .catch(e => {
                        this.$message.error("获取" + column.name + "选项失败!");
                        console.log(e);
                    });
            }
            // 初始化查询表单
            if (
                column.support &&
                column.support.find(one => one.name == "query")
            ) {
                this.$set(this.queryParams, column.id, "");
            }
        });
    }
};
</script>
<style rel="stylesheet/scss" scoped lang="scss">
.dup {
    padding: 0 10px 10px 10px;
    .title {
        display: inline-block;
        text-indent: 15px;
        /*border-left: 2px solid #88b7e0;*/
        margin-top: 15px;
        margin-bottom: 0px;
        margin-right: 8px;
        vertical-align: top;
    }
    .content {
        .top {
            float: right;
            padding: 6px;
            align-items: center;
            display: flex;
            .selContainer {
                .el-select {
                    width: 140px;
                }
                .el-input {
                    width: 140px;
                }
                margin: 5px;
            }
        }
        .oneColumnContainer {
            padding: 9px;
            border-bottom: 1px solid #f0f2f5;
            .columnTitle {
                font-weight: bold;
                padding-bottom: 8px;
            }
            .columnContent {
                margin-top: 4px;
                line-height: 14px;
            }
        }
        .oneColumnContainer:last-child {
            border-bottom: 0;
        }
    }
}

.oneColumn {
    /*display: flex;*/
    /*justify-content: flex-start;*/
    .auditPartition {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 8px;
        .title {
            color: #008cee;
        }
        .rule {
            /*width: 70%;*/
            margin: 4px;
            .oneRule {
                padding: 5px;
                text-align: left;
                /*display: flex;*/
            }
        }
    }
}
// .oneColumn ::after {
//     display: block;
//     content: "";
//     clear: both;
// }
.oneRule {
    .ruleRow {
        padding: 5px;
    }
}
</style>
