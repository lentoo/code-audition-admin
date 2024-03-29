<template>
  <mavon-editor
    ref="mavonEditor"
    :toolbars="toolbars"
    @imgAdd="$imgAdd"
    @change="change"
    @save="save"
    :boxShadow="false"
    v-model="markdown"
  />
</template>

<script>
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { uploadFile } from '../../api/index.js'
Vue.use(mavonEditor)
export default {
  name: '',
  props: {
    value: {
      default: () => ({ markdown: '', html: '' })
    }
  },
  data () {
    return {
      markdown: this.value.markdown,
      html: this.value.html,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler () {
        this.markdown = this.value.markdown
        this.html = this.value.html
      }
    }
  },
  methods: {
    async $imgAdd (filename, file) {
      const formdata = new FormData()
      formdata.append('file', file)
      const res = await uploadFile(formdata)
      if (res.code === 1) {
        const me = this.$refs.mavonEditor
        me.$img2Url(filename, res.data.url)
      } else {
        this.$Message.error('图片上传失败，请重试')
      }
    },
    /**
   * 清除掉 HTML 标签
   */
    wordCount (render) {
      let n = render.replace(/<\/?.+?\/?>/g, '')
      n = n.replace(/\s+/g, '')
      this.wordLength = n === '' ? 0 : n.length
    },
    change (value, render) {
      if (value === '' || render === '') {
        return
      }
      this.html = render
      this.wordCount(render)
      this.$emit('input', {
        markdown: value,
        html: render,
        contentLength: this.wordLength
      })
      this.$emit('change')
    },
    save () {
      this.$emit('save')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
