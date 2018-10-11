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
                {{ networkNodeInfo.network }}
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
                {{ validator.validNum }} voting / {{ validator.totalNum }} total
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
                <div>{{ prevoteState.percent }}%</div>
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
                <div>{{ precommitState.percent }}%</div>
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
                {{ currentBlock.height }}
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
                {{ currentBlock.time | formatDate }}
              </div>
            </div>
          </div>
          <div class="pure-u-1 pure-u-md-1-2">
            <div class="area">
              <div class="top">
                <i class="icon iconfont icon-hashtag" />
              </div>
              <div class="middle">
                Last Block Hash
              </div>
              <div class="bottom line-height20">
                {{ currentBlock.lastCommitHash }}
              </div>
            </div>
          </div>
        </div>
      </el-row>
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
  reqConsensusState, reqStatus, reqBlockchain, reqAllValidators
} from './api'
import {
  mapGetters
} from 'vuex'
import {
  formatNumber,
  formatDate
} from '@/utils/tool'

export default {
  filters: {
    formatDate
  },
  data() {
    return {
      fetch: true,
      networkNodeInfo: {
        network: ''
      },
      title: 'dashboard',
      consensusState: {
        round_state: {}
      },
      currentBlock: {
        height: 0,
        time: '',
        lastCommitHash: '',
        numTxs: 0,
        totalTxs: 0,
        validatorsHash: ''
      },
      validator: {
        totalNum: 0,
        validNum: 0
      },
      prevoteState: {},
      precommitState: {},
      st: null
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
        console.log(val, oldVal)
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
      await this.getStatus()
      Promise.all([this.getConsensusState(), this.getBlockchain(), this.getAllValidators()]).then(() => {
        if (!this.fetch) {
          return
        }
        setTimeout(() => {
          this.fetchData()
        }, 1000)
      }).catch(() => {
        setTimeout(() => {
          this.fetchData()
        }, 5000)
      })
    },
    async getConsensusState() {
      const response = await reqConsensusState()
      if (!response) return
      const result = response.result
      this.consensusState = result
      this.validator.validNum = result.round_state['height_vote_set'][0].prevotes.length
      this.prevoteState = this.calcVoteData(result.round_state['height_vote_set'][0].prevotes_bit_array)
      this.precommitState = this.calcVoteData(result.round_state['height_vote_set'][0].precommits_bit_array)
    },
    async getStatus() {
      const response = await reqStatus()
      if (!response) return
      this.networkNodeInfo.network = response.result.node_info.network
    },
    async getBlockchain() {
      const response = await reqBlockchain()
      if (!response) return
      const result = response.result
      const blockMeta = result.block_metas[0]
      this.currentBlock.height = formatNumber(result.last_height)
      this.currentBlock.time = blockMeta.header.time
      this.currentBlock.lastCommitHash = blockMeta.header.last_commit_hash
      this.currentBlock.numTxs = formatNumber(blockMeta.header.num_txs)
      this.currentBlock.totalTxs = formatNumber(blockMeta.header.total_txs)
      this.currentBlock.validatorsHash = blockMeta.header.validators_hash
    },
    async getAllValidators() {
      const response = await reqAllValidators({ network: this.networkNodeInfo.network })
      if (!response) return
      this.validator.totalNum = formatNumber(response.result.number)
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
