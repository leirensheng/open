<template>
    <div class="dialogContainer">
        <el-dialog v-loading="inputs.loading" :title="inputs.title" :visible.sync="inputs.show" top="5%" width="90%" @open="open">
            <el-form ref="form" :model="form" :label-width="inputs.labelWidth||'90px'" :rules="formRules">
                <div class="itemContainer">
                    <el-form-item :prop="one.id" :label="one.name" v-for="(one,index) in inputs.items" :key="index" :class="one.queryType=='title'?'title':(one.showAlone?'showAlone':'notShowAlone')" v-if="[undefined,true].includes (one.support.find(one=>one.name==inputs.mode).show)">
                        <!-- 处理特殊的item -->
                        <!-- 机审应用点 -->
                        <!-- <div v-if="one.id=='appId'">
                            <el-cascader v-for="(item,index) in form.appIdArr" @change="(val)=>{handleAppIdChange(val)}" :key="index" v-model="form.appIdArr[index]" :placeholder="one.name" :options="one.options" :props="one.defaultProps" filterable clearable size="small">
                            </el-cascader>
                            <i class="fa fa-plus-circle" aria-hidden="true" @click="addAppIds"></i>
                            <i class="fa fa-minus-circle" v-if="form.appId&&form.appId.length>=1" aria-hidden="true" @click="minusAppIds"></i>
                        </div> -->
                        <!-- appResult -->
                        <div v-if="one.id=='appResult'">
                            <i class="fa fa-plus-circle" aria-hidden="true" @click="addOne(form,0,'appResult')" v-if="!form.appResult||!form.appResult.length"></i>

                            <div v-for="(item, indexForPartition) in form.appResult " :key=indexForPartition>
                                <div class="panduanContainer">
                                    <div class="left">
                                        <div class="addBtn" v-if="!form.appResult||!form.appResult.length">
                                            <i class="fa fa-plus-circle" aria-hidden="true" @click="addOne(form,indexForPartition,'appResult')"></i>
                                        </div>
                                        <div>
                                            <el-select size="small" v-model="item.appId" placeholder="应用点" style="width: 100%" filterable @change="(val)=>{getResultParams(val,item)}">
                                                <el-option :label="inputs.items.find(one=>one.id=='appId').sourceFormat?option[inputs.items.find(one=>one.id=='appId').sourceFormat.label]: option.name||option.text" :value="inputs.items.find(one=>one.id=='appId').sourceFormat?option[inputs.items.find(one=>one.id=='appId').sourceFormat.value]:option.id" v-for="(option,index2) in inputs.items.find(one=>one.id=='appId').options" :key="index2">
                                                </el-option>
                                            </el-select>
                                            <!-- <el-cascader style="width:200px" @change="(val)=>{getResultParams(val,item)}" v-model="item.appIdArr" placeholder="应用点选择/搜索" :options="inputs.items.find(one=>one.id=='appId').options" :props="inputs.items.find(one=>one.id=='appId').defaultProps" filterable size="small"></el-cascader> -->
                                        </div>

                                    </div>

                                    <div class="middle">
                                        <el-row v-for="(oneRule,indexForRule) in item.rule" :key="indexForRule" style="padding: 5px" type="flex" justify="space-between">
                                            <el-col :span="6">
                                                <el-select size="small" v-model="oneRule.columnCode" placeholder="字段名">
                                                    <el-option v-for="item in item.resultParams" :key="item.value" :label="item.text" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <!--<el-input v-model="oneRule.columnCode" placeholder="字段名"></el-input>-->
                                            </el-col>
                                            <el-col :span="6">
                                                <el-select size="small" v-model="oneRule.calculationMethod" placeholder="判断类型">
                                                    <el-option v-for="(option,optionIndex) in inputs.items.find(one=>one.id=='calMethodList').options" :key="optionIndex" :label="option.text" :value="option.id">
                                                    </el-option>
                                                </el-select>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-input size="small" placeholder="值" v-model="oneRule.columnValue"></el-input>
                                            </el-col>
                                            <el-col :span="4">
                                                <i class="fa fa-plus-circle" aria-hidden="true" @click="addOne(item,indexForRule,'rule')"></i>
                                                <i class="fa fa-minus-circle" v-if="item.rule.length>1" aria-hidden="true" @click="removeOne(item,indexForRule,'rule')"></i>
                                            </el-col>
                                        </el-row>

                                    </div>
                                    <div class="right">
                                        <i class="fa fa-plus-circle" aria-hidden="true" @click="addOne(form,indexForPartition,'appResult')"></i>
                                        <i class="fa fa-minus-circle" aria-hidden="true" @click="removeOne(form,indexForPartition,'appResult')"></i>

                                        <!--<i class="el-icon-remove-outline" aria-hidden="true"-->
                                        <!--@click="removeOnePartition(inputs.form,indexForPartition)"></i>-->
                                        <!--<i class="el-icon-circle-plus-outline" aria-hidden="true" @click="addPartition(inputs.form,indexForPartition)"></i>-->
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!-- 标题分类 -->
                        <span v-else-if="one.queryType=='title'" style="color:red">
                            {{one.subText}}
                        </span>

                        <!-- 命中规则 -->
                        <div v-else-if="one.id=='appTypePartition' " class="panduanContainer ">
                            <div class="leftContainer ">
                                <div class="addBtn " v-if="!form.appTypePartition||!form.appTypePartition.length ">
                                    <i class="fa fa-plus-circle " aria-hidden="true " @click="addOne(form,0,'appTypePartition') "></i>
                                </div>
                                <el-row v-for="(onePreCondition,index) in form.appTypePartition " :key="index" style="padding: 5px " type="flex " justify="space-between ">
                                    <el-col :span="8">
                                        <el-select size="small" clearable v-model="onePreCondition.appType" placeholder="审核节点" style="width:100%">
                                            <el-option v-for="(oneAppType,index2) in inputs.items.find(one=>one.id=='appType').options" :key="index2" :label="oneAppType.text" :value="oneAppType.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-select size="small " clearable multiple v-model="onePreCondition.partition" placeholder="机审结果" style="width:100%">
                                            <el-option v-for="(item,index1) in inputs.items.find(one=>one.id=='partitionList').options" :key="index1" :label="item.text" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>

                                    <el-col :span="4">
                                        <i class="fa fa-plus-circle" aria-hidden="true" @click="addOne(form,index,'appTypePartition')"></i>
                                        <i class="fa fa-minus-circle" aria-hidden="true" @click="removeOne(form,index,'appTypePartition')"></i>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <!-- 人审交叉 -->
                        <div v-else-if="one.id=='manualResultCompare' " class="panduanContainer ">
                            <div class="leftContainer ">
                                <div class="addBtn " v-if="!form.manualResultCompare||!form.manualResultCompare.length ">
                                    <i class="fa fa-plus-circle " aria-hidden="true " @click="addOne(form,0,'manualResultCompare') "></i>
                                </div>
                                <el-row v-for="(onePreCondition,index0) in form.manualResultCompare " :key="index0" style="padding: 5px " type="flex " justify="space-between ">
                                    <el-col :span="12">
                                        <el-select size="small " placeholder="审核区" clearable multiple v-model="onePreCondition.auditType" style="width:100%">
                                            <el-option v-for="(item,index1) in inputs.items.find(one=>one.id=='auditType').options" :key="index1" :label="item.text" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-select size="small " clearable multiple v-model="onePreCondition.auditResult" placeholder="审核结果" style="width:100%">
                                            <el-option v-for="(item,index2) in inputs.items.find(one=>one.id=='auditResult').options" :key="index2" :label="item.text" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="4">
                                        <i class="fa fa-plus-circle" aria-hidden="true" @click="addOne(form,index0,'manualResultCompare')"></i>
                                        <i class="fa fa-minus-circle" aria-hidden="true" @click="removeOne(form,index0,'manualResultCompare')"></i>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <!-- 前置判断 -->
                        <div v-else-if="one.id=='otherCondition' " class="panduanContainer" style="border:0">
                            <div class="left">
                                <div class="addBtn " v-if="!form.otherCondition||!form.otherCondition.length ">
                                    <i class="fa fa-plus-circle " aria-hidden="true " @click="addOne(form,0,'otherCondition') "></i>
                                </div>
                                <el-row v-for="(onePreCondition,indexForPre) in form.otherCondition " :key="indexForPre " style="padding: 5px " type="flex " justify="space-between ">
                                    <el-col :span="6 ">
                                        <el-select size="small " v-model="onePreCondition.columnCode" placeholder="字段名 " clearable>
                                            <el-option v-for="(item,index1) in inputs.items.find(one=>one.id=='columnCodeForOther').options" :key="index1" :label="item.text" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-select size="small" v-model="onePreCondition.calculationMethod" placeholder="判断类型" clearable>
                                            <el-option v-for="(item,index2) in inputs.items.find(one=>one.id=='calMethodList').options" :key="index2" :label="item.text" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-input size="small" v-model="onePreCondition.columnValue" placeholder="值"></el-input>
                                    </el-col>
                                    <el-col :span="4">
                                        <i class="fa fa-plus-circle" aria-hidden="true" @click="addOne(form,indexForPre,'otherCondition')"></i>
                                        <i v-if="form.otherCondition.length>=1" class="fa fa-minus-circle" aria-hidden="true" @click="removeOne(form,indexForPre,'otherCondition')"></i>
                                    </el-col>
                                </el-row>
                            </div>
                            <!-- <div class="middle" v-if="form.otherCondition&&form.otherCondition.length">
                                <div style="width: 100%;text-align: center">
                                    <i class="fa fa-minus-circle" aria-hidden="true" @click="removeAll(form,'otherCondition')"></i>
                                </div>
                            </div> -->
                        </div>

                        <!--select-->
                        <el-select v-else-if="one.queryType=='select'" v-model="form[one.id]" :placeholder="one.tips" clearable filterable :filter-method="one.filterMethod" size="small" @change="one.changeEvent?(handleSelChange(['busId','contentType'].includes(one.id)?{busId:form[one.id],contentType:form.contentType}:form[one.id],one.eventName)):()=>{}" style="width: 100%" :disabled="one.support.find(mode=>mode.name==inputs.mode).disabled">
                            <el-option :label="one.sourceFormat?option[one.sourceFormat.label]: option.name||option.text" :value="one.sourceFormat?option[one.sourceFormat.value]:option.id" v-for="(option,index1) in one.options" :key="index1">
                                <template v-show="one.optionShowId">
                                    <span style="float: left">{{one.sourceFormat?option[one.sourceFormat.label]: option.name||option.text }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ one.sourceFormat?option[one.sourceFormat.value]:option.id }}</span>
                                </template>
                            </el-option>
                        </el-select>
                        <!-- 下拉多选 -->
                        <el-select size="small" clearable v-model="form[one.id]" :placeholder="one.tips" multiple style="width: 100%" filterable v-else-if="one.queryType=='multipleSelect'" @change="one.changeEvent?handleSelChange(form[one.id],one.eventName):()=>{}" :disabled="one.support.find(mode=>mode.name==inputs.mode).disabled">
                            <el-option :label="one.sourceFormat?option[one.sourceFormat.label]: option.name||option.text" :value="one.sourceFormat?option[one.sourceFormat.value]:option.id" v-for="(option,index2) in one.options" :key="index2">
                                <template v-show="one.optionShowId">
                                    <span style="float: left">{{ one.sourceFormat?option[one.sourceFormat.label]: option.name||option.text }}</span>
                                    <span style="float: right;margin-right:18px; color: #8492a6; font-size: 13px" v-if="['布局元素','子组件'].includes(one.name)">{{ option.frontComponent||option.component }}</span>
                                    <span style="float: right;margin-right:18px; color: #8492a6; font-size: 13px" v-else>{{ one.sourceFormat?option[one.sourceFormat.value]:option.id}}</span>
                                </template>
                            </el-option>
                        </el-select>
                        <!--cascader-->
                        <el-cascader clearable v-model="form[one.id]" :placeholder="one.tips" style="width:400px;" v-else-if="one.queryType=='cascader'" :options="one.options" :props="one.defaultProps" filterable size="small"></el-cascader>
                        <!--JSON-->
                        <el-input v-else-if="one.queryType=='JSON'" autosize v-model="form[one.id]" type="textarea" :disabled="one.support.find(mode=>mode.name==inputs.mode).disabled"></el-input>
                        <!--input-->
                        <el-input v-else v-model="form[one.id]" :placeholder="one.tips" :disabled="one.support.find(mode=>mode.name==inputs.mode).disabled" size="small"></el-input>
                    </el-form-item>
                </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="inputs.show = false" size="small">取 消</el-button>
                <el-button type="primary" @click="confirm" size="small">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {},
            formRules: {},
            map: {
                otherCondition: {
                    calculationMethod: "",
                    columnCode: "",
                    columnValue: ""
                },
                appTypePartition: {
                    appType: "",
                    partition: []
                },
                manualResultCompare: {
                    auditType: [],
                    auditResult: []
                },
                rule: {
                    calculationMethod: "",
                    columnCode: "",
                    columnValue: ""
                },
                appResult: {
                    appId: "",
                    rule: [
                        {
                            calculationMethod: "",
                            columnCode: "",
                            columnValue: ""
                        }
                    ]
                }
            }
        };
    },
    props: ["inputs"],
    computed: {},
    methods: {
        // 获取resultParams
        getResultParams(appId, item) {
            this.$store
                .dispatch("queryResultParams", {
                    params: { appId }
                })
                .then(res => {
                    if (res.body.code == -1) {
                        this.$message.error(res.body.msg);
                    } else {
                        if (res.body.code == 0) {
                            if (item.resultParams) {
                                item.resultParams = res.body.data;
                            } else {
                                this.$set(item, "resultParams", res.body.data);
                            }
                        } else {
                            this.$message.error(res.body.msg);
                        }
                    }
                })
                .catch(() => {
                    this.$message.error("获取resultParams失败");
                });
        },
        initRule() {
            this.inputs.items.forEach(one => {
                if (one.required) {
                    this.$set(this.formRules, one.id, [
                        { required: true, trigger: "blur", message: one.tips }
                    ]);
                }
            });
        },
        // handleAppResultData() {
        //     let target = this.inputs.items.find(one => one.id == "appId");
        //     for (let one of this.form.appResult) {
        //         target.formatter(one.appId);
        //         this.$set(one, "appIdArr", target.valueArr);
        //     }
        // },
        initResultParams() {
            if (this.form.appResult) {
                this.form.appResult.forEach(one => {
                    one.resultParams = one.appResultParams
                        ? JSON.parse(one.appResultParams)
                        : [];
                });
            }
        },
        open() {
            this.form = {};
            this.initRule();
            // 编辑
            if (this.inputs.mode == "edit") {
                this.form = this.deepClone(this.inputs.form);
                this.initResultParams();
                this.inputs.items.forEach(one => {
                    if (["cascader"].includes(one.queryType)) {
                        this.form[one.id] = one.valueArr;
                    }
                    if (
                        (["multipleSelect"].includes(one.queryType) ||
                            one.defaultArr) &&
                        !this.form[one.id]
                    ) {
                        this.$set(this.form, one.id, []);
                    }
                });
                this.$emit("triggerPointChange", this.form.triggerPoint);
                // this.handleAppResultData();
            } else {
                // 新增的时候不应该有id
                this.form = {};
                this.inputs.items
                    .filter(one => one.support.find(one => one.name == "add").show)
                    .forEach(one => {
                        if (
                            [
                                "multipleSelect"
                                // "cascader",
                                // "multipleCascader"
                            ].includes(one.queryType) ||
                            one.defaultArr
                        ) {
                            this.$set(this.form, one.id, []);
                        } else if (one.queryType == "title") {
                            console.log("title");
                        } else {
                            this.$set(this.form, one.id, "");
                        }
                    });
                this.form.busId = this.inputs.defaultValue.busId;
                this.form.contentType = this.inputs.defaultValue.contentType;
                this.handleSelChange({
                    busId: this.form.busId,
                    contentType: this.form.contentType
                },
                "busChange");
                this.handleSelChange({
                    busId: this.form.busId,
                    contentType: this.form.contentType
                },
                "contentTypeChange");
                this.handleSelChange("", "triggerPointChange");
                // this.$emit("triggerPointChange", "");

                // this.$set(this.form, "appIdArr", []);

                // this.form.channelId = 0;
            }
        },
        handleSelChange(val, eventName) {
            this.$emit(eventName, val);
        },
        handleAppIdChange(val) {
            this.form.appId.push(val.slice(-1)[0]);
        },
        addAppIds() {
            // if(!this.form.appIdArr)
            var array = [0, 0, 0];
            this.form.appIdArr.push(array);
        },
        minusAppIds() {
            this.form.appIdArr.pop();
        },
        checkData() {
            return new Promise(resolve => {
                let name = this.inputs.mode == "add" ? "新增" : "修改";
                if (!this.form.busId && !this.form.contentType) {
                    return this.$confirm(`您${name}了一条全局规则，对所有业务和所有类型均生效，请确认是否操作？`).then(() => {
                        resolve();
                    });
                } else if (!this.form.busId) {
                    return this.$confirm(`您${name}了一条全局规则，对所有业务均生效，请确认是否操作？`).then(() => {
                        resolve();
                    });
                } else if (!this.form.contentType) {
                    return this.$confirm(`您${name}了一条全类型规则，对该业务所有类型均生效，请确认是否操作？`).then(() => {
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        },
        confirm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.checkData().then(() => {
                        console.log("jin");
                        this.inputs.mode == "edit"
                            ? this.$emit("edit", { ...this.form }, "修改")
                            : this.$emit("add", { ...this.form }, "新增");
                        this.inputs.show = false;
                    });
                }
            });
        },

        // 添加前置规则
        addOne(form, index, name) {
            console.log(JSON.stringify(form, null, 4));
            console.log(name);
            console.log(this.map[name]);
            if (!form[name] || !Array.isArray(form[name])) {
                this.$set(form, name, []);
            }
            let rule = this.deepClone(this.map[name]);
            console.log(rule);
            form[name].push(rule);
            // index || index === 0
            //     ? form[name].splice(index + 1, 0, rule)
            //     :
        },
        // 移除一条前置规则
        removeOne(form, index, name) {
            form[name].splice(index, 1);
        },
        // 移除所有前置规则
        removeAll(form, name) {
            form[name] = [];
        }
    },
    watch: {
        form: {
            deep: true,
            handler(val) {
                console.log(JSON.stringify(val, null, 4));
            }
        }
    },
    created() {},
    mounted() {}
};
</script>
<style rel="stylesheet/scss" scoped lang="scss">
.itemContainer {
    .title {
        width: 100%;
        position: relative;
        // margin-bottom:8px;
        font-weight: bold;
        border-bottom: 1px solid #d6d6d6;
    }
    display: flex;
    flex-wrap: wrap;
}
.panduanContainer {
    border: 1px solid #e2e2e2;
    margin-bottom: 6px;
    display: flex;
    align-items: center;

    .middle {
        padding: 0 15px;
        border-right: 1px solid #e2e2e2;
        border-left: 1px solid #e2e2e2;
        // .el-select {
        //     width: 150px;
        // }
    }
    .right {
        padding: 0 15px;
    }
    .leftContainer {
        padding: 4px 0;
        .addBtn {
            text-align: center;
        }
        flex: 7;
    }
    .rightContainer {
        padding: 0 4px;
        flex: 1;
        border-left: 1px solid #e2e2e2;
        display: flex;
        align-items: center;
    }
}
.showAlone {
    width: 100%;
}
.notShowAlone {
    width: 50%;
}
</style>
