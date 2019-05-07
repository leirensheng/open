<template>
  <div class="dialogContainer">
    <el-dialog
      v-loading="inputs.loading"
      :title="inputs.title"
      :visible.sync="inputs.show"
      top="5%"
      width="90%"
      @open="open">
      <el-form
        ref="form"
        :model="form"
        :label-width="inputs.labelWidth||'90px'"
        :rules="formRules">
        <div class="itemContainer">
          <el-form-item
            v-for="(one,index) in inputs.items"
            v-if="[undefined,true].includes(one.support.find(one=>one.name==inputs.mode).show)"
            :key="index"
            :prop="one.id"
            :label="one.name"
            :class="one.queryType=='title'?'title':(one.showAlone? 'showAlone':'notShowAlone')">
            <!-- 标题分类 -->
            <span
              v-else-if="one.queryType=='title'"
              style="color:red">
              {{ one.subText }}
            </span>

            <!--select-->
            <el-select
              v-else-if="one.queryType=='select'"
              v-model="form[one.id]"
              :placeholder="one.tips"
              clearable
              filterable
              :filter-method="one.filterMethod"
              size="small"
              style="width: 100%"
              :disabled="isItemDisabled()"
              @change="one.changeEvent?(handleSelChange(['busId','contentType'].includes(one.id)?{busId:form[one.id],contentType:form.contentType}:form[one.id],one.eventName)):()=>{}">
              <el-option
                v-for="(option,index1) in one.options"
                :key="index1"
                :label="one.sourceFormat?option[one.sourceFormat.label]: option.name||option.text"
                :value="one.sourceFormat?option[one.sourceFormat.value]:option.id">
                <template v-show="one.optionShowId">
                  <span style="float: left">
                    {{ one.sourceFormat?option[one.sourceFormat.label]: option.name||option.text }}
                  </span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                    {{ one.sourceFormat?option[one.sourceFormat.value]:option.id }}
                  </span>
                </template>
              </el-option>
            </el-select>
            <!-- 下拉多选 -->
            <el-select
              v-else-if="one.queryType=='multipleSelect'"
              v-model="form[one.id]"
              size="small"
              clearable
              :placeholder="one.tips"
              multiple
              style="width: 100%"
              filterable
              :disabled="isItemDisabled()"
              @change="one.changeEvent?handleSelChange(form[one.id],one.eventName):()=>{}">
              <el-option
                v-for="(option,index2) in one.options"
                :key="index2"
                :label="one.sourceFormat?option[one.sourceFormat.label]: option.name||option.text"
                :value="one.sourceFormat?option[one.sourceFormat.value]:option.id">
                <template v-show="one.optionShowId">
                  <span style="float: left">
                    {{ one.sourceFormat?option[one.sourceFormat.label]: option.name||option.text }}
                  </span>
                  <span
                    v-if="['布局元素','子组件'].includes(one.name)"
                    style="float: right;margin-right:18px; color: #8492a6; font-size: 13px">
                    {{ option.frontComponent||option.component }}
                  </span>
                  <span
                    v-else
                    style="float: right;margin-right:18px; color: #8492a6; font-size: 13px">
                    {{ one.sourceFormat?option[one.sourceFormat.value]:option.id }}
                  </span>
                </template>
              </el-option>
            </el-select>
            <!--cascader-->
            <el-cascader
              v-else-if="one.queryType=='cascader'"
              v-model="form[one.id]"
              clearable
              :placeholder="one.tips"
              style="width:400px;"
              :options="one.options"
              :props="one.defaultProps"
              filterable
              size="small" />

            <!--input-->
            <el-input
              v-else
              v-model="form[one.id]"
              :placeholder="one.tips"
              :disabled="isItemDisabled()"
              size="small" />
          </el-form-item>
        </div>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          @click="inputs.show = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="confirm">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: ['inputs'],
    data() {
      return {
        form: {},
        formRules: {},
        map: {
          otherCondition: {
            calculationMethod: '',
            columnCode: '',
            columnValue: '',
          },
          appTypePartition: {
            appType: '',
            partition: [],
          },
          manualResultCompare: {
            auditType: [],
            auditResult: [],
          },
          rule: {
            calculationMethod: '',
            columnCode: '',
            columnValue: '',
          },
          appResult: {
            appId: '',
            rule: [
              {
                calculationMethod: '',
                columnCode: '',
                columnValue: '',
              },
            ],
          },
        },
      };
    },
    computed: {},
    watch: {
      form: {
        deep: true,
        handler(val) {
          console.log(JSON.stringify(val, null, 4));
        },
      },
    },
    created() {},
    mounted() {},
    methods: {

      // 获取resultParams
      getResultParams(appId, item) {
        this.$store
          .dispatch('queryResultParams', {
            params: { appId },
          })
          .then(res => {
            if (res.body.code == -1) {
              this.$message.error(res.body.msg);
            } else if (res.body.code == 0) {
              if (item.resultParams) {
                item.resultParams = res.body.data;
              } else {
                this.$set(item, 'resultParams', res.body.data);
              }
            } else {
              this.$message.error(res.body.msg);
            }
          })
          .catch(() => {
            this.$message.error('获取resultParams失败');
          });
      },
      initRule() {
        this.inputs.items.forEach(one => {
          if (one.required) {
            this.$set(this.formRules, one.id, [
              { required: true, trigger: 'blur', message: one.tips },
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
        if (this.inputs.mode == 'edit') {
          this.form = this.deepClone(this.inputs.form);
          this.initResultParams();
          this.inputs.items.forEach(one => {
            if (['cascader'].includes(one.queryType)) {
              this.form[one.id] = one.valueArr;
            }
            if (
              (['multipleSelect'].includes(one.queryType)
              || one.defaultArr)
              && !this.form[one.id]
            ) {
              this.$set(this.form, one.id, []);
            }
          });
          this.$emit('triggerPointChange', this.form.triggerPoint);
          // this.handleAppResultData();
        } else {
          // 新增的时候不应该有id
          this.form = {};
          this.inputs.items
            .filter(one => one.support.find(one => one.name == 'add').show)
            .forEach(one => {
              if (
                [
                  'multipleSelect',
                  // "cascader",
                  // "multipleCascader"
                ].includes(one.queryType)
                || one.defaultArr
              ) {
                this.$set(this.form, one.id, []);
              } else if (one.queryType == 'title') {
                console.log('title');
              } else {
                this.$set(this.form, one.id, '');
              }
            });
          this.form.busId = this.inputs.defaultValue.busId;
          this.form.contentType = this.inputs.defaultValue.contentType;
          this.handleSelChange({
                                 busId: this.form.busId,
                                 contentType: this.form.contentType,
                               },
                               'busChange');
          this.handleSelChange({
                                 busId: this.form.busId,
                                 contentType: this.form.contentType,
                               },
                               'contentTypeChange');
          this.handleSelChange('', 'triggerPointChange');
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
        const array = [0, 0, 0];
        this.form.appIdArr.push(array);
      },
      minusAppIds() {
        this.form.appIdArr.pop();
      },
      checkData() {
        return new Promise(resolve => {
          const name = this.inputs.mode == 'add' ? '新增' : '修改';
          if (!this.form.busId && !this.form.contentType) {
            return this.$confirm(`您${name}了一条全局规则，对所有业务和所有类型均生效，请确认是否操作？`).then(() => {
              resolve();
            });
          } if (!this.form.busId) {
            return this.$confirm(`您${name}了一条全局规则，对所有业务均生效，请确认是否操作？`).then(() => {
              resolve();
            });
          } if (!this.form.contentType) {
            return this.$confirm(`您${name}了一条全类型规则，对该业务所有类型均生效，请确认是否操作？`).then(() => {
              resolve();
            });
          }
          resolve();
        });
      },
      confirm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.checkData().then(() => {
              console.log('jin');
              this.inputs.mode == 'edit'
                ? this.$emit('edit', { ...this.form }, '修改')
                : this.$emit('add', { ...this.form }, '新增');
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
        const rule = this.deepClone(this.map[name]);
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
      },
    },
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
