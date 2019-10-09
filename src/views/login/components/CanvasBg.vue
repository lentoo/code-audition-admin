<template>
  <canvas id="canvas"></canvas>
</template>

<script>
export default {
  name: 'canvas-login-bg',
  data () {
    return {
      can: {},
      w: 0,
      h: 0,
      timer: null,
      words: []
    }
  },
  mounted () {
    let canvas = document.getElementById('canvas')
    let can = canvas.getContext('2d')
    this.can = can

    this.w = canvas.width = window.innerWidth
    this.h = canvas.height = window.innerHeight
    this.words = Array(256).join('1').split('')
    this.can.fillStyle = this.color2()
    this.timer = setInterval(this.draw, 50)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    draw () {
      this.can.fillStyle = 'rgba(0,0,0,0.05)'
      this.can.fillRect(0, 0, this.w, this.h)
      this.can.fillStyle = this.color2()

      this.words.map((y, n) => {
        const text = String.fromCharCode(Math.ceil(65 + Math.random() * 57))
        let x = n * 10
        this.can.fillText(text, x, y)
        this.words[n] = (y > 758 + Math.random() * 484 ? 0 : y + 10)
      })
    },
    color1 () {
      let colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
      let color = ''
      for (let i = 0; i < 6; i++) {
        let n = Math.ceil(Math.random() * 15)
        color += '' + colors[n]
      }
      return '#' + color
    },
    color2 () {
      let color = Math.ceil(Math.random() * 16777215).toString(16)
      while (color.length < 6) {
        color = '0' + color
      }
      return '#' + color
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
