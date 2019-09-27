<template>
  <div class="review">
    <el-card>
      <el-row>
        <el-col :span="3">
          <el-select v-model="type" placeholder="请选择类型" clearable>
            <el-option
              v-for="item in tyepOpions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col class="ml10" :span="3">
          <el-select v-model="status" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col class="ml10" :span="4">
          <el-input
            v-model="nickName"
            placeholder="输入微信名称进行搜索"
          ></el-input>
        </el-col>
        <el-col class="ml10" :span="2">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
      </el-row>
      <el-row class="mt20">
        <el-col>
          <cc-table :columns="columns" :row="list" max-height="72vh">
            <template slot="type" slot-scope="{ scope }">
              <span>{{
                tyepOpions.find(item => scope.row.type === item.value).label
              }}</span>
            </template>

            <template slot="images" slot-scope="{ scope }">
              <img
                v-for="(img, index) in scope.row.images"
                :key="index"
                :src="img"
                @click="previewImage(img)"
                style="width: 50px;margin-right: 10px;cursor: pointer;"
              />
            </template>

            <template slot="status" slot-scope="{ scope }">
              <div>
                <el-tag :type="scope.row.status | getTagType" size="small">
                  {{
                    options.find(item => item.value === scope.row.status).label
                  }}
                </el-tag>
              </div>
            </template>

            <template slot="operate" slot-scope="{ scope }">
              <span
                class="pointer theme mr10"
                v-if="scope.row.status === 'TO_BE_PROCESSED'"
                @click="audit(scope.row)"
                >审核</span
              >

              <el-popover
                placement="bottom"
                width="160"
                v-model="scope.row.$popover"
              >
                <p>该条建议确定已完成？</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="scope.row.$popover = false"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="complete(scope.row)"
                    >确定</el-button
                  >
                </div>
                <span
                  slot="reference"
                  class="pointer theme mr10"
                  v-show="scope.row.status === 'PROCESSING'"
                  >完成</span
                >
              </el-popover>
            </template>
          </cc-table>
          <cc-pagination
            :total="pagination.count"
            :current-page.sync="pagination.page"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
            @prev-click="handlePreChange"
            @next-click="handleNextChange"
          >
          </cc-pagination>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="审核" width="40%" :visible.sync="dialogVisible">
      <el-dialog
        title="回复内容"
        width="30%"
        append-to-body
        :visible.sync="replyVisible"
      >
        <el-row class="pl20">
          <el-col>
            <el-form :model="form" label-width="100px">
              <el-form-item :label="replyPass ? '通过原因：' : '作废原因：'">
                <el-input v-model="form.treatContent"> </el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="replyVisible = false">取消</el-button>
          <el-button type="primary" @click="handlePass">确定</el-button>
        </div>
      </el-dialog>
      <el-row class="pl20">
        <el-col>微信名称：{{ currentItem.nickName }}</el-col>
        <el-col class="mt20">反馈类型：{{ currentItem.type }}</el-col>
        <el-col class="mt20">内容：{{ currentItem.content }}</el-col>
        <el-col class="mt20">
          <img
            v-for="(img, index) in currentItem.images"
            :key="index"
            :src="img"
            @click="previewImage(img)"
            style="max-width: 375px;cursor: pointer;"
          />
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            replyVisible = true;
            replyPass = false;
          "
          >作废</el-button
        >
        <el-button
          type="primary"
          @click="
            replyVisible = true;
            replyPass = true;
          "
          >通过</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="图片预览"
      width="50%"
      :visible.sync="previewImagevisible"
      append-to-body
    >
      <div class="tc">
        <img style="max-width: 500px" :src="previewImageSrc" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import { Input, Button, Select, Option, Tag, Popover, Form, FormItem } from 'element-ui'
import { fetchFeedbackList, auditFeedbackItem } from '@/api/message'
import TableMixin from '@/mixins/table'
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Tag.name, Tag)
Vue.component(Popover.name, Popover)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)

/**
   * 待处理
   */
const TO_BE_PROCESSED = 'TO_BE_PROCESSED'
/**
 * 正在处理
 */
const PROCESSING = 'PROCESSING'
/**
 * 已处理
 */
const PROCESSED = 'PROCESSED'
/**
 * 已作废
 */
const ABOLISHED = 'ABOLISHED'
export default {
  name: 'review',
  mixins: [TableMixin],
  data () {
    return {
      type: '',
      tyepOpions: [{
        value: 'IDEA',
        label: '意见'
      }, {
        value: 'BUG',
        label: 'Bug'
      }, {
        value: 'MAKE_COMPLAINTS',
        label: '吐槽'
      }],

      options: [{
        value: TO_BE_PROCESSED,
        label: '待处理'
      }, {
        value: PROCESSING,
        label: '正在处理'
      }, {
        value: PROCESSED,
        label: '已处理'
      }, {
        value: ABOLISHED,
        label: '已作废'
      }],
      currentItem: {},
      dialogVisible: false,
      replyVisible: false,
      nickName: '',
      status: '',
      list: [],
      columns: [
        {
          type: 'selection'
        },
        {
          prop: 'nickName',
          label: '微信名称'
        },
        {
          prop: 'createAtDate',
          label: '提交时间'
        },
        {
          prop: 'type',
          label: '类型',
          slot: 'type'
        },
        {
          prop: 'content',
          label: '内容'
        },
        {
          label: '反馈图片',
          slot: 'images'
        },
        {
          prop: 'status',
          label: '状态',
          slot: 'status'
        },
        {
          label: '操作',
          slot: 'operate'
        }
      ],
      form: {
        treatContent: ''
      },

      replyPass: true,
      previewImagevisible: false,
      previewImageSrc: ''
    }
  },
  filters: {
    getTagType (type) {
      const types = {
        TO_BE_PROCESSED: 'danger',
        PROCESSING: '',
        PROCESSED: 'success',
        ABOLISHED: 'info'
      }
      return types[type]
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const { items, page } = await fetchFeedbackList({
        page: {
          limit: this.pagination.limit,
          page: this.pagination.page
        },
        type: this.type || null,
        status: this.status || null,
        name: this.nickName || null
      })

      this.list = items.map(item => {
        this.$set(item, '$popover', false)
        item.createAtDate = typeof item.createAtDate === 'number' ? new Date(item.createAtDate).toLocaleString() : item.createAtDate
        item.nickName = item.feedbackUser.nickName
        return item
      })
      this.$setPagination(page)
    },
    search () {
      this.pagination.page = 1
      this.loadData()
    },
    audit (item) {
      this.currentItem = item
      this.dialogVisible = true
    },
    detail (item) {
      this.currentItem = item
      this.dialogVisible = true
    },
    /**
     * @description 完成
     */
    async complete (item) {
      this.currentItem = item
      await this.auditFeedback(PROCESSED)
      item.$popover = false
      this.loadData()
    },
    async handlePass () {
      if (!this.replyPass && this.form.treatContent.trim() === '') {
        this.$message.error('作废原因不能为空')
        return
      }
      await this.auditFeedback(this.replyPass ? PROCESSING : ABOLISHED)

      this.dialogVisible = this.replyVisible = false

      this.loadData()
    },
    auditFeedback (status, content = '') {
      return auditFeedbackItem({
        id: this.currentItem._id,
        status,
        resultContent: content
      })
    },
    previewImage (src) {
      this.previewImagevisible = true
      this.previewImageSrc = src
    }
  }
}
</script>
<style lang="scss" scoped>
.review {
}
</style>
