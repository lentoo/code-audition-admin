<template>
  <el-row ref="tableWrapper" :class="`cc-table-${_uid}`">
    <el-col class="cc-table-wrapper" :span="24">
      <el-table
        v-on="$listeners"
        v-bind="$attrs"
        :height="autoHeight"
        :data="tableData"
      >
        <template v-for="(column, index) in tableColumns">
          <!-- 复选框 -->
          <el-table-column
            :key="index"
            v-if="column.type === 'selection'"
            type="selection"
            :reserve-selection="column.reserveSelection || false"
            :selectable="(row, index) => row.selectable"
            width="55"
          >
          </el-table-column>

          <!-- 序号 -->
          <el-table-column
            :key="index"
            v-else-if="column.type === 'index'"
            type="index"
            width="50"
            label="序号"
          >
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            :key="index"
            v-else-if="column.type === 'operate'"
            :fixed="column.fixed ? column.fixed : false"
            :width="column.width"
            align="center"
            :label="column.label"
          >
            <template v-if="column.slot === 'operate-header'" slot="header">
              <slot :name="column.slot"></slot>
            </template>
            <template slot-scope="scope">
              <div>
                <span
                  style="font-size: 12px;color: #3699FF;cursor: pointer;margin-right: 10px"
                  v-for="(operate, index) in column.operates"
                  :key="index"
                  @click="handleOperateClick(operate, scope.row)"
                  >{{ operate.name }}</span
                >
                <!-- <span style="font-size: 12px;color: #3699FF;cursor: pointer;" >删除</span> -->
              </div>
            </template>
          </el-table-column>
          <!-- 具体内容 -->
          <el-table-column
            v-else-if="column.checked !== false"
            :show-overflow-tooltip="true"
            :key="index"
            :align="align"
            :label="column.label"
            :width="column.width || ''"
          >
            <template slot-scope="scope">
              <!-- 如果slot有值的时候 那么当前格可以不显示，可以选择显示自定义的slot-->
              <label v-if="!column.slot">
                <span>
                  {{ scope.row[columns[index].prop] }}
                </span>
              </label>
              <!-- 使用slot的情况下 -->
              <label v-if="column.slot">
                <!-- 具名slot -->
                <slot
                  v-if="column.slot"
                  :name="column.slot"
                  :scope="scope"
                ></slot>
              </label>
            </template>
          </el-table-column>
        </template>
        <!-- 默认的 solt -->
        <slot></slot>
      </el-table>
      <cc-drawer
        v-if="drawer"
        class="drawer-wrapper"
        v-model="drawerVisible"
        :title="drawerTitle"
      >
        <div v-if="$slots.title" slot="title"></div>
        <slot name="drawer"> </slot>
      </cc-drawer>
    </el-col>
  </el-row>
</template>
<script>
/**
 * @description 基于 element-ui 的 el-table 封装的组件
 */
export default {
  name: 'cc-table',
  props: {
    /**
     * @description 表格列数据
     */
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * @description 行数据 / table 数据
     */
    row: {
      type: Array,
      default: () => []
    },
    /**
     * @description 是否显示抽屉
     */
    drawer: {
      type: Boolean,
      default: false
    },
    /**
     * @description 抽屉标题
     */
    drawerTitle: {
      type: String,
      default: ''
    },
    /**
     * @description 对齐方式  left/center/right
     */
    align: {
      default: 'left'
    },
    /**
     * @description 表格最大高度 默认 65vh
     */
    maxHeight: {
      default: ''
    }
  },
  data () {
    return {
      tableColumns: this.columns,
      tableData: this.row,
      /**
       * @description 是否打开抽屉
       */
      drawerVisible: false,
      autoHeight: null
    }
  },
  watch: {
    row (newRow, oldRow) {
      this.tableData = this.row
      this.$nextTick(() => {
        if (newRow.length === oldRow.length) {
          return
        }
        let tableRowCount = 0
        const rows = this.$el.querySelectorAll('.el-table__row')
        if (rows.length > 0) {
          tableRowCount = rows[0].clientHeight * rows.length
        }
        const rect = this.$refs.tableWrapper.$el.getBoundingClientRect()
        console.log('tableRowCount', tableRowCount, rect.top, window.innerHeight)
        if (tableRowCount + rect.top + 100 > window.innerHeight) {
          this.autoHeight = this.maxHeight
        } else {
          this.autoHeight = ''
        }
      })
    },
    columns () {
      this.tableColumns = this.columns
    }
  },
  methods: {
    /**
     * @description 打开抽屉
     */
    openDrawer () {
      this.drawerVisible = true
    },
    /**
     * @description 关闭抽屉
     */
    closeDrawer () {
      this.drawerVisible = false
    },
    handleOperateClick (item, row) {
      console.log(item)
      this.$emit('operate-click', item.emitKey, row)
    },
    getTableInstance () {
      return this.$refs.table
    }
  }
}
</script>
<style lang="scss">
@import "~styles/index.scss";
.cc-table-wrapper {
  position: relative;
  .drawer-wrapper {
    @include flex(column);
  }
  .el-table,
  .el-table__header-wrapper,
  .el-table__fixed-header-wrapper {
    th,
    .gutter,
    .el-table__fixed-right-patch {
      background: rgba(238, 238, 238, 1);
      color: rgba(51, 51, 51, 1);
    }
  }
  .el-table__body-wrapper {
    @include scrollbar();
  }
}
</style>
