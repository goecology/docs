# 安装mysql

## 1 下载mysql地址

<https://dev.mysql.com/downloads/mysql/5.7.html#downloads>

## 2 创建用户组和用户

创建用户组：`groupadd mysql`

创建用户：`useradd -r -g mysql mysql`

为了安全性，给mysql数据库创建专有用户，该用户只能访问mysql目录，不能访问系统其它目录

另外不建议直接用root初始化mysql，否则连接mysql时会报错：[ERROR] Fatal error: Please read "Security" section of the manual to find out how to run mysqld as root!

## 3 创建mysql的存储路径

```
sudo mkdir -p /home/system/data/mysql
sudo chown mysql:mysql -R /home/system/data/mysql
```

## 4 将mysql的运行程序拷贝到指定目录

```
/home/system/deploy/mysql
```

## 5 初始化mysql

```
/home/system/deploy/mysql/bin/mysqld --initialize --user=mysql --basedir=/home/system/deploy/mysql --datadir=/home/system/data/mysql-13306
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/497518/1580694553594-f26b1525-81f8-4483-9308-e76e0aaf212b.png?x-oss-process=image/resize,w_1500)

创建binlog目录

mkdir /home/system/data/mysql-13306/binlog

chown mysql:mysql -R /home/system/data/mysql-13306/binlog

## 6 初始化mysql配置

### 6.1 服务端配置

vim  /home/system/config/mysql/mysql-13306.cnf

```
[mysqld]
datadir=/home/system/data/mysql-13306
socket=/home/system/run/mysql/mysql-13306.sock
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# Settings user and group are ignored when systemd is used.
# If you need to run mysqld under a different user or group,
# customize your systemd unit file for mariadb according to the
# instructions in http://fedoraproject.org/wiki/Systemd
bind-address=127.0.0.1  #全部地址或者指定的ip地址
# skip-grant-tables
port=13306
server-id               = 1 
log_bin                 = /home/system/data/mysql-13306/binlog/mysql-bin.log 
expire_logs_days        = 10 
max_binlog_size   = 512M


[mysql]
socket==/home/system/run/mysql/mysql-13306.sock

[mysqld_safe]
log-error=/home/system/log/mysqllog/mysql-13306.log
pid-file=/home/system/run/mysql/mysql-13306.pid

[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4
```

### 6.2 客户端配置

```
[root@iZm5eifm7bpd5tx7ne7pp0Z ~]# vim /etc/my.cnf

[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# Settings user and group are ignored when systemd is used.
# If you need to run mysqld under a different user or group,
# customize your systemd unit file for mariadb according to the
# instructions in http://fedoraproject.org/wiki/Systemd
init-connect='SET NAMES utf8mb4'
collation_server=utf8mb4_unicode_ci
character_set_server=utf8mb4
skip-character-set-client-handshake

[mysqld_safe]
log-error=/var/log/mariadb/mariadb.log
pid-file=/var/run/mariadb/mariadb.pid

[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

#
# include all files from the config directory
#
!includedir /etc/my.cnf.d
```

## 7 supervisor

vim  /etc/supervisor/conf.d/mysql-13306.conf

```
; 生产环境mysql实例
[program:mysql-13306]
directory=/home/system/deploy/mysql/
command=/home/system/deploy/mysql/bin/mysqld --defaults-file=/home/system/config/%(program_name)s/mysql.cnf --basedir=/home/system/deploy/mysql --datadir=/home/system/data/%(program_name)s --plugin-dir=/home/system/deploy/mysql/lib/plugin --user=mysql  --log-error=/home/system/log/mysqllog/%(program_name)s.log --pid-file=/home/system/run/mysql/%(program_name)s.pid --socket=/home/system/run/mysql/%(program_name)s.sock --open-files-limit=60000
process_name=%(program_name)s
user=mysql
numprocs=1
#numprocs_start=not support
autostart=true
startsecs=3
startretries=3
autorestart=true
exitcodes=0,2
stopsignal=TERM
stopwaitsecs=10
serverurl=AUTO
stdout_logfile=/home/system/log/supervisorlog/%(program_name)s_stdout.log
stdout_logfile_maxbytes=50MB
stdout_logfile_backups=10
stdout_capture_maxbytes=0
stdout_events_enabled=true
stderr_logfile=/home/system/log/supervisorlog/%(program_name)s_stderr.log
stderr_logfile_maxbytes=50MB
stderr_logfile_backups=10
stderr_capture_maxbytes=0
stderr_events_enabled=false
```

supervisorctl update

supervisorctl status mysql-13306

tail -f  /home/system/log/supervisorlog/mysql-13306_stderr.log

tail -f /home/system/log/mysqllog/mysql-13306.log

## 8 授权登录

不允许远程登录。

```
cd /home/system/deploy/mysql/bin

登录：/home/system/deploy/mysql/bin/mysql -P13306 -h127.0.0.1 -uroot -p    输入临时密码

修改密码：set password=password("root");

登录授权：grant all privileges on *.* to'root' @'%' identified by 'root';

授权生效：flush privileges;

可使用navicat或sqlyog等工具进行登录，注意关闭防火墙或开放3306端口
```

## 9 可能存在问题

![image.png](https://cdn.nlark.com/yuque/0/2020/png/497518/1580694465889-01389bfa-1c01-40dc-966c-9b5f1820fed2.png?x-oss-process=image/resize,w_1500)

/usr/local/mysql/bin/mysqld: error while loading shared libraries: libaio.so.1: cannot open shared object file: No such file or directory

<https://help.directadmin.com/item.php?id=368>

```
/usr/local/mysql/bin/mysqld: error while loading shared libraries: libaio.so.1: cannot open shared object file: No such file or directory

type the following
apt-get install libaio1 libaio-dev

On Redhat/Fedora/CentOS:
yum install libaio
```

