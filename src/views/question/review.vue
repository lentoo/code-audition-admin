<template>
  <div class="review">
    <el-card>
      <el-row>
        <el-col :span="3">
          <el-select v-model="value" clearable>
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
          <el-input placeholder="输入微信名称进行搜索"></el-input>
        </el-col>
        <el-col class="ml10" :span="2">
          <el-button type="primary">搜索</el-button>
        </el-col>
      </el-row>
      <el-row class="mt20">
        <el-col>
          <cc-table
            :columns="columns"
            :row="list"
            max-height="72vh"
          >

            <template slot="sorts" slot-scope="{ scope }">
              <el-tag v-for="sort in scope.row.sorts" :key="sort" class="mr5" size="small">{{sort}}</el-tag>
            </template>

            <template slot="auditStatus" slot-scope="{ scope }">
              <el-tag size="small" :type="scope.row.auditStatus | getTagType">{{scope.row.auditStatus}}</el-tag>

            </template>

            <template slot="operate" slot-scope="{ scope }">
              <span class="pointer theme pl10" v-if="scope.row.auditStatus === '审核中'" @click="detail(scope.row)">审核</span>
              <span class="pointer theme pl10" v-else @click="detail(scope.row)">详情</span>
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
        <el-dialog title="回复内容" width="30%" append-to-body :visible.sync="replyVisible">
          <el-row class="pl20">
            <el-col>
              <el-form :model="form" label-width="100px">
                <el-form-item :label="replyPass ? '通过原因：': '驳回原因：'">
                  <el-input v-model="form.treatContent">

                  </el-input>
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
          <el-col><span class="w100 tr mr5">微信名称：</span>{{currentItem.userName}}</el-col>
          <el-col class="mt20"><span class="w100 tr mr5">审核状态：</span><el-tag size="small" :type="question.status | getTagType">{{question.status}}</el-tag></el-col>
          <el-col class="mt20" v-if="question.description"><span class="w100 tr mr5">描述：</span>{{question.description}}</el-col>
          <el-col class="mt20"><span class="w100 tr mr5">答案：</span>{{question.answer}}</el-col>
          <el-col class="mt20" v-if="['已通过', '已驳回'].includes(question.status)">
            <el-row>
              <el-col>
                <span class="w100 tr mr5">审核人：</span>{{question.auditPerson}}
              </el-col>
              <el-col class="mt20">
                <span class="w100 tr mr5">原因：</span>{{question.treatContent}}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer" v-if="question.status === '审核中'">
          <el-button @click="replyVisible = true; replyPass = false">驳回</el-button>
          <el-button type="primary" @click="handlePass">通过</el-button>
        </div>
    </el-dialog>
    </el-card>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { Input, Button, Select, Option, Tag, Dialog } from 'element-ui'
import * as types from '../../constant/types/question-types.js'
import TableMixin from '../../mixins/table'
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
        label: '审核中'
      }, {
        value: 2000,
        label: '已通过'
      }, {
        value: 3000,
        label: '已驳回'
      }],
      value: '',
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
          prop: 'id',
          label: '编号'
        },
        {
          prop: 'userName',
          label: '微信名称'
        },
        {
          prop: 'createdDate',
          label: '提交时间'
        },
        {
          prop: 'title',
          label: '标题'
        },
        {
          prop: 'sorts',
          label: '分类',
          slot: 'sorts'
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
      ]
    }
  },
  filters: {
    getTagType (type) {
      const types = {
        '审核中': 'danger',
        '正在处理': '',
        '已通过': 'success',
        '已驳回': 'info'
      }
      return types[type]
    }
  },
  computed: {
    ...mapGetters(['getQuestionList', 'getAuditQuestion', 'getQuestionDetail'])
  },
  created () {
    this.loadData()
  },
  methods: {
    ...mapActions([types.GET_QUESTION_LIST, types.AUDIT_QUESTION, types.QUESTION_DETAIL]),
    async loadData () {
      await this.GET_QUESTION_LIST({
        limit: this.pagination.limit,
        page: this.pagination.page
      })
      this.list = Object.freeze(this.getQuestionList.data.data)
      this.$success(this.getQuestionList.data.page)
      console.log('getQuestionList', this.getQuestionList)
    },
    async detail (item) {
      this.currentItem = item
      await this.questionDetail()
      this.question = this.getQuestionDetail.data
      console.log('getQuestionDetail', this.getQuestionDetail)
      this.dialogVisible = true
    },
    questionDetail () {
      return this.QUESTION_DETAIL({
        id: this.currentItem.id
      })
    },
    async handleObsolete () {
      await this.auditQuestion(3000, this.form.treatContent)
      this.dialogVisible = false
      this.replyVisible = false
      this.loadData()
    },
    async handlePass () {
      await this.auditQuestion(2000)
      this.dialogVisible = false
      this.loadData()
    },
    auditQuestion (status, content = '') {
      return this.AUDIT_QUESTION({
        id: this.currentItem.id,
        auditStatus: status,
        treatContent: content
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
