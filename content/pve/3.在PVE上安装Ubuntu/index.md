---
title: 在 PVE 上虚拟化 Ubuntu Server 22.04
date: 2024-12-23
draft: false
description: this is 在 PVE 上虚拟化 Ubuntu Server 22.04 page.
slug: 在 PVE 上虚拟化 Ubuntu Server 22.04
series:
  - Proxmox VE
series_order: 3
seriesOpened: true
tags:
  - Linux
  - PVE
---

## 1.准备镜像（ISO）文件
在创建虚拟机之前，先准备好要安装的操作系统镜像文件。PVE WebGUI 管理页面提供本地上传和在线下载两种方式。
### 上传（Upload）
在 PVE WebGUI 管理页面中，展开资源中心的节点树：
1. 点击 **local** 本地存储；
2. 然后在右侧的内容面板中点击选择 **ISO Images**；
3. 再继续点击 **Upload** 上传按钮。
   ![1.Create-VM-Ubuntu-upload](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/1.Create-VM-Ubuntu-upload.png)
4. 在弹出的窗口中选择本地已经下载好的镜像文件，确认无误后点击 **Upload** 上传。![2.Create-VM-Ubuntu-upload](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/2.Create-VM-Ubuntu-upload.png)
### 下载（Download）
下载的操作与上传类似，只不过在 **local** 的内容面板中需选择 **Download from URL** 在线下载。![3.Create-VM-Ubuntu-download](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/3.Create-VM-Ubuntu-download.png)
在弹出的窗口中输入镜像文件的下载地址，然后点击 **Query URL**，系统会自动获取文件名称。
比如，这里要下载 **Ubuntu Server 22.04** 。首先将[下载地址](https://mirror.csclub.uwaterloo.ca/ubuntu-releases/22.04.3/ubuntu-22.04.3-live-server-amd64.iso) 复制到对话框中，然后再点击 **Query URL** ，等待系统识别文件名称（ 这里的文件名称是 **ubuntu-22.04.3-live-server-amd64.iso**），最后点击 **Download** 下载，等待下载完成。![4.Create-VM-Ubuntu-download](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/4.Create-VM-Ubuntu-download.gif)
> 建议使用 **Download from URL** ——即在线下载模式完成此项任务。因为，如果是上传镜像文件到服务器的话，就要先将镜像文件下载到本地，再将其上传到服务器，这样势必费时，不如让服务器自己在线下载一步到位，省去了不少麻烦。

除此之外，也可切换到节点的终端控制台（**Shell**），直接使用 **wget** 命令将镜像文件下载到系统指定的存储路径。
## 2.创建虚拟机
在 PVE WebGUI 管理页面的页头中，点击右侧的 **Create VM** 按钮开始创建虚拟机。![5.Create-VM-Ubuntu](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/5.Create-VM-Ubuntu.gif)
### 1.常规选项卡- General
- **Node**：运行虚拟机的物理服务器节点。
- **VM ID**：虚拟机 ID。这里的虚拟机 ID 是 **106**。
- **Name**：为虚拟机命名。这里命名为 **UbuntuSrv22** 。
![6.Create-VM-Ubuntu-general](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/6.Create-VM-Ubuntu-general.png)
### 2.操作系统选项卡- OS
- **ISO Image**：选择已经准备好的镜像文件。
- **Guset OS**：客户机系统选择 **Linux**，版本 **6.x-2.6 Kernel** 。
![7.Create-VM-Ubuntu-os](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/7.Create-VM-Ubuntu-os.png)
### 3.系统配置选项卡- System
- **Graphic card**：显卡选择默认。
- **Machine**：默认。如果需要直通 **PCIe** 硬件，可选择 **Q35** 芯片组。
- **BIOS 固件**：默认选 **SeaBIOS**。如果需要直通 **PCIe** 硬件，可选择 **OVMF** 固件。
- **SCSI Controller**：选择 **VirtIO SCSI single** 。
![8.Create-VM-Ubuntu-system](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/8.Create-VM-Ubuntu-system.png)

![9.Create-VM-Ubuntu-system](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/9.Create-VM-Ubuntu-system.gif)
### 4.系统安装磁盘选项卡- Disks
- **Bus/Device**：总线默认选 **SCSI**。
- **Storage**：选择 **local-lvm**。
- **Disk size**：根据情况调整磁盘大小，这里设置 **32GB** 。
- **Cache**：默认无缓存 **No cache** 。
- **IO thread**：打钩。
![10.Create-VM-Ubuntu-disk](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/10.Create-VM-Ubuntu-disk.png)
### 5.CPU 选项卡
- **Sockets**：**1** 颗 CPU。
- **Cores**：CPU 核心数，可根据虚拟机用途来配置，这里设置 **2** 个核心。
- **Type**：CPU 类型默认为 **x86-64-v2-AES** ，选择与宿主机系统 CPU 相匹配的类型，一般默认即可。如果想要完全匹配，可以将 CPU 类型设置为 **host**，这样虚拟机就会拥有与宿主机系统完全相同的 CPU 性能。
>注意，选择 **host** 会影响虚拟机的迁移。
![11.Create-VM-Ubuntu-cpu](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/11.Create-VM-Ubuntu-cpu.gif)
### 6.内存选项卡- Memory
- **Memory**：内存大小可根据虚拟机用途来配置，这里设置内存为 **2GB**。
![12.Create-VM-Ubuntu-memory](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/12.Create-VM-Ubuntu-memory.png)
### 7.网络设备选项卡- Network Device
- **Bridge**：网桥默认即可。
- **Model**：如果要实现最高性能，则应该使用 **VirtIO (paravirtualized)** 准虚拟化网卡。
>若是安装 Window 系统，选择使用 VirtIO 时需要安装额外的驱动。
![13.Create-VM-Ubuntu-network](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/13.Create-VM-Ubuntu-network.png)
### 8.确认虚拟机配置- Confirm
最后确认虚拟机配置后点击 **Finish** 完成虚拟机创建。
![14.Create-VM-Ubuntu-comfirm](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/14.Create-VM-Ubuntu-comfirm.png)

![15.Create-VM-Ubuntu-finish](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/15.Create-VM-Ubuntu-finish.gif)
## 3.为虚拟机安装 Ubuntu 操作系统
虚拟机准备就绪后，就可以开始正式安装客户机操作系统了。
### 1.启动安装程序
点击选择刚创建好的 **106** 号虚拟机，在虚拟机内容面板中点击终端控制台 **Console** ，再点击 **Start Now** 启动虚拟机。![16.install-VM-Ubuntu](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/16.install-VM-Ubuntu.png)
### 2.完成安装
根据 **Ubuntu** 安装程序提示，一步一步完成安装。
![17.install-VM-Ubuntu-](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/17.install-VM-Ubuntu-.png)

![18.install-VM-Ubuntu-](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/18.install-VM-Ubuntu-.png)
成功安装后的登录页面
![19.install-VM-Ubuntu-success](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/19.install-VM-Ubuntu-success.png)
