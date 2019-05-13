<template>
  <div class="components-container">
    <el-form
      :inline="true"
      :model="form"
      class="form">
      <el-form-item label="文档名称">
        <el-input
          v-model="form.name"
          placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="所属目录">
        <el-select
          v-model="form.documentMenuId"
          placeholder="请选择">
          <el-option
            v-for="one in menus"
            :key="one.id"
            :label="one.name"
            :value="one.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="优先级">
        <el-select
          v-model="form.seq"
          :disabled="curSeqs.length<=0"
          placeholder="请选择">
          <el-option
            v-for="one in curSeqs"
            :key="one.id"
            :label="one.seq"
            :value="one.seq" />
        </el-select>
      </el-form-item>
      <el-form-item label="可见状态">
        <el-radio-group v-model="form.state">
          <el-radio :label="0">
            可见
          </el-radio>
          <el-radio :label="-1">
            隐藏
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="save">
          保存
        </el-button>
      </el-form-item>
    </el-form>

    <div>
      <tinymce
        v-model="form.content"
        v-loading="loading"
        :height="300" />
    </div>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce';
  import {
    menuAndDoc, docView, docSave,
  } from '@/api/document';

  export default {
    name: 'DocEdit',
    components: { Tinymce },
    data() {
      return {
        loading: false,
        form: {
          documentMenuId: '',
          name: '',
          seq: '',
          state: '',
          content: '',
        },
        menus: [],
      };
    },
    computed: {
      curSeqs() {
        const target = this.menus.find(one => one.id === this.form.documentMenuId);
        if (!target) {
          return [];
        }
        return target.documentDTOList;
      },
    },
    created() {
      this.getOptions();
      if (this.$route.query.id) {
        this.getDeatil(this.$route.query.id);
      }
    },
    methods: {
      getDeatil(id) {
        this.loading = true;

        docView({ id }).then(({
          model: {
            name, content, state, documentMenuId, seq,
          },
        }) => {
          this.form.content = content;
          this.form.name = name;
          this.form.documentMenuId = documentMenuId;
          this.form.seq = seq;
          this.form.state = state;
          this.form.id = id;
          this.loading = false;
        }).catch(e => {
          console.log(e);
          this.loading = false;
        });
      },
      save() {
        docSave(this.form).then(() => {
          this.$message.success('保存成功');
        });
      },
      getOptions() {
        menuAndDoc().then(({ model }) => {
          this.menus = model;
        });
      },
    },
  };
</script>

<style scoped lang="scss">
.editor-content{
  margin-top: 20px;
}

.form{
  display: flex;
  justify-content: space-between;
  align-items: center;
  // .el-input{
  //   width: 180px;
  // }
  // .el-select{
  //   width: 180px;
  // }
}
</style>
