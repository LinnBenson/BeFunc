<h1 align="center">
    <a href="https://github.com/LinnBenson/BeFunc">
        BeFunc
    </a>
</h1>
<p align="center">
    <a href="https://github.com/LinnBenson/BeFunc/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="BeFunc is released under the MIT license." />
    </a>
    <a href="https://www.npmjs.com/package/befunc">
        <img src="https://img.shields.io/npm/v/befunc?color=brightgreen&label=npm%20package" alt="Current npm package version." />
    </a>
</p>

## 安装
```
npm install befunc
# 或
yarn add befunc
```

### Tool.class.js 方法

> 主要封装了一些常用的函数工具

#### 使用
```
import Tool, { ApiProess, ServerProess } from 'befunc';
```

##### 参数检查
- 判断是否为空（ 如 PHP 中的 empty 函数 ）
  - `func.empty( v )`
  - v 变量
- 判断是否数组或者对象
  - `func.isArray( v )`
  - v 变量
- 判断是否为 JSON 字符串
  - `func.isJson( v )`
  - v 变量
- 判断是否为函数
  - `func.isFunction( v )`
  - v 变量
##### 参数处理
- 将时间输出为指定格式
  - `func.time( time, format = 'Y-M-D h:m:s', timezone = 0 )`
  - time 格式化的时间或者时间戳
  - format 输出格式
  - timezone 结果时间加上指定小时
##### 参数生成
- 生成当前时间
  - `getTime( format = 'Y-M-D h:m:s' )`
  - format 可指定输出格式，为 false 则输出 10 位时间戳
- 生成随机字符串
  - `func.rand( length, type = 'all' )`
  - length 输出字符长度
  - type 输出字符类型 （ all: 大小写字母+数字、num: 数字、letter: 大小写字母 ）
- 复制对象
  - `copy( data, num = 1 )`
  - data 源对象
  - 复制数量（ 可填入数组，如 [ 2, 5 ] 意为随机返回 2-5 个对象 ）

### ApiProcess.class.js 方法

> 对 axios 的二次封装，以简化其使用

#### 使用
```
// 导入依赖
import { ApiProess } from 'befunc';

// 实例化类
const Api = ApiProess({
    logout: function, // 可选，网络请求为 403 时将执行此函数
    toast: function, // 可选，Toast 通知函数
    load: function, // 可选，加载函数
    error: function // 可选，网络请求错误执行函数
});
// 发起网络请求示例
Api.send({
    link: 'http://example.com',
    post: { id: 1 }, // 可选，如果没有此参数请求方法则为 GET
    check: true, // 可选，如果没此此参数则此函数将直接传回请求到的数据
    error: function( e ) { // 可选，请求出错时将调用此函数
        console.log( e );
    },
    run: function( e ) { // 可选，请求成功时将调用此函数
        console.log( e );
    }
}, true, { // 可选，为 true 时将调用起加载函数
    timeout: 15000 // 可选，默认为 15000ms
});
```

##### 构造对象
```
constructor( { logout: function, toast: function, load: function, error: function } )
```
- logout 注销触发函数
- toast Toast 通知触发函数
- load 加载触发函数
- error 网络错误提示内容
##### 发起网络请求
```
async send( data, load = true, options = {} )

data:
    {
        link: [ string ] 请求 URL,
        post: [ array ] POST 数据对象（ 为空则为 GET 请求 ）
        check: [ boolean ] 是否执行结果检查
        run: [ function ] 请求成功执行函数,
        error: [ function ] 请求出错执行函数
    }
```
- data 请求内容
- load 是否触发加载动画（ 需要传入了加载函数 ）
- options 请求可选配置
##### 检查请求结果
```
examine( data, result )

data:
    {
        run: [ function ] 请求成功执行函数,
        error: [ function ] 请求出错执行函数
    }
```
- data 处理函数
- result 请求到的结果

### ServerProess.class.js 方法

> 创建 Websocket 实例，并对消息进行处理

#### 使用
```
// 导入依赖
import { ServerProess } from 'befunc';

// 实例化类
const server = ServerProess({
    link: string, // 必须，Websocket 连接地址
    toast: function // 可选，Toast 通知函数
});
// 属性说明
this.server // 当前连接实例
this.state // 当前连接状态
this.restart // 断线后是否自动重连
this.message // 最后一次收到的消息
this.functions // 回调方法
```

##### 构造对象
```
constructor( { link: string, toast: function, heartbeatTime: number } )
```
- link Websocket 连接地址
- toast Toast 通知触发函数（ 为 false 时实例将不会自动连接 ）
- heartbeatTime 心跳间隔时间
##### 连接到服务器
- `linkServer()`
##### 发送消息
- `send( action, data = [] )`
  - action 动作参数
  - data 发送数据
##### 主动关闭连接
- `close()`
##### 添加回调函数
- `addFunc( funcName, func )`
  - funcName 函数名
  - func 方法
##### 删除回调函数
- `delFunc( funcName )`
  - funcName 函数名
