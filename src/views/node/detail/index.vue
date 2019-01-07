<template>
  <div class="app-container">
    ss
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  activated() {
    this.fetchData()
    const detail = this.$store.getters.getNodeDetail(this.$route.params.nodeDetailId)
    if (!detail) {
      this.$router.replace({ name: 'Node' })
    }
  },
  methods: {
    fetchData() {
      // this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    }
  }
}
</script>
