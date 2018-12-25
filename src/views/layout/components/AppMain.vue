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
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        const app_cons = document.querySelectorAll('.app-main')
        console.log(app_cons)
        // console.log(app_cons[0].querySelector('#qfooter'))
        if (app_cons && app_cons.length > 0 && !app_cons[0].querySelector('#qfooter')) {
          const app_con = app_cons[0]
          console.log(app_con)
          const footer = document.createElement('div')
          footer.id = 'qfooter'
          footer.style.fontSize = '12px'
          footer.style.padding = '10px 0'
          footer.style.color = '#fff'
          footer.style.textAlign = 'center'
          footer.style.marginTop = '-40px'
          footer.innerText = '京ICP备18040697号-1'
          app_con.appendChild(footer)
        }
      }, 600)
    })
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
