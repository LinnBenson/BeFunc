# 常用函数封装

## 安装
```
npm install befunc
# 或
yarn add befunc
```

## 使用
```
import func from 'befunc';
```

### Func 方法

##### 参数检查
- 判断是否为空（ 如 PHP 中的 empty 函数 ）
  - func.empty( v )
  - v 变量
- 判断是否数组或者对象
  - func.isArray( v )
  - v 变量
- 判断是否为 JSON 字符串
  - func.isJson( v )
  - v 变量
- 判断是否为函数
  - func.isFunction( v )
  - v 变量
##### 参数处理
- 将时间输出为指定格式
  - func.time( time, format = 'Y-M-D h:m:s', timezone = 0 )
  - time 格式化的时间或者时间戳
  - format 输出格式
  - timezone 结果时间加上指定小时
##### 参数生成
- 生成当前时间
  - getTime( format = 'Y-M-D h:m:s' )
  - format 可指定输出格式，为 false 则输出 10 位时间戳
- 生成随机字符串
  - func.rand( length, type = 'all' )
  - length 输出字符长度
  - type 输出字符类型 （ all: 大小写字母+数字、num: 数字、letter: 大小写字母 ）


