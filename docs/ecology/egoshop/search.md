# 搜索功能

搜索按照系统规模分步骤制作

## 第一步 实现简单搜索
~~~
type Search interface {
     Search(args ...interface{}) interface{}
}
~~~

## 第二步 按照业务/访问量，分离搜索功能（未完）