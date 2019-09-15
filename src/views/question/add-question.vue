<template>
  <div class="add-question">
    <el-card>
      <cc-scroll-layout>
        <el-row>
          <el-col>
            <el-form
              label-position="top"
              label-width="100px"
              :model="form"
              :rules="rules"
              ref="form"
            >
              <el-row>
                <el-col :span="11">
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1" :span="12">
                  <el-form-item label="分类" prop="categorys">
                    <el-select
                      style="width: 100%"
                      v-model="form.categorys"
                      multiple
                      filterable
                      remote
                      reserve-keyword
                      placeholder="请选择分类"
                      :multiple-limit="5"
                      :remote-method="remoteMethod"
                      :loading="loading"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <cc-fade>
                <el-form-item label="描述（可选）" v-show="showDesc">
                  <cc-markdown
                    v-model="form.desc"
                    style="height: 400px;"
                  ></cc-markdown>
                  <!-- <el-input v-model="form.name"></el-input> -->
                </el-form-item>
              </cc-fade>
              <el-form-item label="答案" prop="answer">
                <cc-markdown
                  v-model="form.answer"
                  style="height: 400px;"
                ></cc-markdown>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row slot="fixed">
          <el-col class="tc">
            <el-button class="mr20" @click="back">返回</el-button>
            <el-button
              class="mr20"
              type="success"
              @click="showDesc = ~showDesc"
              >{{ showDesc ? "关闭描述" : "添加描述" }}</el-button
            >
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-col>
        </el-row>
      </cc-scroll-layout>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { Select, Option } from 'element-ui'
import CcMarkdown from '../../components/cc-markdown/index.js'
import { addQuestionItem } from '../../api/question'
import { fetchSorts } from '../../api/category'
import { delay } from '../../utils'
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
export default {
  name: 'add-question',
  components: {
    CcMarkdown
  },
  data () {
    return {
      form: {
        title: '',
        categorys: '',
        desc: '',
        answer: ''
      },
      rules: {
        title: [
          { required: true, trigger: 'blur', message: '请输入标题' }
        ],
        categorys: [
          { required: true, trigger: 'blur', message: '请选择分类' }
        ],
        answer: [
          { required: true, trigger: 'blur', message: '请输入答案' }
        ]
      },
      showDesc: false,
      loading: false,
      options: []
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    async remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        const { items } = await fetchSorts({
          name: query
        })
        this.loading = false
        const res = Object.assign(items)
        console.log(res)
        this.options = res.map(item => ({ value: item._id, label: item.sortName }))
      } else {
        this.options = []
      }
    },
    onSubmit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const params = {
            sort: this.form.categorys,
            title: this.form.title,
            answerOfmarkdown: this.form.answer.markdown,
            answerOfhtml: this.form.answer.html
          }
          if (this.showDesc) {
            params.descriptionOfhtml = this.form.desc.html
            params.descriptionOfmarkdown = this.form.desc.markdown
          }
          const res = await addQuestionItem({ data: params })

          // const res = await questionSubmit(params)
          console.log('res', res)
          if (res.code === 1) {
            this.$message.success('添加成功')
            delay(1000).then(() => {
              this.$router.back()
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-question {
}
</style>
