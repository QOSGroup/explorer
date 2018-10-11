<template>
  <div class="app-container block-detail">
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>ID</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="4" class="label">Moniker</el-col>
        <el-col :span="16" class="label">
          gaiaseeds_us_east_1d
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt15">
        <el-col :span="4" class="label">IP</el-col>
        <el-col :span="16" class="label">
          18.220.121.109
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt15">
        <el-col :span="4" class="label">Start Date</el-col>
        <el-col :span="16" class="label">
          .
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Pub Key</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="4" class="label">Value</el-col>
        <el-col :span="16" class="label">
          09dafbaa69899c220d2651f51205eefe9f78737a
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt15">
        <el-col :span="4" class="label">Persistent Peer</el-col>
        <el-col :span="16" class="label">
          09dafbaa69899c220d2651f51205eefe9f78737a@18.220.121.109:26656
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Network</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="4" class="label">Network</el-col>
        <el-col :span="16" class="label">
          gaia-8001
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt15">
        <el-col :span="4" class="label">Tendermint Version</el-col>
        <el-col :span="16" class="label">
          0.23.1
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt15">
        <el-col :span="4" class="label">Channels</el-col>
        <el-col :span="16" class="label">
          4020212223303800
        </el-col>
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
  .block-detail {
    .box-card {
      margin-top: 15px;

      &:first-child {
        margin: 0 auto;
      }
    }

    .label {
      height: 40px;
      line-height: 40px;
    }
  }

</style>
