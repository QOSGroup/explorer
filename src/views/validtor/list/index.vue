<template>
  <div class="app-container">
    <q-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <template slot-scope="props">
        <q-column :value="props.row.address" label="address" width="360px"/>
        <q-column :value="props.row.voting_power" label="power" width="80px"/>
        <q-column :value="props.row.accum" label="accum" width="80px"/>
        <q-column :value="props.row.pub_key.type" label="pub_key type"/>
        <q-column :value="props.row.pub_key.value" label="pub_key value"/>
      </template>
    </q-table>
  </div>
</template>

<script>
import { getList } from './api'

export default {
  components: {
    qTable: () => import('@/components/common/qtable.vue'),
    qColumn: () => import('@/components/common/qcolumn.vue')
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.result.validators
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
