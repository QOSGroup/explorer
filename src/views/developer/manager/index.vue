<template>
  <div class="app-container">

    <div>
      相关接口和使用说明，详见接口文档 http://docs.qoschain.info/qmoon/
    </div>
    <el-row class="mgb22">
      <el-button :disabled="getDeveloperStatus()" type="primary" @click="dialogFormVisible = true">创建APP Key</el-button>
      <a href="javascript:;" class="sign-out" @click="signout">Sign out</a>
    </el-row>
    <q-table
      v-loading="listLoading"
      :data="list"
      :header = "header"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <template slot-scope="props">
        <q-column :value="props.row.name" label="名称" width="360px"/>
        <q-column :value="props.row.secretKey" label="secretKey"/>
      </template>
    </q-table>
    <el-dialog :visible.sync="dialogFormVisible" title="创建APP key">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="APP名称">
          <el-input v-model="form.name" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createApp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createApp, getApps } from '@/api/developer'
import { removeAllCookie, getDeveloperInfo } from '@/utils/auth'
export default {
  name: 'PManager',
  components: {
    qTable: () => import('@/components/common/qtable.vue'),
    qColumn: () => import('@/components/common/qcolumn.vue')
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px',
      header: [{ name: '名称' }, { name: 'QToken' }],
      listLoading: true,
      list: []
    }
  },
  created() {
    this.getApps()
  },
  methods: {
    createApp() {
      createApp(this.form).then(res => {
        this.dialogFormVisible = false
        this.getApps()
      })
    },
    getApps() {
      this.listLoading = true
      getApps().then(res => {
        this.list = res.result || []
        this.listLoading = false
      })
    },
    signout() {
      removeAllCookie()
      this.$router.push('/')
    },
    getDeveloperStatus() {
      const info = getDeveloperInfo()
      return info.status === '0'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/variables.scss";
.mgb22 {
  margin-bottom: 22px;
}
.sign-out {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: block;
  height: 20px;
  color: $fontColor;
}
</style>
