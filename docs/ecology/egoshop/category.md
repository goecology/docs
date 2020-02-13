# 分类：

## 作为系统中的基本重要属性，满足商城，信息，部门，等其他类型。所有类型都使用此分类。
### 分类属性
~~~
 category
[
id:			    int         #主键
parentid:		int         #父id
idpath:		    varchar     #id路径（1,2,3小写逗号隔开用此展示父级都引用关系）
name:		    varchar     #分类名字
urlname:        varchar     #url前缀 （此前缀可以充当分类id使用）
images:		    varchar     #图片（格式：xxx.jpg,xxxx.jpg 小写逗号隔开）
partid:			id          #组织id（比如：部门id，或者商家）
type:		    int         #类型（1:商品分类，2:部门分类，3:信息分类，4:活动分类，5:券分类，6:会员分类,7:专题分类）
subtype:		int         #子类（预留）
url:			varchar     #跳转用到的url
tags:		    varchar     #标签（格式：a,b,cc,d 小写逗号隔开）
status:		    int         #状态（-1:删除标记，0:等待审核，1:禁用，2:审核过未使用，3:使用）
describe:		varchar     #描述信息
creater:		varchar     #创建人（user）
createtime:	    datetime    #建立时间
updatetime:	    datetime    #更新时间
]
~~~
### code 分类之类型
~~~
const (
    Cate_Type_Goods     = 1
    Cate_Type_Parts     = 2
    Cate_Type_Infor     = 3
    Cate_Type_Promotion = 4
    Cate_Type_Ticket    = 5
    Cate_Type_Member    = 6
    Cate_Type_Special   = 7
)
~~~

### code 分类之状态
~~~
const (
    Cate_Status_Delete    = -1
    Cate_Status_Review    = 0
    Cate_Status_Disable   = 1
    Cate_Status_PassUnUse = 2
    Cate_Status_Use       = 3
)
~~~