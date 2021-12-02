## 全局对象

### 常见全局变量：

- \_\_filename：返回正在执行脚本文件的绝对路径
- \_\_dirname：返回正在执行脚本所在目录
- process：提供与当前进程互动的接口
- require：实现模块的加载
- module、exports：处理模块的导出

### process

- 获取进程信息

  - 资源：cpu 内存

    ```js
    // cpu
    process.cpuUseage();
    // 内存
    process.memoryUsage();
    ```

  - 运行环境：运行目录，node 环境信息，cpu 架构，用户环境，系统平台

    ```js
    // 运行目录
    process.cwd();
    // node 版本
    process.version;
    process.versions;
    // cpu 架构
    process.arch;
    // 用户环境
    process.env;
    process.env.NODE_ENV;
    process.env.PATH;
    // 用户管理员目录
    process.env.USERPROFILE; // window
    process.env.HOME; // mac
    // 系统平台
    process.platform;
    ```

  - 运行状态：启动参数，PID，运行时间

    ```js
    // 启动参数
    process.argv; // 返回数据，默认返回两个参数
    process.argv0; // 快捷获取第一个参数
    process.execArgv；
    // PID
    process.pid;
    process.ppid;
    // 运行时间
    process.uptime();
    ```

- 执行进程操作

  - 事件

    ```js
    // 执行完成后触发
    process.on('exit', (code) => {
      // 只能执行同步代码
    })
    // 执行完成前触发
    process.on('beforeExit', (code) => {
      // 可以执行异步代码
    })
    // 中断执行
    process.exit();
    ```

  - 标准输出 输入 错误

    ```js
    // 标准输出
    process.stdout;
    // 标准输入
    process.stdin;
    // 设置格式
    process.stdin.setEncoding('utf-8');
    process.stdin.on('readble', () => {
      let chunk = process.stdin.read();
      if (chunk !== null) {
        process.stdout.write('data ' + chunk)
      }
    })
    ```

    
