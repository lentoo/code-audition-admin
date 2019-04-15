<template>
  <header class="header">
    <div>
      <cc-svg-icon class-name="menu-fold" icon-class="menu-fold" @click="handleMenuFold"></cc-svg-icon>
    </div>
    <div>
      <!-- <el-breadcrumb separator="/"> -->
        <transition-group tag="el-breadcrumb" separator-class="el-icon-arrow-right" name="fade-move">
          <el-breadcrumb-item v-for="item in getBreadcrumbItems" :key="item.path">{{item.name}}</el-breadcrumb-item>
        </transition-group>
        <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
      <!-- </el-breadcrumb> -->
    </div>

    <div class="header-right">
      <div class="icon-items">
        <div class="icon-item">
          <cc-svg-icon icon-class='notice'></cc-svg-icon>
        </div>
          <el-dropdown @visible-change="dropdownVivibleHandle">
            <div class="icon-item" :class="{
              opened: dropdownVivible
            }">
              <cc-svg-icon class-name='icon-avatar' icon-class='avatar'></cc-svg-icon>
              <span>Lentoo</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

      </div>
      <!-- <div class="icon-items">
        <cc-svg-icon class-name='icon-avatar' icon-class='avatar'></cc-svg-icon>
        <span>Lentoo</span>
      </div> -->
    </div>
  </header>
</template>
<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
export default {
  name: 'Header',
  data () {
    return {
      dropdownVivible: false
    }
  },
  computed: {
    ...mapGetters(['getMenuCollapse', 'getBreadcrumbItems'])
  },
  methods: {
    ...mapActions(['MENU_COLLAPSE']),
    handleMenuFold () {
      this.MENU_COLLAPSE(!this.getMenuCollapse)
    },
    dropdownVivibleHandle (visible) {
      this.dropdownVivible = visible
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~styles/animation.scss';
$headerHeight: 65px;
.header {
  height: $headerHeight;
  line-height: $headerHeight;
  padding: 0 35px;
  box-shadow: 0px 0 7px rgba(72, 72, 72, .57);
  @include flex(row);
  justify-content: flex-start;
  align-items: center;
  .menu-fold {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
  .header-right {
    float: right;
    height: 100%;
    overflow: hidden;
    color: rgba(0, 0, 0, .65);
    @include flex(row);
    align-items: center;
    .icon-items {
      margin-right: 10px;
      height: 100%;
      @include flex(row);
      align-items: center;
      .icon-item {
        padding: 0 12px;
        @include flex(row);
        align-items: center;
        cursor: pointer;
        &.opened {
          background: rgba(0,0,0,.025);
        }
      }
    }
  }
  > div:first-child {
    padding: 0 10px;
  }
  > div:nth-child(2) {
    flex: 1;
    padding-left: 10px;
  }
  .fade-move-enter-active,.fade-move-leave-active {
    transition: .3s all ease;
    // position: absolute
  }
  .fade-move-enter,.fade-move-leave-to {
    opacity: 0;
    transform: translateX(-100px);
  }
  .fade-move-enter-to,.fade-move-leave {
    opacity: 1;
    transform: translateX(0);
  }
  .icon-avatar {
    @include wh(30px, 30px);
    margin-right: 10px;
    vertical-align: middle !important;
  }
}
</style>
