<template>
  <div class="board-column">
    <div class="board-column-header">
      <div class="title">
        目录
      </div>
      <div
        class="add"
        @click="add">
        添加+
      </div>
    </div>
    <draggable
      :list="list"
      v-bind="$attrs"
      class="board-column-content"
      :set-data="setData"
      @end="dragEnd">
      <div
        v-for="(one,index) in list"
        :key="one.id"
        class="board-item"
        :class="curMenuId===one.id?'active':''"
        @click="()=>{setCurMenuId(one.id)}">
        <div>{{ one.name }}</div>
        <div>
          <i
            class="el-icon-sort sort" />
          <el-dropdown
            :hide-timeout="250"
            :show-timeout="0">
            <span class="el-dropdown-link">
              <i

                class="el-icon-edit-outline" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for=" item in dropDownItems"
                :key="item.name"
                icon="el-icon-plus"
                :disabled="item.disabled&&item.disabled(one,index) ">
                <div
                  @click="item.handler(one,index)">
                  {{ item.name }}
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </draggable>
    <el-dialog
      :title="dataForDialog.title"
      :visible.sync="dataForDialog.visible"
      width="30%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="70px">
        <el-form-item
          label="目录名"
          prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="state">
          <el-radio-group v-model="form.state">
            <el-radio :label="0">
              可见
            </el-radio>
            <el-radio :label="-1">
              隐藏
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <div v-if="!dataForDialog.loading">
          <el-button @click="dataForDialog.visible = false">
            取 消
          </el-button>
          <el-button
            type="primary"
            @click="save">
            确 定
          </el-button>
        </div>

        <el-button
          v-else
          type="primary"
          :loading="dataForDialog.loading">
          提交中
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import {
    docMenu, saveMenu, changeSeq, deleteMenu,
  } from '@/api/document';

  export default {
    name: 'DragKanbanDemo',
    components: {
      draggable,
    },
    props: {

    },
    data() {
      return {
        dataForDialog: {
          visible: false,
          title: '',
          loading: false,
        },
        curIdx: '', // 当前编辑目录的索引
        curMenuId: '', // 当前点击选中的menu
        list: [],
        form: {
          state: '',
          name: '',
        },
        rules: {
          state: [
            { required: true, message: '请选择', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入目录名', trigger: 'blur' },
          ],
        },
        dropDownItems: [{ name: '编辑', handler: this.edit },
                        { name: '上移动一格', handler: this.moveUp, disabled: (one, index) => index == 0 },
                        { name: '下移一格', handler: this.moveDown, disabled: (one, index) => index == this.list.length - 1 },
                        { name: '删除', handler: this.delete },
        ],
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        docMenu().then(({ model }) => {
          this.list = model;
          if (model.length) {
            this.setCurMenuId(model[0].id);
          }
        });
      },
      setCurMenuId(id) {
        this.curMenuId = id;
        this.$emit('menuIdChange', id);
      },
      add() {
        this.dataForDialog.title = '添加目录';
        this.form.state = '';
        this.form.name = '';
        this.dataForDialog.visible = true;
      },
      edit(rowData, index) {
        this.dataForDialog.title = '编辑目录';
        this.form = { ...rowData };
        this.curIdx = index;
        this.dataForDialog.visible = true;
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            const isEdit = typeof this.form.id == 'number';
            this.dataForDialog.loading = true;
            saveMenu(this.form).then(({ model }) => {
              this.dataForDialog.loading = false;
              this.dataForDialog.visible = false;
              this.$refs.form.resetFields();
              this.form = {
                state: '',
                name: '',
              };
              if (isEdit) {
                this.list[this.curIdx] = { ...this.form };
              } else {
                this.list.push({ ...model });
              }
            }).catch(() => {
              this.dataForDialog.loading = false;
            });
          }
        });
      },
      moveUp(one, index) {
        this.changePosition(index, index - 1, one);
      },
      moveDown(one, index) {
        this.changePosition(index, index + 1, one);
      },
      changePosition(idx, idx2, current) {
        const temp = { ...this.list[idx2] };
        this.saveToDb(current.id, this.list[idx2].id).then(() => {
          this.$set(this.list, idx2, current);
          this.$set(this.list, idx, temp);
        });
      },
      dragEnd({ oldIndex, newIndex }) {
        if (oldIndex !== newIndex) {
          this.saveToDb(this.list[newIndex].id, this.list[oldIndex].id);
        }
      },

      saveToDb(id, changeId) {
        return changeSeq({ id, changeId }).then(() => {
          this.$message.success('目录保存成功');
        }).catch(e => {
          this.getList();
          throw e; // 因为moveDown和moveUp也用了这个，如果出错应该停止后续的操作
        });
      },

      delete(one, idx) {
        this.$confirm('确定删除？').then(() => {
          deleteMenu({ id: one.id }).then(() => {
            if (this.curMenuId === one.id) {
              this.list.splice(idx, 1);
              this.setCurMenuId(this.list.length ? this.list[0].id : '');
            } else {
              this.list.splice(idx, 1);
            }
          });
        });
      },

      setData(dataTransfer) {
        // to avoid Firefox bug
        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        dataTransfer.setData('Text', '');
      },
    },
  };
</script>
<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    display: flex;
    justify-content: space-between;
    height: 72px;
    line-height: 72px;
    overflow: hidden;
    padding: 0 20px;
    // text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
    .title{
     font-weight: 400;
     font-size: 22px;
    }
    .add{
      font-size: 14px;
      cursor: pointer;
    }
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    // border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      width: 100%;
      height: 64px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
      .sort{
        display: inline-block;
        margin-right: 6px;
      }

      &.active{
        background-color: #2E82FF;
        color: white;
        .el-icon-edit-outline{
          color:white !important;
        }
      }
    }
  }
}
</style>
