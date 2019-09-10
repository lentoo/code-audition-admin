const path = require('path')
const client = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const serverConfig = {
  username: 'xb',
  host: 'ccode.live',
  port: '22',
  password: 'xb123456',
  path: '/var/local/code-admin'
}

const spinner = ora(`正在发布到：${serverConfig.host} 服务器 \n`)
spinner.start()
client.scp(path.resolve(__dirname, '../dist'), serverConfig, err => {
  if (err) {
    console.log(chalk.red('发布失败、错误信息为：' + err))
  } else {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    console.log(chalk.green(
      'Success! 成功发布到' + serverConfig.host + '服务器! \n' +
      year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second
    ))
  }
  spinner.stop()
})
