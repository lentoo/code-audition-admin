# 动画组件 淡入淡出动画

## 基础使用
``` html
<template>
  <el-card>
    <el-button @click="handleClick">淡入淡出</el-button>
    <cc-fade name="fade">
      <div v-show="isShow">自定义内容</div>
    </cc-fade>
  </el-card>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    handleClick () {
      this.isShow = ~this.isShow
    }
  }
}
</script>
```
