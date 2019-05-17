<template>
  <div
    class="login-container"
    :style="{backgroundImage: 'url(' + pic + ')' }">
    <div class="form-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        size="large"
        label-position="left">
        <div
          class="logo"
          :style="{backgroundImage: 'url(' + logo + ')' }" />
        <h3 class="title">
          EPR接口开放平台
        </h3>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="username">
            <template slot="prepend">
              <i
                class="el-icon-user
               " />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :type="pwdType"
            name="password"
            auto-complete="on"
            placeholder="password"
            @keyup.enter.native="handleLogin">
            <template slot="prepend">
              <i
                class="el-icon-lock
               " />
            </template>
          </el-input>
          <span
            class="show-pwd"
            @click="showPwd">
            <i
              :class="{'icon-yanjing-open': pwdType === ''}"
              class="iconfont icon-yanjing icon" />
          </span>
        </el-form-item>

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
  </div>
</template>

<script>
  import pic from '@/assets/images/bg.png';
  import logo from '@/assets/images/logo1.png';

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value.length <= 0) {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length <= 0) {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        pic,
        logo,
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


      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (!valid) return;
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: this.redirect || '/' });
          }).catch(() => {
            this.loading = false;
          });
        });
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  z-index: 1002;
  position: fixed;
  top:56px;
  left:-1;
  right:0;
  bottom:0;
  width: 100%;
  width: 100%;
  height: 100vh;
  // background: at
  .form-container{
    background-color: white !important;
    .logo{
      width: 100px;
      height: 100px;
      margin:0 auto;
      margin-bottom: 20px;
    }
  .login-form {
    position: absolute;
    left: 1000px;
    top:224px;
    // right: 0;
    width: 420px;
    max-width: 100%;
    padding: 60px 40px;
    // margin: 120px auto;
    background-color: white;
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
    font-size:24px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(52,56,65,1);
    line-height:14px;
    padding: 20px 0;
    text-align: center;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
  .rember {
    height: 30px;
    text-align: right;
  }
  }

}

</style>
