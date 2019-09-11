<template>
  <el-row>
    <el-col>
      <el-card class="category">
        <el-row class="mb20">
          <el-col :span="4">
            <el-input
              v-model="content"
              placeholder="请输入分类名称搜索"
            ></el-input>
          </el-col>
          <el-col :span="2" class="tc">
            <el-button type="primary" @click="search">
              搜索
            </el-button>
          </el-col>
        </el-row>
        <el-row class="mb20">
          <el-col>
            <el-row type="flex">
              <!-- <el-col :span="2"> -->
              <el-button
                @click="
                  dialogTitle = '添加分类';
                  dialogFormVisible = true;
                "
              >
                添加分类
              </el-button>
              <!-- </el-col> -->
            </el-row>
          </el-col>
        </el-row>
        <cc-table :columns="columns" :row="list" max-height="65vh">
          <template slot="icon" slot-scope="{ scope }">
            <img class="img" :src="scope.row.icon" />
          </template>
          <template slot="operate" slot-scope="{ scope }">
            <span class="pointer theme pl10" @click="updateItem(scope.row)"
              >修改</span
            >
            <el-popover placement="top" width="160" v-model="scope.row.popover">
              <p>你确定要删除这条记录吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="scope.row.popover = false"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleDeleteClick(scope.row)"
                  >确定</el-button
                >
              </div>
              <span slot="reference" class="pointer theme pl10">删除</span>
            </el-popover>
          </template>
        </cc-table>
        <cc-pagination
          :total="pagination.count"
          :current-page.sync="pagination.page"
          :page-size="pagination.limit"
          @size-change="handleSizeChange"
          @prev-click="handlePreChange"
          @next-click="handleNextChange"
          @current-change="handlePageChange"
        ></cc-pagination>
      </el-card>
    </el-col>
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="650px"
    >
      <el-form :model="form">
        <el-form-item label="分类名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类图标：" :label-width="formLabelWidth">
          <div v-if="form.iconUrl" class="dialog-img">
            <img :src="form.iconUrl" alt="" srcset="" />
          </div>
          <el-upload
            :action="uploadUrl"
            :on-success="handleUploadSuccess"
            :show-file-list="false"
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <!-- <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            > -->
          </el-upload>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <img src="" alt="" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogClick">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TableMixin from '../../mixins/table'
import categoryTypes from '../../constant/types/category-types.js'
import { fetchSorts, saveSorts, removeSortItem } from '../../api/category/index'
export default {
  name: 'category',
  mixins: [TableMixin],
  data () {
    return {
      categorys: [],
      content: '',
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
          slot: 'icon',
          label: '分类图标'
        },
        {
          prop: 'questionNum',
          label: '题目数'
        },
        {
          prop: 'attentionNum',
          label: '关注人数'
        },
        {
          label: '操作',
          slot: 'operate'
        }
      ],
      dialogTitle: '添加分类',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        iconUrl: ''
      },
      list: []
    }
  },
  computed: {
    ...mapGetters(['getCategoriesList', 'getAddCategory', 'getUpdateCategory', 'getDeleteCategory']),
    uploadUrl () {
      return process.env.VUE_APP_UPLOAD
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    ...mapActions([categoryTypes.GET_CATEGORIES, categoryTypes.ADD_CATEGORY, categoryTypes.UPDATE_CATEGORY, categoryTypes.DELETE_CATEGORY]),
    search () {
      this.loadData()
    },
    async loadData () {
      const { page, items } = await fetchSorts({
        page: this.pagination.page,
        limit: this.pagination.limit,
        name: this.content
      })
      this.pagination.page = page.page
      this.pagination.count = page.total

      let list = items

      list = list.map(item => {
        this.$set(item, 'popover', false)
        return item
      })
      this.list = list
    },
    updateItem (item) {
      this.form = {
        id: item._id,
        name: item.sortName,
        iconUrl: item.icon
      }
      this.dialogFormVisible = true
      this.dialogTitle = '修改分类'
    },
    async handleDeleteClick (item) {
      await removeSortItem({ id: item._id })
      // await this.DELETE_CATEGORY(item.id)
      item.popover = false
      this.loadData()
      // this.$tips({
      //   result: this.getDeleteCategory
      // }).then(() => {
      // })
    },
    handleUploadSuccess (response, file, fileList) {
      this.form.iconUrl = response.code && response.data.url
    },
    async handleDialogClick () {
      if (this.form.name.trim() === '') {
        this.$message.error('请输入分类名称')
        return
      }
      if (this.form.iconUrl.trim() === '') {
        this.$message.error('请上传分类图标')
        return
      }
      const sortVariables = {
        sortName: this.form.name,
        icon: this.form.iconUrl
      }
      if (this.form.id) {
        sortVariables._id = this.form.id
      }
      await saveSorts({
        sort: sortVariables
      })
      this.loadData()

      this.dialogFormVisible = false

      this.form = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-img {
  > img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
  }
}
.img {
  width: 30px;
  height: 30px;
}
</style>
