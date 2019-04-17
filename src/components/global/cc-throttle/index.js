import { throttle } from 'throttle-debounce'
export default {
  name: 'cc-throttle',
  abstract: true,
  props: {
    time: {
      type: Number,
      required: true
    },
    events: String
  },
  data () {
    return {
      eventKeys: [],
      eventMap: {},
      throttleMap: {}
    }
  },
  created () {
    this.eventKeys = this.events.split(',')
    this.eventMap = { }
    this.throttleMap = { }
  },
  render () {
    const vnode = this.$slots.default[0]
    this.eventKeys.forEach(key => {
      const target = vnode.data.on[key]
      if (target === this.eventMap[key] && this.throttleMap[key]) {
        vnode.data.on[key] = this.throttleMap[key]
      } else if (target) {
        this.eventMap[key] = target
        this.throttleMap[key] = throttle(this.time, target)
        vnode.data.on[key] = this.throttleMap[key]
      }
    })

    console.log(vnode.data)
    return vnode
  }
}
