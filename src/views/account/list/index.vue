<template>
  <div class="app-container">
    <div v-show="$route.name == 'AccountDetail'">
      <el-form :inline="true" :model="form">
        <el-form-item label="账户地址" class="label-class" required prop="address">
          <el-input v-model="form.address" placeholder="账户地址" type="string"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
      <q-table
        v-loading="listLoading"
        :data="txs"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot-scope="props">
          <q-column :row="props.row" label="height" width="100px">
            <template slot-scope="p">
              <router-link :to="{ name: 'TxDetail', params: { height: p.row.height, index:p.row.index }}" class="primary">
                {{ p.row.height }}
              </router-link>
            </template>
          </q-column>
          <q-column :value="props.row.index" label="index" width="70px"/>
          <q-column :value="props.row.tx_type" label="tx_type" width="150px"/>
          <q-column :value="props.row.maxgas" label="maxgas" width="80px"/>
          <q-column :value="props.row.qcp_from" label="qcp_from" width="100px"/>
          <q-column :value="props.row.qcp_to" label="qcp_to" width="100px"/>
          <q-column :value="props.row.qcp_sequence" label="qcp_sequence" width="100px"/>
          <q-column :value="props.row.qcp_txindex" label="qcp_txindex" width="100px"/>
          <q-column :value="props.row.qcp_isresult" label="qcp_isresult" width="100px"/>
          <q-column :value="props.row.time" label="created_at"/>
        </template>
      </q-table>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  getAccount, getAccountTxs
} from './api'

export default {
  components: {
    qTable: () => import('@/components/common/qtable.vue'),
    qColumn: () => import('@/components/common/qcolumn.vue')
  },
  data() {
    return {
      form: {
        minHeight: '',
        maxHeight: ''
      },
      account: {},
      txs: [],
      listLoading: true
    }
  },
  activated() {
    if (this.$route.name === 'QueryList') {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      this.account = {}
      this.listLoading = true
      const response = await getAccount(this.form)
      this.account = response.result
      this.listLoading = false

      this.fetchAccountTxs(this.form)
    },
    async fetchAccountTxs() {
      const response = await getAccountTxs(this.form)
      this.txs = response.result
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "src/styles/variables.scss";

  .primary {
    color: $blue;
    text-decoration: underline;
  }

</style>
