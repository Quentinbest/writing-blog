---
title: "在 LXC 容器中安装 Transmission BT 下载服务器"
date: "2024-12-29"
draft: false
description: "PVE 教程系列"
slug: "在LXC中安装Transmission下载服务器"
series: ["Proxmox VE"]
series_order: 9
seriesOpened: true
tags: ["PVE", "Linux", "LXC", "Transmission"]
---

## 准备LXC模板
下载 Debian12 模板
local→CT templates→Templates→debian-12-standard→download→debian-12-standard_120.1_amd64.tar.zst

![1.create-lxc-bt-download](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/1.create-lxc-bt-download.png)

![2.create-lxc-bt-download](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/2.create-lxc-bt-download.gif)

![3.create-lxc-bt-download](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/3.create-lxc-bt-download.png)

## 创建LXC容器（从模板到容器）
- 容器ID：PVE 系统分配
- 容器名称：自定义
- 密码/确认密码：root登录密码
- 特权容器：取消非特权容器小勾，创建一个特权容器（特权容器可以修改外部资源）
![4.create-lxc-bt-general](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/4.create-lxc-bt-general.png)

- 容器模板选择下载好的 **debian-12-standard_120.1_amd64.tar.zst**

![5.create-lxc-bt-template](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/5.create-lxc-bt-template.png)

- 磁盘容量，根据具体情况而定。这里默认8GB。

![6.create-lxc-bt-disk](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/6.create-lxc-bt-disk.png)

- CPU核心数，根据业务情况而定。

![7.create-lxc-bt-cpu](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/7.create-lxc-bt-cpu.png)

- 内存大小，根据业务情况而定。

![8.create-lxc-bt-memory](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/8.create-lxc-bt-memory.png)

- 网络设定。IPv4选择静态，并设置适当的IP地址和网关地址。IPv6不用填写，选 SLAAC (Stateless Address Auto configuration)

![9.create-lxc-bt-network](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/9.create-lxc-bt-network.png)

- DNS 不用填，默认即可。

![10.create-lxc-bt-dns](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/10.create-lxc-bt-dns.png)

- 确认信息无误点Finish完成 LXC 容器的创建。

![11.create-lxc-bt-confirm](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/11.create-lxc-bt-confirm.png)

## 在LXC容器中安装 transmission
1. 启动 LXC 容器
![13.create-lxc-bt-start](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/13.create-lxc-bt-start.png)

2. 登录LXC Shell
![14.create-lxc-bt-root-login](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/14.create-lxc-bt-root-login.png)

3. 更新系统
```shell
apt update
apt upgrade -y
```
4. 安装 Transmission
```shell
apt install transmission-daemon
```

![15.create-lxc-bt-install-transmission](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/15.create-lxc-bt-install-transmission.png)

## 配置 transmission

1. 停止 Transmission 守护进程
```shell
service transmission-daemon stop
```
修改配置文件 `/etc/transmission-daemon/setting.json`
```shell
vim.tiny /etc/transmission-daemon/settings.json
```
- `download-dir`：本地下载目录，将地址修改为 `/mnt/btdownloads`
- `rpc-password`：Web登录密码，将密码修改为自己的密码
- `rpc-username`：Web登录用户名，将用户名修改为自己的用户名
- `rpc-whitelist`：允许访问的IP白名单地址，添加白名单地址 `127.0.0.1,10.10.1.*`

![16.create-lxc-bt-change-bt-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/16.create-lxc-bt-change-bt-setting.png)

![17.create-lxc-bt-change-bt-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/17.create-lxc-bt-change-bt-setting.png)

2. 启动 Transmission 守护进程
```shell
service transmission-daemon start
```

## 登录 Transmission Web
输入IP+端口：`10.10.1.172:9091` 。
在弹出的窗口中输入刚刚修改的用户名和密码，点击登录。
![18.create-lxc-bt-web-login](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/18.create-lxc-bt-web-login.png)

![19.create-lxc-bt-web-login-successful](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/19.create-lxc-bt-web-login-successful.png)

## 挂载 PVE 主机目录

1. 关闭 LXC 容器
![20.create-lxc-bt-mount-pve](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/20.create-lxc-bt-mount-pve.png)

2. 利用 `pct` 命令。在`PVE.Shell` 中将已经挂载到 PVE 系统中的 SMB 共享文件再挂载到 LXC 中：
```shell
pct set 114 -mp0 /mnt/pve/share_nas2/downloads,mp=/mnt/btdownloads
```
- `vmid` ：114，容器虚拟机ID
- `--mp[]` ：`-mp0`，使用容器挂载点
- `volume` ：`/mnt/pve/share-nas2/downloads`，PVE系统主机中的挂载目录
- `mp` ：`/mnt/btdownloads` ，114号容器的挂载目录。

![21.create-lxc-bt-mount-pve-pct](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/21.create-lxc-bt-mount-pve-pct.png)

3. 查看 LXC 是否挂载成功，容器→Resources→Mount Point

![22.create-lxc-bt-mount-pve-successful](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/22.create-lxc-bt-mount-pve-successful.png)

## 参考资料
- [Debian-Transmission](https://wiki.debian.org/Transmission)
- [How To Install Transmission on Debian 12](https://idroot.us/install-transmission-debian-12/)
- [Torrent Container for Proxmox](https://saelzler.com/tech/torrent-container-for-proxmox/)
