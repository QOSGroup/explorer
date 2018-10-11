<template>
  <div class="app-container block-detail">
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>ID</span>
      </div>
      <el-row>
        <div class="row">
          <div class="left label">Moniker</div>
          <div class="right label">
            gaiaseeds_us_east_1d
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">IP</div>
          <div class="right label">
            18.220.121.109
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">Start Date</div>
          <div class="right label">
            .
          </div>
        </div>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Pub Key</span>
      </div>
      <el-row>
        <div class="row">
          <div class="left label">Value</div>
          <div class="right label">
            09dafbaa69899c220d2651f51205eefe9f78737a
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">Persistent Peer</div>
          <div class="right label">
            09dafbaa69899c220d2651f51205eefe9f78737a@18.220.121.109:26656
          </div>
        </div>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Network</span>
      </div>
      <el-row>
        <div class="row">
          <div class="left label">Network</div>
          <div class="right label">
            gaia-8001
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">Tendermint Version</div>
          <div class="right label">
            0.23.1
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">Channels</div>
          <div class="right label">
            4020212223303800
          </div>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import '@/assets/font/iconfont.css'
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
      block: null,
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
      this.block = response.result
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
