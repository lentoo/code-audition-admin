<template>
  <div class="cc-scroll-content">
    <div class="cc-scroll-header">
      <slot name="header"></slot>
    </div>
    <div class="cc-scroll-body"
      :class="{
        containerFixed: $slots.fixed ? true: false
      }"
    >
      <slot></slot>
    </div>
    <div class="cc-scroll-fixed" v-if="$slots.fixed">
      <slot name="fixed"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cc-scroll-content'
}
</script>
<style lang="scss" scoped>
.cc-scroll {
  &-content {
    position: relative;
    overflow: hidden;
    padding-bottom: 45px;
  }
  &-body {
    &.containerFixed {
      height: 783px;
      padding-bottom: 35px;
    }
    height: 828px;
    overflow-y: auto;
    box-sizing: border-box;
    &::-webkit-scrollbar {width: 8px;  background-color:transparent;} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    &::-webkit-scrollbar-track {background-color: #f0f6ff;  } /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {background-color: #b0c0d0; border-radius:6px;} /*定义滑块 内阴影+圆角*/
    &:hover {
      &::-webkit-scrollbar{
        display: block;
      }
    }
  }
  &-fixed {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 15px;
    z-index: 10;
    background: #fff;
    text-align: center;
    &::before {
      content: " ";
      position: absolute;
      top: -10px;
      left: 0;
      right: 0;
      height: 10px;
      background-position: 0 0;
      background-repeat: repeat-x;
      background-size: 1px auto;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAYAAAB10jRKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTdGOUJEOEEzNkU4MTFFNzkxNzZEM0Y1OTRGRjdBQkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTdGOUJEOEIzNkU4MTFFNzkxNzZEM0Y1OTRGRjdBQkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNUFBQzcwOTM2REYxMUU3OTE3NkQzRjU5NEZGN0FCRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNUFBQzcwQTM2REYxMUU3OTE3NkQzRjU5NEZGN0FCRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoWPRTMAAAAkSURBVHjaYvj//z8D87Vr1xiZGBgYwAQTnGCGE0xwWUaAAAMA/rIFo+cUt4gAAAAASUVORK5CYII=);
    }
  }
}
</style>
