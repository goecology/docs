# 安装nginx

## 1 安装依赖库

Debian 和 Ubuntu 用户

推荐您使用 apt-get安装以下的开发库:

```
apt-get install libreadline-dev libncurses5-dev libpcre3-dev libssl-dev perl make build-essential
```

Fedora 和 RedHat 用户

推荐您使用yum安装以下的开发库:

```
yum install readline-devel pcre-devel openssl-devel gcc
```

## 2 下载openresty

## 3 编译openresty

./configure

下载预编译包，然后在进入 openresty-VERSION/ 目录, 然后输入以下命令配置:

./configure

默认, --prefix=/home/system/deploy/openresty  程序会被安装到/home/system/deploy/openresty目录。

您可以指定各种选项，比如

```
./configure --prefix=/home/system/deploy/openresty \
            --with-luajit \
            --without-http_redis2_module \
            --with-http_iconv_module \
```

试着使用 ./configure --help 查看更多的选项。

配置文件（./configure script）运行出错可以到 build/nginx-VERSION/objs/autoconf.err 找到。 VERSION 的地方必须与OpenResty版本号相对应, 比如 1.11.2.1。

接着：

make

make install

the HTTP rewrite module requires the PCRE library

## 4 配置文件

mkdir /home/system/deploy/openresty/nginx/conf/cert

mkdir /home/system/deploy/openresty/nginx/conf/vhost

```
user  www;
worker_processes  auto;

error_log  /home/system/log/ngxlog/error.log;
error_log  /home/system/log/ngxlog/error.log  notice;
error_log  /home/system/log/ngxlog/error.log  info;

pid       /home/system/run/nginx/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
      client_max_body_size 100m;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /home/system/log/ngxlog/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

# 开启gzip压缩服务
gzip on;

# gzip压缩是要申请临时内存空间的，假设前提是压缩后大小是小于等于压缩前的。
# 例如，如果原始文件大小为10K，那么它超过了8K，所以分配的内存是8 * 2 = 16K;再例如，
# 原始文件大小为18K，很明显16K也是不够的，那么按照 8 * 2 * 2 = 32K的大小申请内存。
# 如果没有设置，默认值是申请跟原始数据相同大小的内存空间去存储gzip压缩结果。 

# 设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。 
# 例如 4 4k 代表以4k为单位，按照原始数据大小以4k为单位的4倍申请内存。 
# 4 8k 代表以8k为单位，按照原始数据大小以8k为单位的4倍申请内存。
# 如果没有设置，默认值是申请跟原始数据相同大小的内存空间去存储gzip压缩结果。
gzip_buffers 2 8k;


# 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
gzip_min_length 1k;

# gzip压缩基于的http协议版本，默认就是HTTP 1.1 
gzip_http_version 1.1;

# gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
gzip_comp_level 2;

# 需要进行gzip压缩的Content-Type的Header的类型。建议js、text、css、xml、json都要进行压缩；
# 图片就没必要了，gif、jpge文件已经压缩得很好了，就算再压，效果也不好，而且还耗费cpu。
# javascript有多种形式。其中的值可以在 mime.types 文件中找到。
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;


# 是否在http header中添加Vary: Accept-Encoding，建议开启
# 和http头有关系，加个vary头，给代理服务器用的，有的浏览器支持压缩，
# 有的不支持，所以避免浪费不支持的也压缩，所以根据客户端的HTTP头来判断，是否需要压缩
gzip_vary on;

# 禁用IE 6 gzip
gzip_disable "MSIE [1-6]\.";



    include vhost/*.conf;
}
```