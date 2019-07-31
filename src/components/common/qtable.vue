<template>
  <div class="table-container">
    <table class="responsive">
      <thead>
        <tr>
          <th
            v-for="(item,index) in titles"
            :key="index"
            :class="item.className || ''"
          >{{ item.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in newData" v-show="!isEmptyObj(item)" :key="index">
          <slot :row="item" />
        </tr>
      </tbody>
    </table>
    <div v-show="!data || data.length === 0" class="empty">暂无数据</div>
  </div>
</template>
<script>
import { isNotNormalValue } from '../../utils/tool'
export default {
  props: {
    header: {
      type: Array,
      default() {
        return null
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      titles: [],
      newData: []
    }
  },
  watch: {
    data(val) {
      this.newData = this.data
    }
  },
  created() {
    if (!this.data || this.data.length === 0) {
      this.newData = [{}]
    } else {
      this.newData = this.data
    }
    if (this.header) {
      this.titles = this.header
    } else {
      this.$on('settitle', oMsg => {
        this.addTitle(oMsg)
      })
    }
  },
  methods: {
    addTitle(oMsg) {
      if (!this.titles.some(x => x.name === oMsg.name)) {
        this.titles.push(oMsg)
      }
    },
    isEmptyObj(obj) {
      return Object.keys(obj).length === 0
    },
    isEmptyValue(val) {
      console.log('val', val)
      return isNotNormalValue(val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.table-container {
  min-height: 100px;
  .empty {
    text-align: center;
    line-height: 100px;
    color: $fontColor;
  }
}
table {
  &.responsive {
    width: 100%;
    border-collapse: collapse;
    margin: auto;
    position: relative;

    /* Zebra striping */
    // tr:nth-of-type(odd) {
    //   // background: #eee;
    // }

    th {
      background: top;
      font-weight: bold;
      height: 40px;
    }

    td,
    th {
      min-height: 35px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      text-align: left;
      color: $fontColor;
      padding-left: 10px;
      line-height: 1.2;
      word-break: break-all;
      vertical-align: middle;
    }

    td {
      font-size: 14px;
    }

    /*
    Max width before this PARTICULAR table gets nasty
    This query will take effect for any screen smaller than 760px
    and also iPads specifically.
    */
    @media only screen and (max-width: 760px),
      (min-device-width: 768px) and (max-device-width: 1024px) {
      table {
        width: 100%;
      }

      /* Force table to not be like tables anymore */
      table,
      thead,
      tbody,
      th,
      td,
      tr {
        display: block;
      }

      /* Hide table headers (but not display: none;, for accessibility) */
      thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
      }

      tr {
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-bottom: none;
        margin: 10px auto;
      }

      td {
        /* Behave  like a "row" */
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
        position: relative;
        padding-left: 130px;
        width: 100% !important;
      }

      td:before {
        /* Now like a table header */
        position: absolute;
        /* Top/left values mimic padding */
        top: 0;
        bottom: 0;
        margin: auto;
        left: 6px;
        width: 130px;
        // padding-right: 10px;
        white-space: nowrap;
        /* Label the data */
        content: attr(data-column);
        display: flex;
        align-items: center;
        vertical-align: middle;
        // color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>
