### 常用函数封装

##### 参数检查
- 判断是否为空（ 如 PHP 中的 empty 函数 ）
  - func.empty( v )
- 判断是否数组或者对象
  - func.isArra( v )
- 判断是否为 JSON 字符串
  - func.isJson( v )
- 判断是否为函数
  - func.isFunction( v )


#### 参数处理
- 将时间输出为指定格式
  - func.time( time, format = 'Y-M-D h:m:s' )
  - time 格式化的时间或者时间戳
  - format 输出格式
- 生成随机字符串
  - func.rand( length, type = 'all' )
  - length 输出字符长度
  - type 输出字符类型 （ all: 大小写字母+数字、num: 数字、letter: 大小写字母 ）


