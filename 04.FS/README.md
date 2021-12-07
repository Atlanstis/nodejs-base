## FS

FS 是内置核心模块，提供文件系统操作的 API。

- 基本操作类
  - stat
    - stat()
  - write
    - createWriteStream()
  - read
    - createReadStream()
  - watcher
    - watch()
- 常用方法
  - 权限操作
    - chmod
    - chgrp
  - 文件增删改查
    - 打开/关闭
      - open/close
    - 读取
      - readdir
      - readFile
      - readlink
    - 写入
      - write
      - writeFile
      - appendFile
    - 删除
  - 工具方法

### 文件相关

#### 权限位

用户对于文件所具备的操作权限

<img src="assets/权限位.png" alt="权限位" style="zoom:50%;" />

#### 标识符

Nodejs 中 flag 表示对文件操作方式

##### 常见标识符

- r：表示可读
- w：表示可写
- s：表示同步
- +：表示执行相反操作
- x：表示排它操作
- a：表示追加操作

#### 文件操作符

fd 就是操作系统分配给被打开文件的标识

### 文件操作 API

- readFile：从指定文件中读取数据
- writeFIle：向指定文件中写入数据
- appendFile：追加的方式向指定文件中写入数据
- copyFile：将某个文件中的数据拷贝到另一文件
- watchFile：对指定文件进行监控

### 常用操作

#### readFile

```js
fs.readFile(path.resolve('data.txt'), 'utf-8', (err, data) => {
  console.log(err)
  if (!err) {
    console.log(data)
  }
})
```

针对未存在的文件，会报错。

#### writeFile

```js
fs.writeFile('data.txt', '123', {}, (err) => {
  if (!err) {
    fs.readFile('data.txt', 'utf-8', (err, data) => {
      console.log(data)
    })
  }
})
```

针对未存在的文件，首先会进行文件的创建操作，再将内容写入。

#### appendFile

```js
fs.appendFile('data.txt', 'hello node.js', {}, (err) => {
  console.log('写入成功')
})
```

在文件的末尾追加内容。

#### copyFile

```js
fs.copyFile('data.txt', 'test.txt', () => {
  console.log('拷贝成功')
})
```

将 文件 a 的内容复制到文件 b。

#### watchFile

```js
fs.watchFile('data.txt', { interval: 20 }, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log('文件被修改了')
    fs.unwatchFile('data.txt')
  }
})
```

可通过 fs.unwatchFile() 取消对文件的监听。

### 大文件读写

针对于小型文件，通过上述方法的使用，会将内容读取到内存中，再进行操作。

然而针对大型文件，将内容全部读取到内存中，可能会引起内存溢出等一系列问题。

因此可以使用下列方法对大文件进行操作。

- open
- close
- read
- write

```js
// 使用 open，close，read，write 对大型文件进行复制

const fs = require('fs')
/**
 * 01 打开 a 文件，利用 read 将数据保存到 buffer 暂存起来
 * 02 打开 b 文件，利用 write 将 buffer 中数据写入到 b 文件中
 */
let buf = Buffer.alloc(10)
const BUFFER_SIZE = buf.length
let readOffset = 0

fs.open('a.txt', 'r', (err, rfd) => {
  fs.open('b.txt', 'w', (err, wfd) => {
    function next () {
      fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes) => {
        if (!readBytes) {
          // 如果条件成立，说明内容已经读取完毕
          fs.close(rfd, ()=> {})
          fs.close(wfd, ()=> {})
          console.log('拷贝完成')
          return
        }
        readOffset += readBytes
        fs.write(wfd, buf, 0, readBytes, (err, written) => {
          next()
        })
      })
    }
    next()
  })
})
```



