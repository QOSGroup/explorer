<template>
  <section class="app-main">
    <transition :name="direction" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      direction: 'fade-transform'
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (to.path === '/' || to.path === '/dashboard') {
        this.direction = 'fade-transform'
      } else {
        this.direction = toDepth < fromDepth ? '' : 'fade-transform'
      }
    }
  }
}

</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    /* min-height: calc(100vh - 50px); */
    position: relative;
    /* overflow: hidden; */
  }

</style>
