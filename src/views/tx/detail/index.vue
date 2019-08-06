<template>
  <div class="app-container tx-detail">
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Block Message</span>
      </div>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">block_height</div>
          <div class="right label">
            {{ tx.height }}
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">tx_index</div>
          <div class="right label">
            {{ tx.index }}
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">time</div>
          <div class="right label">
            {{ tx.time }}
          </div>
        </div>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Tx Type</span>
      </div>
      <el-row>
        <div class="row">
          <div class="left label">hash</div>
          <div class="right label">
            {{ tx.hash }}
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="row">
          <div class="left label">tx_status</div>
          <div class="right label">
            {{ tx.tx_status }}
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="row">
          <div class="left label">tx_type</div>
          <div class="right label">
            {{ tx.tx_type_cn }}
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="row">
          <div class="left label">fee</div>
          <div class="right label">
            {{ tx.fee }}
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="row">
          <div class="left label">gas_wanted</div>
          <div class="right label">
            {{ tx.gas_wanted }}
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="row">
          <div class="left label">gas_used</div>
          <div class="right label">
            {{ tx.gas_used }}
          </div>
        </div>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Tx Content</span>
      </div>
      <el-row>
        <div class="row">
          <div class="left label">Content</div>
          <div class="right label" ref="txdata"></div>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import '@/assets/font/iconfont.css'
import { formatJson } from '@/utils/common.js';
import {
  getDetail
} from './api'

export default {
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
      tx: {
        data: {}
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const response = await getDetail(this.$route.params.hash)
      this.tx = response.result
      this.tx.data = JSON.parse(JSON.stringify(this.tx.data));
      this.$refs.txdata.innerHTML = formatJson(this.tx.data);
      this.listLoading = false;
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
      align-items: flex-start;

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
