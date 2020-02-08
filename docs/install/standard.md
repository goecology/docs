# 项目规范

## 1 概述

为了方便介绍goecology里的安装程序，我们先在这里定义好规范，后文不在赘述

由于挂载目录通常在/home下，所以部署的代码均需要在home下处理，避免系统损坏，数据丢失

## 2 规范

- 安装目录
- 系统应用目录（例如nginx，mysql，redis，supervisor）
- 业务应用目录（自己开发程序）

| 名称           | 目录                 |
| -------------- | -------------------- |
| 下载安装包地址 | /home/opt            |
| 系统程序       | /home/system/deploy  |
| 系统日志       | /home/system/log     |
| 系统配置       | /home/system/config  |
| 系统存储       | /home/system/data    |
| 应用程序       | /home/www/app/deploy |
| 应用日志       | /home/www/app/log    |
|                |                      |

