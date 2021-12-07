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

### 使用

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
fs.appendFile('data.txt', 'hello node.js',{},  (err) => {
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
fs.watchFile('data.txt', {interval: 20}, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log('文件被修改了')
    fs.unwatchFile('data.txt')
  }
})
```

可通过 fs.unwatchFile() 取消对文件的监听。
