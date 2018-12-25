<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">每日领币</h3>
      <!-- <el-form-item prop="amount">
        <el-input
          v-model="form.amount"
          :readonly="true"
          name="amount"
          type="text"
          auto-complete="on"
          placeholder="每日领币数量"
        />
      </el-form-item> -->
      <el-form-item prop="address">
        <el-input
          v-model="form.address"
          name="address"
          type="text"
          auto-complete="on"
          placeholder="请输入收款地址"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="getCoins"
        >领币</el-button>
      </el-form-item>
      <div class="tips">每天限领一次，每次2000万个</div>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    const validateAddress = (rule, value, callback) => {
      if (value !== 0 && !value) {
        callback(new Error('地址为必填项'))
      } else {
        callback()
      }
    }
    return {
      form: {
        address: ''
      },
      rules: {
        address: [{ required: true, trigger: 'blur', validator: validateAddress }]
      },
      loading: false
    }
  },
  methods: {
    async getCoins() {
      if (await this.$refs.form.validate()) {
        const res = await request({
          url: `/accounts/${this.form.address}/withdraw`,
          method: 'get'
        })
        if (res && res.error) {
          this.$message.error(res.error.message)
        } else {
          this.$message.success('领取成功')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 50%;
  margin: auto;
  text-align: center;
  .title {
    color: #fff;
  }
  .tips {
    color: #fff;
  }
}
</style>
