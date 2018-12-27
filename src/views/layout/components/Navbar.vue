<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <i class="icon iconfont icon-jiedian node"/>
        <span>{{ nodeInfo.name }}</span>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <div v-for="(item,index) in nodes" :key="index" @click= "itemClick(item)">
          <el-dropdown-item>
            {{ item.name }}
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import '@/assets/font/iconfont.css'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'nodes',
      'nodeInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    itemClick(item) {
      if (item.name === this.$store.getters.nodeInfo.name) {
        return
      }

      this.$store.dispatch('SetNodeInfo', item)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/variables.scss";
.navbar {
  background: top;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 100%;
    display: inline-block;
    position: absolute;
    right: 10px;
    color: $fontColor;

    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .node{
        font-size: 20px;
        color: $iconColor;
        vertical-align: middle;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

