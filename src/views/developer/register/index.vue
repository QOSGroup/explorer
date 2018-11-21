<template>
  <div class="register-container">
    <el-form ref="form" :model="form" :rules="registerRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">Sign Up</h3>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="form.email" name="email" type="text" auto-complete="on" placeholder="email" />
      </el-form-item>
      <el-form-item prop="valideCode">
        <span class="svg-container">
          <svg-icon icon-class="shield" />
        </span>
        <el-input v-model="form.valideCode" name="valideCode" type="text" auto-complete="on" placeholder="valideCode" />
        <el-button :loading="sendCodeLoading" type="primary" class="send-code" @click="sendCode">{{ sendCodeText }}</el-button>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="form.password"
          auto-complete="off"
          placeholder="password"
          name="password"/>
      </el-form-item>
      <el-form-item prop="confirmpassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="form.confirmpassword"
          name="confirmpassword"
          auto-complete="off"
          placeholder="confirm password"
          @keyup.enter.native="handleRegister" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
          Sign Up
        </el-button>
      </el-form-item>
      <div class="tips">
        <router-link :to="{ name: 'DeveloperLogin'}">Sign In</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidEmail } from '@/utils/validate'
import { developerRegister, sendCode } from '@/api/developer'

export default {
  name: 'PRegister',
  data() {
    const validateemail = (rule, value, callback) => {
      if (!isvalidEmail(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        email: '',
        password: '',
        confirmpassword: ''
      },
      registerRules: {
        email: [{ required: true, trigger: 'blur', validator: validateemail }],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        confirmpassword: [{ validator: validatePass2, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      sendCodeLoading: false,
      sendCodeText: '发送验证码'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          developerRegister(this.form)
            .then(() => {
              this.loading = false
              this.$router.push({ name: 'DeveloperLogin' })
              // this.showMsgForActive()
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showMsgForActive() {
      this.$message({
        showClose: true,
        message: `请前往${this.form.email}激活您的开发者账号。`,
        duration: 0
      })
    },
    sendCode() {
      if (this.sendCodeLoading) {
        return
      }
      this.$refs.form.validateField('email', errmsg => {
        if (errmsg) return
        this.sendCodeRequest()
        this.sendCodeLoading = !this.sendCodeLoading
        const tmpText = this.sendCodeText
        let i = 60
        this.sendCodeText = `${i}秒后重发`
        const it = setInterval(() => {
          i--
          this.sendCodeText = `${i}秒后重发`
          if (i === 0) {
            clearInterval(it)
            this.sendCodeLoading = !this.sendCodeLoading
            this.sendCodeText = tmpText
          }
        }, 1000)
      })
    },
    sendCodeRequest() {
      sendCode(this.form).then(() => {
        this.loading = false
        this.$message({
          showClose: true,
          message: `请前往邮箱${this.form.email}收取验证码。`,
          duration: 0
        })
      })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.register-container {
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
        box-shadow: 0 0 0px 1000px $bg inset !important;
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
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.register-container {
  // position: fixed;
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
  .send-code {
    // width: 120px;
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 40px;
    z-index: 2;
  }
}
</style>
