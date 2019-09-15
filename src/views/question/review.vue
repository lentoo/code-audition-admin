<template>
  <div class="review">
    <el-card>
      <el-row>
        <el-col :span="3">
          <el-select v-model="status" clearable>
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
            v-model="weName"
            placeholder="输入微信名称进行搜索"
          ></el-input>
        </el-col>
        <el-col class="ml10" :span="2">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
      </el-row>
      <el-row class="mt20">
        <el-col>
          <router-link to="/question/review/add" tag="el-button"
            >新增</router-link
          >
          <el-popover placement="bottom" width="160" v-model="batchPassVisible">
            <p>确认要将选择的题目批量审核通过吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="batchPassVisible = false"
                >取消</el-button
              >
              <el-button type="primary" size="mini" @click="handleBatchPass"
                >确定</el-button
              >
            </div>
            <el-button slot="reference" type="primary" style="margin-left: 10px"
              >批量通过</el-button
            >
          </el-popover>

          <el-popover
            placement="bottom"
            width="160"
            v-model="batchRejectVisible"
          >
            <p>确认要将选择的题目批量驳回吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="batchRejectVisible = false"
                >取消</el-button
              >
              <el-button
                class="mr10"
                type="primary"
                size="mini"
                @click="handleBatchReject"
                >确定</el-button
              >
            </div>
            <el-button slot="reference" type="danger" style="margin-left: 10px"
              >批量驳回</el-button
            >
          </el-popover>
        </el-col>
      </el-row>
      <el-row class="mt20">
        <el-col>
          <cc-table
            :columns="columns"
            :row="list"
            max-height="65vh"
            @selection-change="handleSelectionChange"
          >
            <template slot="sort" slot-scope="{ scope }">
              <el-tag
                v-for="sort in scope.row.sort"
                :key="sort._id"
                class="mr5"
                size="small"
                >{{ sort.sortName }}</el-tag
              >
            </template>

            <template slot="auditStatus" slot-scope="{ scope }">
              <el-tag
                size="small"
                :type="scope.row.auditStatus | getAuditText | getTagType"
                >{{ scope.row.auditStatus | getAuditText }}</el-tag
              >
            </template>

            <template slot="operate" slot-scope="{ scope }">
              <span
                class="pointer theme pl10"
                v-if="scope.row.auditStatus === 1000"
                @click="detail(scope.row)"
                >审核</span
              >
              <span class="pointer theme pl10" v-else @click="detail(scope.row)"
                >详情</span
              >
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
                <el-form-item :label="replyPass ? '通过原因：' : '驳回原因：'">
                  <el-input v-model="form.treatContent"> </el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button @click="replyVisible = false">取消</el-button>
            <el-button type="primary" @click="handleObsolete">确定</el-button>
          </div>
        </el-dialog>
        <el-row class="pl20">
          <el-col
            ><span class="w100 tr mr5">微信名称：</span
            >{{ currentItem.userName }}</el-col
          >

          <el-col class="mt20"
            ><span class="w100 tr mr5">提交时间：</span
            >{{ currentItem.createAtDate | dateFormat }}</el-col
          >
          <el-col class="mt20"
            ><span class="w100 tr mr5">标题：</span
            >{{ currentItem.title }}</el-col
          >
          <el-col class="mt20" v-if="question.descriptionOfhtml"
            ><span class="w100 tr mr5">描述：</span
            >{{ question.descriptionOfhtml }}</el-col
          >
          <el-col class="mt20">
            <span class="w100 tr mr5">答案：</span>
            <div v-html="question.answerOfhtml" class="inline"></div>
          </el-col>
          <el-col class="mt20"
            ><span class="w100 tr mr5">审核状态：</span
            ><el-tag
              size="small"
              :type="question.auditStatus | getAuditText | getTagType"
              >{{ question.auditStatus | getAuditText }}</el-tag
            ></el-col
          >
          <el-col
            class="mt20"
            v-if="[2000, 3000].includes(question.auditStatus)"
          >
            <el-row>
              <el-col>
                <span class="w100 tr mr5">审核时间：</span
                >{{ question.auditInfo.auditDate | dateFormat }}
              </el-col>
              <el-col class="mt20">
                <span class="w100 tr mr5">审核人：</span
                >{{ question.auditInfo.auditName }}
              </el-col>
              <el-col class="mt20">
                <span class="w100 tr mr5">原因：</span
                ><span
                  :class="{
                    danger: question.auditStatus === 3000,
                    success: question.auditStatus === 2000
                  }"
                >
                  {{ question.auditInfo.reason }}
                </span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div
          slot="footer"
          class="dialog-footer"
          v-if="question.auditStatus === 1000"
        >
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="danger"
            @click="
              replyVisible = true;
              replyPass = false;
            "
            >驳回</el-button
          >
          <el-button type="primary" @click="handlePass">通过</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import Vue from 'vue'
import { Input, Button, Select, Option, Tag, Dialog, MessageBox } from 'element-ui'
import TableMixin from '../../mixins/table'
import { fetchQuestionList, fetchQuestionItem, reviewQuestionItem } from '../../api/question'
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Tag.name, Tag)
Vue.component(Dialog.name, Dialog)
export default {
  name: 'review',
  mixins: [TableMixin],
  data () {
    return {
      options: [{
        value: 1000,
        label: '待审核'
      }, {
        value: 2000,
        label: '已通过'
      }, {
        value: 3000,
        label: '已驳回'
      }],
      batchPassVisible: false,
      batchRejectVisible: false,
      status: '',
      weName: '',
      list: [],
      currentItem: {},
      question: {},
      dialogVisible: false,
      replyVisible: false,
      replyPass: false,
      form: {
        treatContent: ''
      },
      columns: [
        {
          type: 'selection'
        },
        {
          prop: 'userName',
          label: '微信名称'
        },
        {
          prop: 'createAtDate',
          label: '提交时间'
        },
        {
          prop: 'title',
          label: '标题'
        },
        {
          prop: 'sort',
          label: '分类',
          slot: 'sort'
        },
        {
          prop: 'auditStatus',
          label: '状态',
          slot: 'auditStatus'
        },
        {
          label: '操作',
          slot: 'operate'
        }
      ],
      multipleSelection: []
    }
  },
  filters: {
    getTagType (type) {
      const types = {
        '待审核': 'warning',
        '正在处理': '',
        '已通过': 'success',
        '已驳回': 'danger'
      }
      return types[type]
    },
    getAuditText (type) {
      const auditText = {
        1000: '待审核',
        1001: '正在处理',
        2000: '已通过',
        3000: '已驳回'
      }
      return auditText[type]
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    handleSelectionChange (val) {
      console.log('valu', val)
      this.multipleSelection = val
    },
    search () {
      this.loadData()
    },
    async loadData (noCache = false) {
      const { page, items } = await fetchQuestionList({
        page: this.pagination.page,
        limit: this.pagination.limit,
        auditStatus: this.status || null,
        nickName: this.weName
      }, noCache)
      this.pagination.count = page.total
      this.list = Object.freeze(items.map(item => {
        item.userName = item.userinfo.nickName
        item.createAtDate = new Date(item.createAtDate).toLocaleString()
        item.selectable = item.auditStatus === 1000
        return item
      }))
    },
    async detail (item) {
      console.log('item', item)
      this.currentItem = item
      const res = await this.questionDetail()
      this.question = res
      console.log('res', res)
      this.dialogVisible = true
    },
    questionDetail () {
      return fetchQuestionItem({
        id: this.currentItem._id
      })
    },
    async handleObsolete () {
      await reviewQuestionItem({
        status: 3000,
        reason: this.form.treatContent,
        id: this.currentItem._id
      })
      this.dialogVisible = false
      this.replyVisible = false
      this.loadData(true)
    },
    async handlePass () {
      await reviewQuestionItem({
        status: 2000,
        reason: '审核通过',
        id: this.currentItem._id
      })
      this.dialogVisible = false
      this.loadData(true)
    },
    async handleBatchPass () {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择要批量通过的题目')
        return
      }
      await reviewQuestionItem({
        status: 2000,
        reason: '审核通过',
        id: this.multipleSelection.map(item => item._id).toString()
      })
      this.batchPassVisible = false
      this.loadData(true)
    },
    handleBatchReject () {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择要批量驳回的题目')
        return
      }
      MessageBox.prompt('请输入驳回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async ({ value }) => {
        await reviewQuestionItem({
          status: 3000,
          reason: value,
          id: this.multipleSelection.map(item => item._id).toString()
        })
        this.batchRejectVisible = false
        this.loadData(true)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.review {
  .w100 {
    width: 100px;
    display: inline-block;
  }
}
</style>
