<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>
<script>
export default {
  name: 'cc-fade',
  abstruct: true
}
</script>
<style lang="scss">
.fade-enter-active,.fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter,.fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave {
  opacity: 1;
}
</style>
