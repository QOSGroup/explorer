<template>
  <td v-if="!isEmptyObj(row)" :data-column="label" :width="width">
    <div class="tb">
      <div style="display:table-row">
        <div class="cell" >
          <span v-if="value">{{ value }}</span>
          <slot :row="row"/>
        </div>
      </div>
    </div>
  </td>
</template>
<script>
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
    console.log('this.row', this.row)
    this.$parent.$emit('settitle', { name: this.label })
  },
  methods: {
    isEmptyObj(obj) {
      console.log('Object.keys(obj).length', Object.keys(obj).length)
      return Object.keys(obj).length === 0
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
