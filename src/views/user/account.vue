<template>
  <div>
    <div class="content">
      <el-form
        ref="form"
        :rules="rules"
        :label-width="'120px'"
        size="large"

        :model="form">
        <el-form-item
          v-for="one in items.filter(one=>!one.noShow)"
          :key="one.id"
          :prop="one.id"
          :label="one.name+'：'">
          <el-input
            v-if="one.type!=='text'"
            v-model="form[one.id]"
            style="width:230px" />
          <span v-else>
            {{ form[one.id] }}
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            @click="save">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { updateUserPassword } from '@/api/login';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Account',

    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.confirmPassword !== '') {
            this.$refs.form.validateField('confirmPassword');
          }
          callback();
        }
      };

      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.updatePassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        loading: false,
        form: {},
        rules: {

          updatePassword: [
            { validator: validatePass, trigger: 'blur', required: true },
          ],
          confirmPassword: [
            { validator: validatePass2, trigger: 'blur', required: true },
          ],
        },
        items: [
          {
            name: 'id',
            id: 'id',
            noShow: true,
          }, {
            name: '所属系统',
            id: 'systemName',
            type: 'text',
          }, {
            name: '账号',
            id: 'userName',
            type: 'text',
          }, {
            name: '用户名',
            id: 'name',
            type: 'text',
          }, {
            name: '新密码',
            id: 'updatePassword',
          }, {
            name: '确认新密码',
            id: 'confirmPassword',
          }],
      };
    },
    computed: {
      ...mapGetters([
        'systemName', 'userName', 'name', 'id', 'password',
      ]),
    },
    mounted() {
      this.items.forEach(one => {
        const value = this[one.id] !== undefined ? this[one.id] : '';
        this.$set(this.form, one.id, value);
      });
    },
    methods: {
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true;
            updateUserPassword({ ...this.form, password: this.password }).then(() => {
              this.loading = false;
              this.$store.dispatch('LogOut');
            }).catch(() => {
              this.loading = false;
            });
          }
        });
      },
    },
  };
</script>
