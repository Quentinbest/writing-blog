---
title: "批量创建云镜像虚拟机（Debian12）"
date: "2024-12-26"
draft: false
description: "PVE 教程系列"
slug: "批量创建云镜像虚拟机"
series: ["Proxmox VE"]
series_order: 6
seriesOpened: true
tags: ["PVE", "Linux", "Cloud-Init"]
---

## 1.下载 **qcow2** 格式的 Debian12 云镜像（Cloud Images）
1. 切换到节点的终端控制台（**Shell**）；
2. 直接使用 `wget` 命令将镜像文件下载到当前目录:
```shell
wget https://cloud.debian.org/images/cloud/bookworm/latest/debian-12-generic-amd64.qcow2
```

> **提示**：下载地址： https://cloud.debian.org/images/cloud/bookworm/latest/debian-12-generic-amd64.qcow2

## 2.准备虚拟机
重点关注以下几个选项卡，其他默认即可。
- **VM ID**：虚拟机 ID 是 **120**。
- **Name**：虚拟机名称。这里命名为 **DebianCloud** 。
- **Do not use any media**: 不使用 CD/DVD 镜像文件。
- **Disks**：删除默认磁盘，暂时不使用磁盘。
- **SCSI Controller**：选择准虚拟化 **VirtIO SCSI** 控制器。

![创建虚拟机](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/1.cloudinit-create-vm.png)

确认虚拟机最终配置：

![确认虚拟机配置](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/2.cloudinit-create-vm.png)
## 3.为虚拟机添加 CloudInit 设备
步骤：节点→ **120** 号虚拟机 → **Hardware** → **Add** → **CloudInit Derive**

![添加 CloudInit 设备](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/3.cloudinit-add-cloudinit-device.png)

![添加 CloudInit 设备操作](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/4.cloudinit-add-cloudinit-device.gif)
## 4.为虚拟机导入 Debian12 云镜像
1. 进入节点控制台 **Shell** 。
2. 使用 `qm` 执行导入 **qcow2** 镜像：
```shell
qm disk import 120 /mnt/pve/share_nas1/template/iso/debian-12-generic-amd64.qcow2 local-lvm
```
- **120** ：虚拟机 ID
- **debian-12-generic-amd64.qcow2** ：要导入的 **qcow2** 镜像文件
- **local-lvm** ：存储在本地逻辑卷中

![导入 qcow2 镜像](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/5.cloudinit-import-qcow2.png)


## 5.配置新增未使用磁盘
1. 导入完成后，会在虚拟机硬件中新增一个未使用的磁盘 **Unused Disk 0**。
2. 设置使用该磁盘：**Unused Disk 0** → **Edit** → **Add** 。

![添加未使用磁盘](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/6.cloudinit-add-unused-disk.png)

![添加未使用磁盘操作](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/7.cloudinit-add-unused-disk.gif)

3. 为该磁盘扩容：**Hard Disk (scsi0)** → **Disk Action** → **Resize** → **10** → **Resize Disk**

![磁盘扩容操作](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/8.cloudinit-setting-unused-disk.gif)

## 6.配置 Cloud-Init
1. 选择 **120** 号虚拟机 → **Cloud-Init**
2. 选项说明：
	- **User**：初始化登录账户，这里设置为 **root**
	- **Password**：账户登录密码
	- **DNS domain**：**DNS** 配置，如果有 **DHCP** 服务，可不用设置
	- **DNS servers**：同上
	- **SSH public key**：**SSH** 公钥配置
	- **Upgrade packages**：更新软件包
	- **IP Config (net0)**：IP 设置，可手动设置静态 **IPv4**、**IPv6** 地址，或通过 **DHCP** 服务动态获得。

![配置 Cloud-Init](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/9.cloudinit-setting-Cloud-Init.png)

## 7.配置开机 Boot 引导顺序
1. 选择 **120** 号虚拟机→**Options**→**Boot Order** ；
2. 启动 **scsi0** 设备，并将其移动到第 **1** 位。

![配置 Boot 引导顺序](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/10.cloudinit-setting-Boot-Order.png)

![配置 Boot 引导顺序操作](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/11.cloudinit-setting-Boot-Order.gif)
## 8.定制虚拟机模板初始配置
可根据实际应用场景配置一些虚拟机的初始化设置
- SSH
- git
- pip
- glance
## 9.将虚拟机转化成虚拟机模板
选择 120 号虚拟机→ 右键 → Convert to template

![转化为模板](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/cloud-init/12.cloudinit-convert-template.png)

### 克隆虚拟机（复制虚拟机）
克隆前先删除原虚拟机中的使用介质
将虚拟机复制到本地节点
部署多个同类虚拟机的简单方法是复制现有虚拟机，在 PVE 系统里称为克隆clone
1. 在虚拟机资源页面，点击页头右边的 `More` ，并在下拉菜单中选择 `Clone`
2. 给克隆的虚拟机取好名称点击克隆即可
3. 克隆虚拟机的时间稍长一些，可以再下方日志面板中查看虚拟机克隆进度。
### 完整克隆（Full Clone）
复制一个与原虚拟机完全一样的虚拟机副本
### 链接克隆（Linked Clone）
## 流程总结
- 下载 QCOW2 格式的云镜像（Cloud Images）
- 准备虚拟机
	- `OS` → `Do not use any media`
	- `System` → `SCSI Controller` → `VirtIO SCSI`
	- `Disks` → `No Disks`
- 为虚拟机添加 CloudInit 设备
- 为虚拟机导入云镜像
	- `qm disk import <vmid> <source> <storage> [OPTIONS]`
- 配置虚拟机
	- 配置新增的未使用磁盘
	- 配置 Cloud-Init
	- 设置开机 Boot 引导顺序
- 定制虚拟机模板初始配置
- 将虚拟机转化成模板

## 参考资源
- [Cloud-init](https://cloudinit.readthedocs.io/en/latest/)
- [qm](https://pve.proxmox.com/pve-docs/qm.1.html)
- [PVE Cloud-init Support](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#qm_cloud_init)
- [PVE Cloud-Init FAQ](https://pve.proxmox.com/wiki/Cloud-Init_FAQ)
