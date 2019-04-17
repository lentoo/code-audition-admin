module.exports = class CustomWebpackPlugin {
  apply (compiler) {
    compiler.plugin('normalModuleFactory', function (compilation) {
      console.log('normalModuleFactory runner')
    })
    compiler.plugin('failed', function (error) {
      console.log('failed: ', error)
    })
    compiler.plugin('done', function (stats) {
      console.log('done: ')
    })
  }
}
