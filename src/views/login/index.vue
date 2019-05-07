<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left">
      <h3 class="title">
        客服系统
      </h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="iconfont icon-geren icon" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-xiugaimima icon" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span
          class="show-pwd"
          @click="showPwd">
          <i
            :class="{'icon-yanjing-open': pwdType === ''}"
            class="iconfont icon-yanjing icon" />
        </span>
      </el-form-item>
      <div class="rember">
        <el-checkbox v-model="remPwd">
          用户名保存7天
        </el-checkbox>
      </div>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { validUsername } from '@/utils/validate';
  import Cookies from 'js-cookie';

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入正确的用户名'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: 'admin',
          password: 'admin',
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined,
        remPwd: false,
      };
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true,
      },
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = '';
        } else {
          this.pwdType = 'password';
        }
      },

      // 设置cookie
      setCookie(cName, value, expiremDay) {
        Cookies.set('kefuCookie', `${cName}$${value}`, {
          expires: expiremDay,
        });
      },

      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (!valid) return;
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: this.redirect || '/' });
          }).catch(e => {
            console.log(e);
            this.$message.error(e.message);
            this.loading = false;
          });
          if (this.remPwd) {
            this.setCookie(this.loginForm.account, this.loginForm.password, 7); // 保存cookie7天
          } else {
            Cookies.remove('kefuCookie'); // 删除cookie
          }
        });
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .rember {
    height: 30px;
    text-align: right;
  }
}
</style>
