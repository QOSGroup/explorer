<template>
  <div class="app-container tx-detail">
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Validator Message</span>
      </div>
      <el-row>
        <div class="row">
          <div class="left label">name</div>
          <div class="right label">
            {{ validator.name }}
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="row">
          <div class="left label">identity</div>
          <div class="right label">
            {{ validator.identity }}
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="row">
          <div class="left label">website</div>
          <div class="right label">
            {{ validator.website }}
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="row">
          <div class="left label">details</div>
          <div class="right label">
            {{ validator.details }}
          </div>
        </div>
      </el-row>
      <el-row>
        <div class="row">
          <div class="left label">owner</div>
          <div class="right label">
            {{ validator.owner }}
          </div>
        </div>
      </el-row>
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
          <div class="left label">uptime</div>
          <div class="right label">
            {{ validator.uptime }}
          </div>
        </div>
      </el-row>
      <el-row class="mt15">
        <div class="row">
          <div class="left label">status</div>
          <div class="right label">
            {{ validator.statusStr }}
          </div>
        </div>
      </el-row>

      <el-row class="mt15">
        <div class="row">
          <div class="left label">bondHeight</div>
          <div class="right label">
            {{ validator.bondHeight }}
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

      <el-row class="mt15">
        <div class="row">
          <div class="left label">inactiveCode</div>
          <div class="right label">
            {{ validator.inactiveCode }}
          </div>
        </div>
      </el-row>

      <el-row class="mt15">
        <div class="row">
          <div class="left label">inactiveTime</div>
          <div class="right label">
            {{ validator.inactiveTime }}
          </div>
        </div>
      </el-row>

      <el-row class="mt15">
        <div class="row">
          <div class="left label">inactiveHeight</div>
          <div class="right label">
            {{ validator.inactiveHeight }}
          </div>
        </div>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>Voting Power Percent</span>
      </div>

      <div class="app-container">
        <chart ref="charts" height="300%" width="100%"/>
      </div>
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
  getValidatorDetail,
  getValidatorVotingPowerPercents
} from '@/api/validator'
import Chart from '@/components/Charts/lineMarker'
import echarts from 'echarts'

export default {
  components: {
    qTable: () => import('@/components/common/qtable.vue'),
    qColumn: () => import('@/components/common/qcolumn.vue'),
    Chart
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
      const response = await getValidatorDetail(this.$route.params.address)
      this.validator = response.result.validator
      this.blocks = response.result.blocks

      this.chartData = await this.initChart()
      this.$refs.charts.initChart(this.chartData)
      this.listLoading = false
    },
    async initChart() {
      var timestamp = Date.parse(new Date()) / 1000
      var params = {
        start: timestamp - 60 * 60 * 24 * 7,
        end: timestamp,
        step: 1
      }

      const response = await getValidatorVotingPowerPercents(this.$route.params.address, params)
      const datas = response.result
      var xx = []
      var yy = []

      datas.forEach(element => {
        xx.push(element.x)
        yy.push(element.y)
      })

      console.log('xx', xx)
      console.log('yy', yy)

      return {
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: [],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: xx
        }],
        yAxis: [{
          type: 'value',
          name: '(%)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: '',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12

            }
          },
          data: yy
        }]
      }
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
