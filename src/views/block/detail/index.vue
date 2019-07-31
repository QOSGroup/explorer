<template>
  <div class="app-container block-detail">
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Block Message</span>
      </div>
      <el-row>
        <div class="row">
          <div class="left label">chain_id</div>
          <div class="right label">
            {{ block.chain_id }}
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">block_height</div>
          <div class="right label">
            {{ block.height }}
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">time</div>
          <div class="right label">
            {{ block.time }}
          </div>
        </div>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Txs</span>
      </div>
      <div class="app-container">
        <q-table
          v-loading="listLoading"
          :data="txs"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <template slot-scope="props">
            <q-column :row="props.row" label="index" width="100px">
              <template slot-scope="p">
                <router-link :to="{ name: 'TxDetail', params: { height: block.height, index: p.row.index }}" class="primary">
                  {{ p.row.index }}
                </router-link>
              </template>
            </q-column>
            <q-column :value="props.row.tx_type" label="tx_type" width="150px"/>
            <q-column :value="props.row.maxgas" label="maxgas" width="80px"/>
            <q-column :value="props.row.qcp_from" label="qcp_from" width="100px"/>
            <q-column :value="props.row.qcp_to" label="qcp_to" width="100px"/>
            <q-column :value="props.row.qcp_sequence" label="qcp_sequence" width="100px"/>
            <q-column :value="props.row.qcp_txindex" label="qcp_txindex" width="100px"/>
            <q-column :value="props.row.qcp_isresult" label="qcp_isresult" width="100px"/>
            <q-column :value="props.row.time" label="time"/>
          </template>
        </q-table>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Validators</span>
      </div>
      <div class="app-container">
        <q-table
          v-loading="listLoading"
          :data="validators"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <template slot-scope="props">
            <q-column :row="props.row" label="validator_address" width="370px">
              <template slot-scope="p">
                <router-link :to="{ name: 'ValidatorDetail', params: { address: p.row.validator_address }}" class="primary">
                  {{ p.row.validator_address }}
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
      block: {},
      txs: [],
      validators: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const response = await getDetail(this.$route.params.height)
      this.block = response.result.block
      this.validators = response.result.validators
      this.txs = response.result.txs
      this.listLoading = false
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '@/styles/px2rem.scss';

  .block-detail {
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
