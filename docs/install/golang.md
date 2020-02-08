# Golang

## 1 概述

GoEcology后端项目均采用Golang开发。

## 2 安装

### 2.1 下载包

下载你需要的go包 https://golang.google.cn/dl/

```
wget https://dl.google.com/go/go1.13.7.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.13.7.linux-amd64.tar.gz
```

### 2.2 工作目录

```
mkdir -p ~/mycode/go
```

### 2.3 设置环境变量 

```
vim ~/.bashrc

export GOROOT=/usr/local/go
export GO111MODULE=on
export GOPATH=~/mycode/go
export GOBIN=$GOPATH/bin
export PATH=$PATH:$GOROOT/bin
export PATH=$PATH:$GOPATH/bin
export GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
#export GOPROXY=https://goproxy.cn/,direct
# 以下为私有仓库
export GONOPROXY=xxx.xxx.com
export GOPRIVATE=xxx.xxx.xom
#export GOSUMDB=off

source ~/.bashrc
```

### 2.4 测试

```
go env
go version
```



