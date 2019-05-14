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
            v-model="form[one.id]"
            style="width:230px" />
          <span v-else>
            {{ form[one.id] }}
          </span>
        </el-form-item>
        <el-form-item>
          <el-button @click="save">
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
      return {
        items: [{
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
          name: '原密码',
          id: 'password',
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
        'systemName', 'userName', 'name', 'id',
      ]),
      form() {
        return {
          id: this.id,
          systemName: this.systemName,
          name: this.name,
          userName: this.userName,
          password: '',
          updatePassword: '',
          confirmPassword: '',
        };
      },
    },
    mounted() {
      // this.items.forEach(one => {
      //   this.$set(this.form, one.id, '');
      // });
    },
    methods: {
      save() {
        updateUserPassword(this.form);
      },
    },
  };
</script>
