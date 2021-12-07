const path = require('path')
const fs = require('fs')
const marked = require('marked')
const browserSync = require('browser-sync')

/**
 * 01 读取 md 和 css 内容
 * 02 将上述读取出来的内容替换占位符，生成一个最终需要展示的 Html 字符串
 * 03 将上述的 Html 字符写入到指定的 Html 文件中
 * 04 监听 md 文档内容的变化，然后更新 Html 内容
 * 05 使用 browser-sync 来实时显示 Html 内容
 */

const resolve = (filePath) => path.resolve(filePath)

const mdPath = path.join(__dirname, process.argv[2])
const distPath = path.join(__dirname, 'dist')
const htmlFileName = path
  .basename(mdPath)
  .replace(path.extname(mdPath), '.html')
const htmlPath = path.join(distPath, htmlFileName)
const cssPath = resolve('github.css')
const tempPath = resolve('temp.hbs')

const temp = fs.readFileSync(tempPath, 'utf-8')

fs.watchFile(mdPath, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    fs.readFile(mdPath, 'utf-8', (err, data) => {
      if (!err) {
        // 将 md -> html
        const htmlStr = marked.parse(data)
        fs.readFile(cssPath, 'utf-8', (err, data) => {
          let retHtml = temp
            .replace('{{content}}', htmlStr)
            .replace('{{style}}', data)
          // 将上述的内容写入到指定的 html 文件中，用于在浏览器里进行展示
          fs.writeFile(htmlPath, retHtml, (err) => {
            if (!err) {
              console.log('html 生成成功了')
            } else {
              console.error(err)
            }
          })
        })
      }
    })
  }
})

browserSync.init({
  browser: '',
  server: path.join(__dirname, 'dist'),
  watch: true,
  index: path.basename(htmlPath)
})
