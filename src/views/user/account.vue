<template>
  <div>
    <div class="content">
      <el-form
        :label-width="'100px'"
        size="large"
        :model="form">
        <el-form-item
          v-for="one in items"
          :key="one.id"
          :label="one.name+'：'">
          <el-input
            v-if="one.type!=='text'"
            v-model="form[one.id]" />
          <span v-else>
            {{ form[one.id] }}
          </span>
        </el-form-item>
      </el-form>
      <el-button @click="save">
        保存
      </el-button>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Account',

    data() {
      return {
        form: {},
        items: [{
          name: '所属系统',
          id: 'system',
          type: 'text',
        }, {
          name: '账号',
          id: 'account',
          type: 'text',
        }, {
          name: '用户名',
          id: 'userName',
          type: 'text',
        }, {
          name: '原密码',
          id: 'oldPassword',
        }, {
          name: '新密码',
          id: 'newPassword',
        }, {
          name: '确认新密码',
          id: 'confirmPassword',
        }],
      };
    },
    mounted() {
      this.items.forEach(one => {
        this.$set(this.form, one.id, '');
      });

      this.form = {
        system: '思锐',
        account: 'zhagn',
        userName: '张珊',
      };
    },
    methods: {
      save() {},
    },
  };
</script>
