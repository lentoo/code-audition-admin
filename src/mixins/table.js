export default {
  data () {
    return {
      pagination: {
        page: 1,
        limit: 20,
        count: 0,
        pages: 0,
        hasMore: false
      },
      mixin_loading: true,
      mixin_loadingText: '正在加载中...'
    }
  },
  methods: {
    handleSizeChange (size) {
      this.pagination.limit = size
      this.loadData()
    },
    handlePageChange (page) {
      this.pagination.page = page
      this.loadData()
    },
    handlePreChange (page) {
      this.pagination.page = page
      this.loadData()
    },
    handleNextChange (page) {
      this.pagination.page = page
      this.loadData()
    },
    loadData () {
      this.mixin_loading = true
      console.log('loadData')
    },
    loading () {
      this.mixin_loading = true
    },
    /**
     * @description 表单请求成功
     */
    success (result) {
      this.pagination.page = Number(result.data.current)
      this.pagination.count = Number(result.data.total)
      this.mixin_loading = false
      return JSON.parse(JSON.stringify(result.data.return_data))
    },
    /**
     * @description 表单请求成功
     */
    $success (page) {
      this.pagination.page = Number(page.current)
      this.pagination.count = Number(page.total)
      this.mixin_loading = false
    },
    $setPagination (pagination) {
      Object.assign(this.pagination, pagination)
      this.pagination.count = pagination.total
    }
  }
}
