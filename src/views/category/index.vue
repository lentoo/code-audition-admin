<template>
  <el-row>
    <el-col>
      <el-card class="category">
        <el-row class="mb20">
          <el-col>
            <el-row type="flex" justify="end">
              <!-- <el-col :span="2"> -->
              <el-button @click="dialogFormVisible = true">
                添加分类
              </el-button>
              <!-- </el-col> -->
            </el-row>
          </el-col>
        </el-row>
        <cc-table :columns="columns"> </cc-table>

        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%">
          <el-form :model="form">
            <el-form-item label="分类名称：" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类图标：" :label-width="formLabelWidth">
              <el-upload action=''>
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
              <img src="" alt="">
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import categoryTypes from '../../constant/types/category-types.js'
export default {
  name: 'category',

  data () {
    return {
      categorys: [],
      columns: [
        {
          type: 'index'
        },
        {
          prop: 'sortName',
          label: '分类名称'
        },
        {
          prop: 'icon',
          label: '分类图标'
        },
        {
          prop: 'questionCount',
          label: '题目数'
        },
        {
          prop: 'attentionFrequency',
          label: '关注人数'
        }
      ],
      dialogTitle: '添加分类',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getCategoriesList'])
  },
  methods: {
    ...mapActions([categoryTypes.GET_CATEGORIES])
  }
}
</script>

<style lang="scss" scoped>
</style>
