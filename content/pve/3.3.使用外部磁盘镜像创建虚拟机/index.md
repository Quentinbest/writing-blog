---
title: "使用外部磁盘镜像文件创建虚拟机"
date: "2024-12-25"
draft: false
description: "PVE 教程系列"
slug: "使用外部磁盘镜像文件创建虚拟机"
series: ["Proxmox VE"]
series_order: 5
seriesOpened: true
tags: ["PVE", "Linux"]
---

# 使用外部磁盘镜像文件创建虚拟机（迁移已经创建好的虚拟机）

Question

何时该使用 qcow2 镜像文件创建虚拟机？

how to use qcow2 image in proxmox？（如何在 Proxmox 中使用 qcow2 镜像文件）

- QEMU/KVM 磁盘镜像格式要求
	- qcow2
	- raw
	- vmdk

## 以 Kali Linux 为例，在 PVE 中使用 QCOW2 文件创建虚拟机

### 1.准备 Kali Linux QCOW2 镜像文件

1. 下载 **Kali Linux qcow2** 镜像文件，URL 地址： https://www.kali.org/get-kali/#kali-virtual-machines

![下载 Kali Linux qcow2 镜像](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/1.Create-VM-with-kali-qcow2-download.png)

2. 安装 **7z** 压缩工具包

```shell
sudo apt install p7zip-full
```

![安装 7z](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/2.Create-VM-with-kali-qcow2-7z.png)

3. 用 `7z` 解压镜像文件

```shell
7z x kali-linux-2023.3-qemu-amd64.7z
```

![解压镜像文件](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/3.Create-VM-with-kali-qcow2-7z.png)

### 2.准备虚拟机

重点关注以下几个选项卡，其他默认即可。

- **VM ID**：虚拟机 ID 是 **110**。
- **Name**：为虚拟机命名。这里命名为 **kali-qcow2** 。
- **Do not use any media**: 不使用 CD/DVD 镜像文件。
- **Disks**：删除默认磁盘，暂时不使用磁盘。

> **注意**：创建好后先不要启动虚拟机。

![准备虚拟机](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/4.Create-VM-with-kali-qcow2-prepareVM.png)

### 3.将 kali qcow2 镜像文件导入到虚拟机中

1. 进入节点控制台 **Shell** 。
2. 使用 `qm` 虚拟机管理工具导入 **qcow2** 镜像文件：

```shell
qm disk import 110 /var/lib/vz/images/kali-linux-2023.3-qemu-amd64.qcow2 local-lvm
```

   - **110** ：虚拟机 ID
   - **kali-linux-2023.3-qemu-amd64.qcow2** ：要导入的 **qcow2** 镜像文件
   - **local-lvm** ：存储在本地逻辑卷中

![导入 qcow2 镜像](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/5.Create-VM-with-kali-qcow2-import-qcow2.png)

3. 导入中.....

![导入中](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/6.Create-VM-with-kali-qcow2-import-qcow2.gif)

4. 导入成功

![导入成功](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/7.Create-VM-with-kali-qcow2-import-qcow2.png)

### 4.配置虚拟机

1. 上述命令执行成功以后，切换到 **110** 号虚拟机的 **Hardware** 硬件配置中，会看到新增了一个未使用的磁盘 **Unused Disk 0** 。

![未使用的磁盘](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/8.Create-VM-with-kali-qcow2-unuseddisk.png)

2. 将该硬盘设置为使用。选中磁盘 **Unused Disk 0** → 编辑（edit）→ 添加（add）。

![设置磁盘为使用](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/9.Create-VM-with-kali-qcow2-unuseddisk.gif)

3. 接着，再在 **110** 号虚拟机的 **Options** 选项中，设置 **Boot Order** 开机引导顺序的第一位为该硬盘。

![设置引导顺序](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/10.Create-VM-with-kali-qcow2-order.png)

![设置引导顺序操作](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/11.Create-VM-with-kali-qcow2-order.gif)

### 5.启动虚拟机

一切准备就绪，点击 **Start Now** 启动虚拟机。

![启动虚拟机](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-with-qcow2/12.Create-VM-with-kali-qcow2-Start.gif)

> **提示**：QEMU 格式的 Kali Linux 默认用户名和密码是 `kali`
> - https://www.kali.org/docs/introduction/default-credentials/

## 总结

- 准备 QEMU/KVM 虚拟机磁盘镜像
- 创建虚拟机
	- OS：不使用任何介质
	- 不使用磁盘
	- 创建后不要直接启动虚拟机
- 使用 qm 命令导入外部磁盘镜像文件
	- `qm disk import <vmid> <source> <storage> [OPTIONS]`
		- `<vmid>` ：虚拟机ID（100-999999999）
		- `<source>` ：要导入的磁盘镜像路径
		- `<storage>` ：目标存储ID
		- `[OPTIONS]` ：目标格式
			- `qcow2`
			- `raw`
			- `vmdk`
- 配置虚拟机
	- 将多出的未使用磁盘设置为使用
	- 在选项中将引导顺序的第一位设置为该硬盘
- 启动虚拟机

## 参考资源

- [Importing Virtual Machines](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#qm_cloud_init)
