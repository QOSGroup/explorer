<template>
  <div class="app-container">
    <el-row class="mgb22">
      <el-button type="primary" @click="dialogFormVisible = true">创建APP Key</el-button>
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
        <q-column :value="props.row.block_id.hash" label="名称" width="360px"/>
        <q-column :value="props.row.header.num_txs" label="key"/>
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
import { createApp } from '@/api/developer'
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
      header: [{ name: '名称' }, { name: 'key' }],
      listLoading: true,
      list: []
    }
  },
  methods: {
    createApp() {
      createApp(this.form).then(res => {
        console.log(res)
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mgb22 {
  margin-bottom: 22px;
}
</style>
