## path

内置模块，require 之后直接使用，用于处理文件/目录的路径。

### 常用 API

- basename()：获取路径中基础名称
- dirname()：获取路径中目录名称
- extname()：获取路径中拓展名称
- isAbsolute()：获取路径是否为绝对路径
- join()：拼接多个路径片段
- resolve()：返回绝对路径
- parse()：解析路径
- format()：序列化路径
- normalize()：规划化路径

### basename()

获取路径中的基础名称

```js
const path = require('path')
// 获取正在执行脚本文件的绝对路径
console.log(__filename) // /Users/gypsophila/wxc-space/code-space/nodejs-base/02.nodejs-core/01-path.js
/**
 * 01 返回的就是接收路径当中的最后一部分
 * 02 第二个参数表示扩展名，如果说没有设置则返回完整的文件名称带后缀
 * 03 第二个参数做为后缀时，如果没有在当前路径中被匹配到，那么就会忽略
 * 04 处理目录路径的时候如果说，结尾处有路径分割符，则也会被忽略掉
 */
console.log(path.basename(__filename)) // 01-path.js
console.log(path.basename(__filename, '.js')) // 01-path
console.log(path.basename(__filename, '.css')) // 01-path.js
// 处理目录
console.log(path.basename('/a/b/c')) // c
console.log(path.basename('/a/b/c/')) // c
```

### dirname()

获取路径目录名 (路径)

```js
const path = require('path')
/**
 * 返回路径中最后一个部分的上一层目录所在路径
 */
console.log(path.dirname(__filename)) // /Users/gypsophila/wxc-space/code-space/nodejs-base/02.nodejs-core
console.log(path.dirname('/a/b/c')) // /a/b
console.log(path.dirname('/a/b/c/'))// /a/b
```

### extname()

获取路径的扩展名

```js
const path = require('path')
/**
 * 01 返回 path路径中相应文件的后缀名
 * 02 如果 path 路径当中存在多个点，它匹配的是最后一个点，到结尾的内容
 */
console.log(path.extname(__filename)) // .js
console.log(path.extname('/a/b')) // '' 空字符串
console.log(path.extname('/a/b/index.html.js.css')) // .css
console.log(path.extname('/a/b/index.html.js.')) // .
```

### parse()

解析路径

```js
const path = require('path')
/**
 * 01 接收一个路径，返回一个对象，包含不同的信息
 * 02 root dir base ext name
 */
const obj = path.parse('/a/b/c/index.html')
//{
//  root: '/',
//  dir: '/a/b/c',
//  base: 'index.html',
//  ext: '.html',
//  name: 'index'
//}
```

### format()

序列化路径

```js
const path = require('path')
const obj = path.parse('./a/b/c/')
console.log(path.format(obj)) // ./a/b/c
```

### isAbsolute()

判断当前路径是否为绝对路径

```js
const path = require('path')
console.log(path.isAbsolute('foo')) // false
console.log(path.isAbsolute('/foo')) // true
console.log(path.isAbsolute('///foo')) // true
console.log(path.isAbsolute('')) // false
console.log(path.isAbsolute('.')) // false
console.log(path.isAbsolute('../bar')) // false
```

### join()

拼接路径

```js
const path = require('path')
console.log(path.join('a/b', 'c', 'index.html')) // a/b/c/index.html
console.log(path.join('/a/b', 'c', 'index.html')) // /a/b/c/index.html
console.log(path.join('/a/b', 'c', '../', 'index.html')) // /a/b/index.html
console.log(path.join('/a/b', 'c', './', 'index.html')) // /a/b/c/index.html
console.log(path.join('/a/b', 'c', '', 'index.html')) // /a/b/c/index.html
console.log(path.join('')) // .
```

### normalize()

规范化路径

```js
const path = require('path')
console.log(path.normalize('')) // .
console.log(path.normalize('a/b/c/d')) // a/b/c/d
console.log(path.normalize('a///b/c../d')) // a/b/c../d
console.log(path.normalize('a//\\/b/c\\/d')) // a/\/b/c\/d
console.log(path.normalize('a//\b/c\\/d')) // a/c\/d
```

### resolve()

返回绝对路径

```js
const path = require('path')
// process.cwd() + 'index.html'
console.log(path.resolve('index.html')) // /Users/gypsophila/wxc-space/code-space/nodejs-base/index.html
```

