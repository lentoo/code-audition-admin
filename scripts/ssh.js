const Client = require('ssh2')
const path = require('path')
const conn = new Client()

conn.on('ready', () => {
  console.log('client :: ready')

  conn.sftp((err, sftp) => {
    if (err) throw err
    // sftp.fastPut(path.resolve(__dirname, './generateComponent.js'), '/home/xb', (err, result) => {
    //   if (err) throw err
    //   console.log('result', result)
    // })
    // sftp.readdir('/home/xb/', (err, list) => {
    //   if (err) throw err
    //   list.map(file => {
    //     console.log(file.filename)
    //   })
    //   conn.end()
    // })
    sftp.fastPut(path.resolve(__dirname, './generateComponent.js'), '/home/xb/generateComponent.js', (err, result) => {
      if (err) throw err
      console.log('result', result)
    })
  })
}).connect({
  host: 'ccode.live',
  port: 22,
  username: 'xb',
  password: 'xb123456'
})
