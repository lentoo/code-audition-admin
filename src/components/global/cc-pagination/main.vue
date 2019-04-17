<template>
  <div class="cc-pagination">
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[20, 50, 100, 200, 500, 1000]"
      v-bind="$attrs"
      v-on="$listeners"
      >
    </el-pagination>
  </div>
</template>
<script>
import Vue from 'vue'
import { Pagination } from 'element-ui'
Vue.component(Pagination.name, Pagination)
export default {
  name: 'cc-pagination'
}
</script>
<style lang="scss" scoped>
.cc-pagination {
  margin-top: 10px;
  display: inline-block;
}
</style>
<style lang="scss">
.selected {
  background: inherit;
}
.cc-pagination {
  .el-pager li.active {
    color: #fff;
    background: rgba(54, 153, 255, 1);
    border-color: rgba(54, 153, 255, 1);
    cursor: default;
  }
  .el-pager li {
    border: 1px solid rgba(237, 241, 249, 1);
    border-right-width: 0;
  }
  .el-pager li:last-child {
    border-right-width: 1px;
  }
  .el-pagination .btn-prev {
    border: 1px solid rgba(237, 241, 249, 1);
    padding-right: 6px;
  }
  .el-pagination .btn-next {
    border: 1px solid rgba(237, 241, 249, 1);
    border-left: 0;
    padding-left: 6px;
  }
}
</style>
