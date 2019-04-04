<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Network Data</span>
      </div>
      <el-row>
        <div class="pure-g">
          <div class="pure-u-1-2 pure-u-md-1-4">
            <div class="area">
              <div class="top">
                <i class="icon iconfont icon-version" />
              </div>
              <div class="middle">
                Network
              </div>
              <div class="bottom">
                {{ status.consensus_state.chain_id }}
              </div>
            </div>
          </div>
          <div class="pure-u-1-2 pure-u-md-1-4">
            <div class="area">
              <div class="top">
                <i class="icon iconfont icon-xintubiao-" />
              </div>
              <div class="middle">
                Validators
              </div>
              <div class="bottom">
                {{ status.consensus_state.prevotes_num }} voting / {{ status.total_validators }} total
              </div>
            </div>
          </div>
          <div class="pure-u-1-2 pure-u-md-1-4">
            <div class="area">
              <div class="top">
                <i class="icon iconfont icon-xintubiao-" />
              </div>
              <div class="middle">
                Transactions
              </div>
              <div class="bottom">
                {{ status.total_txs }}
              </div>
            </div>
          </div>
          <div class="pure-u-1-2 pure-u-md-1-4">
            <div class="area">
              <div class="top">
                <i class="icon iconfont icon-xintubiao-" />
              </div>
              <div class="middle">
                Avg Block Time
              </div>
              <div class="bottom">
                {{ status.blockTimeAvg }}
              </div>
            </div>
          </div>
        </div>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Current Block</span>
      </div>
      <el-row>
        <div class="pure-g">
          <div class="pure-u-1-2 pure-u-md-1-4">
            <div class="area">
              <div class="top">
                <i class="icon iconfont icon-blocks" />
              </div>
              <div class="middle">
                Block Height
              </div>
              <div class="bottom">
                {{ status.consensus_state.height }}
              </div>
            </div>
          </div>
          <div class="pure-u-1-2 pure-u-md-1-4">
            <div class="area">
              <div class="top">
                <i class="icon iconfont icon-shijian" />
              </div>
              <div class="middle">
                Block Time
              </div>
              <div class="bottom">
                {{ status.consensus_state.start_time | formatDate }}
              </div>
            </div>
          </div>
          <div class="pure-u-1-2 pure-u-md-1-4">
            <div class="area">
              <div class="top">
                <i class="icon iconfont icon-Prevote" />
              </div>
              <div class="middle">
                Prevote State
              </div>
              <div class="bottom line-height20">
                <div>{{ status.consensus_state.prevotes_value *100 }}%</div>
              </div>
            </div>
          </div>
          <div class="pure-u-1-2 pure-u-md-1-4">
            <div class="area">
              <div class="top">
                <i class="icon iconfont icon-Precommit" />
              </div>
              <div class="middle">
                Precommit State
              </div>
              <div class="bottom line-height20">
                <div>{{ status.consensus_state.precommits_value }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-row>
    </el-card>

    <el-card v-if="nodeInfo.nodeType == 'QOS' || nodeInfo.nodeType == 'QSC'" class="box-card">
      <div slot="header" class="card-header">
        <span>Squence</span>
      </div>
      <div class="app-container">
        <q-table
          v-loading="listLoading"
          :data="sequences"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <template slot-scope="props">
            <q-column :value="props.row.name" label="name" width="100px"/>
            <q-column :value="props.row.in" label="in"/>
            <q-column :value="props.row.out" label="out"/>
          </template>
        </q-table>
        <!-- </div> -->
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Connected To</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="4" class="label">RPC Endpoint</el-col>
        <el-col :span="16" class="label">
          {{ nodeInfo.baseUrl }}
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import '@/assets/font/iconfont.css'
import {
  reqStatus, reqSequences
} from './api'
import {
  mapGetters
} from 'vuex'
import {
  // formatNumber,
  formatDate
} from '@/utils/tool'

export default {
  components: {
    qTable: () => import('@/components/common/qtable.vue'),
    qColumn: () => import('@/components/common/qcolumn.vue')
  },
  filters: {
    formatDate
  },
  data() {
    return {
      fetch: true,
      status: {
        consensus_state: {}
      },
      sequences: [],
      st: null,
      listLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'nodeInfo'
    ])
  },
  watch: {
    nodeInfo: {
      handler(val, oldVal) {
        this.fetchData()
      },
      deep: true
    }
  },
  activated() {
    this.fetch = true
    this.fetchData()
  },
  deactivated() {
    this.fetch = false
  },
  beforeDestroy() {
    this.fetch = false
  },

  methods: {
    async fetchData() {
      Promise.all([this.getStatus(), this.getSequences()]).then(() => {
        if (!this.fetch) {
          return
        }
        setTimeout(() => {
          this.fetchData()
        }, 5000)
      }).catch(() => {
        setTimeout(() => {
          this.fetchData()
        }, 5000)
      })
    },
    async getStatus() {
      const response = await reqStatus()
      if (!response) return
      this.status = response.result
    },
    async getSequences() {
      const response = await reqSequences()
      if (!response) return
      this.sequences = response.result.apps
      this.listLoading = false
    },
    calcVoteData(bit_array) {
      const originStr = bit_array.split('}')[1]
      const tmpArr = originStr.split('=')
      const percent = tmpArr[1].trim()
      return {
        percent
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/variables.scss";
  .dashboard-container{
    padding-bottom: 50px;
    min-height: 100%;
  }
  .dashboard {
    &-container {
      margin: 15px;

      .mt15 {
        margin-top: 15px;
      }

      .label {
        height: 40px;
        line-height: 40px;
      }

      .box-card {
        margin-top: 15px;

        &:first-child {
          margin: 0 auto;
        }

        input {
          width: 100%;
        }
      }

      .card-header {
        font-weight: bolder;
      }

      .area {
        height: 196px;
        border: 1px solid #eee;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-bottom: 20px;
        margin: 5px 10px;

        .top {
          height: 70px;
          line-height: 70px;

          .icon {
            font-size: 50px;
            color: $iconColor;
          }
        }

        .middle,
        .bottom {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          &.line-height20 {
            line-height: 1.5;
          }
        }
      }
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

</style>
