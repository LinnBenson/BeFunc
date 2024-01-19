<h1 align="center">
    <a href="https://github.com/LinnBenson/BeFunc">
        BeFunc
    </a>
</h1>
<p align="center">
    <strong>函数封装</strong>
    <br />
    更方便的使用网络请求和函数工具
</p>
<p align="center">
    <a href="https://github.com/LinnBenson/BeFunc/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&logo=javascript&logoColor=%23F3F3F3&labelColor=%231f2328&color=%231f883d" alt="MIT" />
    </a>
    <a href="https://www.npmjs.com/package/befunc">
        <img src="https://img.shields.io/npm/v/befunc?style=for-the-badge&logo=npm&logoColor=%23F3F3F3&label=NPM&labelColor=%231f2328&color=%231f883d" alt="NPM" />
    </a>
    <a href="https://bemiun.com">
        <img src="https://img.shields.io/badge/SITE-BEMIUN-blue?style=for-the-badge&logo=coursera&logoColor=%23F3F3F3&labelColor=%231f2328&color=%231f883d" alt="Website" />
    </a>
    <a href="https://t.me/Beichuan">
        <img src="https://img.shields.io/badge/TG-beichuan-blue?style=for-the-badge&logo=telegram&logoColor=%23F3F3F3&labelColor=%231f2328&color=%231f883d" alt="Telegram" />
    </a>
</p>

## 安装
```
npm install befunc
# 或
yarn add befunc
```

## 使用
```
import Tool, { ApiProess, ServerProess } from 'befunc'
```

## 主要文件
- /lib/Tool.class.js
  - 主要封装了一些常用的函数工具
- /lib/ApiProcess.class.js
  - 对 axios 的二次封装，以简化其使用
- /lib/ServerProess.class.js
  - 创建 Websocket 实例，对消息进行处理

## 函数工具方法说明
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
- 将时间输出为指定格式
  - `func.time( time, format = 'Y-M-D h:m:s', timezone = 0 )`
  - time 格式化的时间或者时间戳
  - format 输出格式
  - timezone 结果时间加上指定小时
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
  - num 复制数量（ 可填入数组，如 [ 2, 5 ] 意为随机返回 2-5 个对象 ）

## API 请求工具
- 实例化类
```
const Api = ApiProess({
    logout: function, // 可选，网络请求为 403 时将执行此函数
    toast: function, // 可选，Toast 通知函数
    load: function, // 可选，加载函数
    error: function // 可选，网络请求错误执行函数
});
```
- 发起网络请求示例
```
Api.send({
    link: 'http://example.com', // 必须，API 请求地址
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
- 检查请求结果
```
examine({
    run: [ function ] 请求成功执行函数,
    error: [ function ] 请求出错执行函数
}, result );
```

## Websocket 请求工具
- 实例化类
```
const server = ServerProess({
    link: string, // 必须，Websocket 连接地址
    toast: function // 可选，Toast 通知函数，传入 falsr 时将不会在实例化时连接
    heartbeatTime: number // 可选，心跳间隔时间, 默认为 15 秒
});
// 开放属性说明
this.server // 当前连接实例
this.state // 当前连接状态
this.restart // 断线后是否自动重连
this.message // 最后一次收到的消息
this.functions // 回调方法
```
- 连接到服务器
```
linkServer()
```
- 发送消息
```
send(
    action, // 必须，要求服务器执行的动作
    data = [] // 可选，传给服务器的数据
);
```
- 主动关闭连接
```
close()
```
- 添加回调函数
```
addFunc(
    funcName, // 必须，回调函数名
    func // 必须，回调函数
);
```
- 删除回调函数
```
delFunc(
    funcName // 必须，回调函数名
);
```

## 其它说明
关于传入的 toast 函数需要满足下述格式，其它函数如果在发送请求并且启动检查时自动调用此函数向用户反馈消息。
```
toast(
    text, // string 表示通知内容
    icon, // string 表示 Toast 通知显示的图标
    error // boolean 表示是否为错误类型的消息
);
传入的 load 函数需要满足下述格式，启用加载时将被调用，并在收到返回结果后再次调用以关闭加载
load(
    status, // boolean 表示加载的启用状态
);
另外 API 请求工具在收到 403 结果的请求时调用 logout 函数，可以在此函数中定义执行内容。（ 403 错误将交由 logout 函数处理，工具本身不会对此错误进行处理 ）
```
logout();
``
```