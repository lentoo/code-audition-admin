export default [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard'
  },
  {
    name: '组件',
    path: '/components',
    icon: 'component',
    children: [
      {
        name: '数字渐变',
        path: '/components/count-to',
        icon: 'rise'
      },
      {
        name: '树状表格',
        path: '/components/tree-table',
        icon: 'tree'
      },
      {
        name: '可拖拽列表',
        path: '/components/drag-list',
        icon: 'drag'
      }
    ]
  },
  {
    name: '优化',
    path: '/optimization',
    icon: 'optimization',
    children: [
      {
        name: '自动合成精灵图',
        path: '/optimization/sprites',
        icon: 'sprites'
      }
    ]
  },
  {
    name: '题库管理',
    path: '/question',
    icon: 'question',
    children: [
      {
        name: '题目列表',
        path: '/question/review',
        icon: 'question-review'
      }
    ]
  },
  {
    name: '分类管理',
    path: '/category',
    icon: 'category-manager',
    children: [
      {
        name: '分类列表',
        path: '/category/index',
        icon: 'category-list'
      }
    ]
  },
  {
    name: '消息管理',
    path: '/message',
    icon: 'message-manager',
    children: [
      {
        name: '反馈列表',
        path: '/message/feedback',
        icon: 'feedback'
      }
    ]
  }

]
