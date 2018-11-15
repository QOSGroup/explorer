<template>
  <div class="app-container">
    <div v-show="$route.name == 'ValidatorList'">
      <q-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <template slot-scope="props">
          <q-column :row="props.row" label="address" width="240px">
            <template slot-scope="p">
              <router-link :to="{ name: 'ValidatorDetail', params: { address: p.row.address }}" class="primary">
                {{ p.row.address }}
              </router-link>
            </template>
          </q-column>
          <q-column :value="props.row.voting_power" label="voting_power" width="80px"/>
          <q-column :value="props.row.accum" label="accum" width="80px"/>
          <q-column :value="props.row.first_block_height" label="first_block_height" width="80px"/>
          <q-column :value="props.row.first_block_time" label="first_block_time" width="100px"/>
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
    if (this.$route.name === 'ValidatorList') {
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
