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
          <q-column :row="props.row" label="name" width="80px">
            <template slot-scope="p">
              <router-link :to="{ name: 'ValidatorDetail', params: { address: p.row.address }}" class="primary">
                {{ p.row.name }}
              </router-link>
            </template>
          </q-column>
          <q-column :row="props.row" label="address" width="80px">
            <template slot-scope="p">
              <router-link :to="{ name: 'ValidatorDetail', params: { address: p.row.address }}" class="primary">
                {{ p.row.address }}
              </router-link>
            </template>
          </q-column>
          <!-- <q-column :value="props.row.address" label="address" width="240px"/> -->
          <q-column :value="`${props.row.voting_power} (${props.row.percent}%)`" label="voting_power" width="100px"/>
          <q-column :value="`${props.row.uptime}`" label="uptime" width="100px"/>
          <q-column :value="props.row.statusStr" label="status" width="80px"/>
          <q-column :value="props.row.bondHeight" label="bondHeight" width="80px"/>
        </template>
      </q-table>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  getValidators
} from '@/api/validator'

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
      const response = await getValidators(this.form)
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

  .chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}

</style>
