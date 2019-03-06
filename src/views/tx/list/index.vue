<template>
  <div class="app-container">
    <div v-show="$route.name == 'TxList'">
      <el-form :inline="true" :model="form">
        <el-form-item label="开始高度" class="label-class" required prop="minHeight">
          <el-input v-model="form.minHeight" placeholder="开始高度" type="number"/>
        </el-form-item>
        <el-form-item label="结束高度" class="label-class" required prop="maxHeight">
          <el-input v-model="form.maxHeight" placeholder="结束高度" type="number"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
      <q-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot-scope="props">
          <q-column :row="props.row" label="hash" width="300px">
            <template slot-scope="p">
              <router-link :to="{ name: 'TxDetail', params: { hash: p.row.hash }}" class="primary">
                {{ p.row.hash }}
              </router-link>
            </template>
          </q-column>
          <q-column :value="props.row.height" label="height" width="100px"/>
          <q-column :value="props.row.index" label="index" width="70px"/>
          <q-column :value="props.row.tx_type_cn" label="tx_type" width="150px"/>
          <q-column :value="props.row.fee" label="fee" width="80px"/>
          <q-column :value="props.row.gas_wanted" label="gas_wanted" width="80px"/>
          <q-column :value="props.row.gas_used" label="gas_used" width="80px"/>
          <q-column :value="props.row.tx_status" label="tx_status" width="100px"/>
          <q-column :value="props.row.time" label="created_at"/>
        </template>
      </q-table>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  getList
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
      list: null,
      listLoading: true
    }
  },
  activated() {
    if (this.$route.name === 'TxList') {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      this.list = []
      this.listLoading = true
      const response = await getList(this.form)
      this.list = response.result
      this.listLoading = false
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
