---
title: "Proxmox VE 故障排查"
date: "2024-12-31"
draft: false
description: "PVE 教程系列"
slug: "Proxmox-VE故障排查"
series: ["Proxmox VE"]
series_order: 11
seriesOpened: true
tags: ["PVE", "Linux", "Troubleshooting"]
---

## LXC 容器使用 CIFS 作为 rootdir 存储问题解决

### 问题
正常启动容器出错，显示： `Connection failed (Error 596: Connection timed out)` 错误，并在任务日志中查看有如下错误：

```shell
run_buffer: 322 Script exited with status 255
lxc_init: 844 Failed to run lxc.hook.pre-start for container "121"
__lxc_start: 2027 Failed to initialize container "121"
TASK ERROR: startup for container '121' failed
```

![1.fix-connection-failed-596](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/pve-troubleshooting/1.fix-connection-failed-596.png)

### 解决
以调试模式运行容器，并分析输出日志

`pct start` 命令
```shell
pct start CTID --debug
```

或 `lxc-start` 命令
```shell
lxc-start -n CTID -F -l DEBUG -o /tmp/lxc-CTID.log
```

其中 `CTID` 为容器 ID

从日志中发现错误的原因可能是下面这行：
`mount: /var/lib/lxc/.pve-staged-mounts/rootfs: can't read superblock on /dev/loop0.`

![2.fix-connection-failed-596](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/pve-troubleshooting/2.fix-connection-failed-596.png)

经过搜索，发现已经有类似的问题出现，这个问题产生的主要原因在于容器的 **rootdir** 采用了 **CIFS** 存储介质，进而导致无法读取 **CIFS** 存储上容器的 **Superblock** 。

- [PVE LXC Container won't boot up](https://forum.proxmox.com/threads/pve-lxc-container-wont-boot-up.123267/)
- [Superblock for container on CIFS storage cannot be read after each unmount](https://bugzilla.proxmox.com/show_bug.cgi?id=4499)
- [LXC containers with CIFS Share as Disk Drive Not booting](https://forum.proxmox.com/threads/lxc-containers-with-cifs-share-as-disk-drive-not-booting.115427/)

解决方案也比较简单，只需执行 `pct fsck CTID` 这一条命令即可。

```shell
pct fsck 121
```

![3.fix-connection-failed-596](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/pve-troubleshooting/3.fix-connection-failed-596.png)

如无意外，现在应该能正常启动容器。

- [Obtaining Debugging Logs](https://pve.proxmox.com/wiki/Linux_Container)
- [pct fsck](https://pve.proxmox.com/pve-docs/pct.1.html)

## TurnKey FileServer 修复 Apache2 运行问题

[Apache2: Failed to set up mount namespacing: Permission denied](https://stackoverflow.com/questions/65040703/apache2-failed-to-set-up-mount-namespacing-permission-denied)

```shell
sudo sed -i -e 's,PrivateTmp=true,PrivateTmp=false\nNoNewPrivileges=yes,g' /lib/systemd/system/apache2.service
sudo systemctl daemon-reload
sudo systemctl start apache2.service
sudo systemctl status apache2.service
```
