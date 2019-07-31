<template>
  <td v-if="!isEmptyObj(row) || !isEmptyValue(value)" :data-column="label" :width="width">
    <div class="tb">
      <div style="display:table-row">
        <div class="cell" >
          <span v-if="!isEmptyValue(value)">{{ value }}</span>
          <slot :row="row"/>
        </div>
      </div>
    </div>
  </td>
</template>
<script>
import { isNotNormalValue } from '../../utils/tool'
export default {
  props: {
    row: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Number | String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 'auto'
    }
  },
  mounted() {
    this.$parent.$emit('settitle', { name: this.label })
  },
  methods: {
    isEmptyObj(obj) {
      return Object.keys(obj).length === 0
    },
    isEmptyValue(val) {
      return isNotNormalValue(val)
    }
  }
}

</script>

<style lang="scss" scoped>
  .tb {
    display: table;
    width: 100%;
    height: 35px;
  }

  .cell {
    display: table-cell;
    vertical-align: middle;
    // height: 100%;
  }

</style>
