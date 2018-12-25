<template>
  <div class="app-container tx-detail">
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Validator Message</span>
      </div>
      <el-row>
        <div class="row">
          <div class="left label">address</div>
          <div class="right label">
            {{ validator.address }}
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">voting_power</div>
          <div class="right label">
            {{ validator.voting_power }}
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">accum</div>
          <div class="right label">
            {{ validator.accum }}
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">first_block_height</div>
          <div class="right label">
            {{ validator.first_block_height }}
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">first_block_time</div>
          <div class="right label">
            {{ validator.first_block_time }}
          </div>
        </div>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Blocks</span>
      </div>
      <div class="app-container">
        <q-table
          v-loading="listLoading"
          :data="blocks"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <template slot-scope="props">
            <q-column :row="props.row" label="height" width="100px">
              <template slot-scope="p">
                <router-link :to="{ name: 'BlockDetail', params: { height: p.row.height }}" class="primary">
                  {{ p.row.height }}
                </router-link>
              </template>
            </q-column>
            <q-column :value="props.row.validator_index" label="validator_index" width="150px"/>
            <q-column :value="props.row.round" label="round" width="100px"/>
            <q-column :value="props.row.type" label="type" width="100px"/>
            <q-column :value="props.row.timestamp" label="time"/>
          </template>
        </q-table>
      </div>
    </el-card>

  </div>
</template>

<script>
import '@/assets/font/iconfont.css'
import {
  getDetail
} from './api'

export default {
  components: {
    qTable: () => import('@/components/common/qtable.vue'),
    qColumn: () => import('@/components/common/qcolumn.vue')
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      validator: [],
      blocks: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      console.log(this.$route.params)
      const response = await getDetail(this.$route.params.address)
      this.validator = response.result.validator
      this.blocks = response.result.blocks

      this.listLoading = false
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '@/styles/px2rem.scss';

  .tx-detail {
    .box-card {
      margin-top: 15px;

      &:first-child {
        margin: 0 auto;
      }
    }

    .label {
      min-height: 40px;
      display: flex;
      align-items: center;
      word-break: break-all;
    }

    .row {
      display: flex;
      align-items: center;

      .left {
        width: 160px;
      }

      @media only screen and (max-width: 760px),
      (min-device-width: 768px) and (max-device-width: 1024px) {
        .left {
          width: 110px;
        }
      }

      .right {
        flex: 1;
      }
    }
  }

</style>
