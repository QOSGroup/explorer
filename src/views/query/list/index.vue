<template>
  <div class="app-container">
    <div v-show="$route.name == 'BlockList'">
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
          <q-column :row="props.row" label="height" width="100px">
            <template slot-scope="p">
              <router-link :to="{ name: 'BlockDetail', params: { height: p.row.header.height }}" class="primary">
                {{ p.row.header.height }}
              </router-link>
            </template>
          </q-column>
          <q-column :value="props.row.block_id.hash" label="block_id" width="360px"/>
          <q-column :value="props.row.header.num_txs" label="num_txs" width="50px"/>
          <q-column :value="props.row.header.total_txs" label="total_txs" width="100px"/>
          <q-column :value="props.row.header.validators_hash" label="Validators Hash" width="360px"/>
          <q-column :value="props.row.header.time" label="created_at"/>
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
    if (this.$route.name === 'QueryList') {
      // this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      this.list = []
      this.listLoading = true
      const response = await getList(this.form)
      this.list = response.result.block_metas
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
