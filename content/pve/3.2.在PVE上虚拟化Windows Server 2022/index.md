---
title: "在 PVE 上虚拟化 Windows Server 2022 客户机"
date: 2024-12-24
draft: false
description: "PVE 教程系列"
slug: "在PVE上虚拟化Windows-Server-2022客户机"
series: ["Proxmox VE"]
series_order: 4
seriesOpened: true
tags: ["PVE", "Linux", "Windows"]
---

## 1.准备镜像文件
安装 Windows Server 所需的镜像文件：
- Windows Server 2022 ISO 镜像
- Windows VirtIO 驱动镜像
### 本地上传
在 PVE WebGUI 管理页面中，展开资源中心的节点树：
1. 点击 **local** 本地存储；
2. 然后在右侧的内容面板中点击选择 **ISO Images**；
3. 再继续点击 **Upload** 上传按钮。
4. 在弹出的窗口中选择本地已经下载好的镜像文件，确认无误后点击 **Upload** 上传。在弹出的窗口中输入镜像文件的下载地址，然后点击 **Query URL**，系统会自动获取文件名称。

![本地上传镜像](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/1.Create-VM-Windows-upload.png)

![本地上传镜像](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/2.Create-VM-Windows-upload.png)
### 在线下载
1. 点击 **local** 本地存储；
2. 然后在右侧的内容面板中点击选择 **ISO Images**；
3. 再继续点击 **Download from URL** 在线下载按钮按钮；
4. 将 **Windows Server 2022** [下载地址](https://software-static.download.prss.microsoft.com/dbazure/988969d5-f34g-4e03-ac9d-1f9786c66756/20348.1787.230607-0640.fe_release_svc_refresh_SERVER_EVAL_x64FRE_zh-cn.iso) 复制到对话框中；
5. 然后，再点击 **Query URL** ，等待系统识别文件名称；
6. 最后点击 **Download** 下载，等待下载完成。

![在线下载镜像](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/3.Create-VM-Windows-download.png)

![在线下载镜像](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/4.Create-VM-Windows-download.gif)

![在线下载VirtIO驱动](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/4.Create-VM-Windows-download-virtio.gif)

### 从命令行在线下载
1. 切换到节点的终端控制台（**Shell**）；
2. 使用 `cd` 命令进入 `/var/lib/vz/template/iso/` 目录；
3. 直接使用 `wget` 命令将镜像文件下载到系统指定的存储路径:

```shell
cd /var/lib/vz/template/iso/
wget https://software-static.download.prss.microsoft.com/dbazure/988969d5-f34g-4e03-ac9d-1f9786c66756/20348.1787.230607-0640.fe_release_svc_refresh_SERVER_EVAL_x64FRE_zh-cn.iso
```

![命令行下载镜像](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/5.Create-VM-Windows-wget-download.png)


## 2.创建虚拟机
点击 PVE WebGUI 右侧的 **Create VM** 按钮开始创建虚拟机。

### 1.常规选项卡- General
- **Node**：运行虚拟机的物理服务器节点。
- **VM ID**：虚拟机 ID。这里的虚拟机 ID 是 **109**。
- **Name**：为虚拟机命名。这里命名为 **WindowServer2022** 。

![常规选项卡](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/6.Create-VM-Windows-general.png)
### 2.操作系统选项卡- OS
- **Do not use any media**: 不使用 CD/DVD 镜像文件。
- **Guset OS**：
	- **Type** 类型选择 **Microsoft Windows**
	- **Version** 版本选择 **11/2022**

![操作系统选项卡](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/7.Create-VM-Windows-os.png)
### 3.系统配置选项卡- System
- **Graphic card** & **Machine**：显卡和芯片组都选默认。如果需要直通 **PCIe** 硬件，可选择 **Q35** 芯片组。
- **BIOS 固件**：默认选 **SeaBIOS**。如果需要直通 **PCIe** 硬件，可选择 **OVMF** 固件。
- **SCSI Controller**：硬盘控制器选择能发挥最佳性能的 **VirtIO SCSI** 控制器 。
- 将 **Qemu Agent** 打钩以启用 **qemu-guest-agent** 功能。

![系统配置选项卡](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/8.Create-VM-Windows-system.png)
### 4.系统安装磁盘选项卡- Disks
- **Bus/Device**：总线设备选择 **SCSI** 硬盘总线，编号为 **0**。
- **Storage**：存储盘根据具体情况选择，这里选择 **local-lvm**。
- **Disk size**：硬盘容量据应用场景调整（这里先设置 **20GB**），后期也可添加多块硬盘。
- **Cache**：缓存选择 **Write back** 以获得最佳性能。
- 勾选 **Discard** 以优化硬盘空间的使用。

![磁盘选项卡](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/9.Create-VM-Windows-disk.png)
### 5.CPU 选项卡
- **Sockets**：**1** 颗 CPU。
- **Cores**：CPU 核心数根据物理机 CPU 核心数及应用场景来设置，这里设置 **2** 个核心。
- **Type**：这里选择 **host** 类型，它可完全匹配物理机 CPU 类型，能让虚拟机发挥 CPU 最佳性能。

![CPU选项卡](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/10.Create-VM-Windows-cpu.png)
### 6.内存选项卡- Memory
- **Memory**：内存大小可根据虚拟机用途来配置，这里内存设置 **4GB** 。

![内存选项卡](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/11.Create-VM-Windows-memory.png)
### 7.网络设备选项卡- Network Device
- **Bridge**：网桥默认即可。
- **Model**：网络模式选择准虚拟网卡 **VirtIO (paravirtualized)** 以发挥最佳性能

![网络设备选项卡](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/12.Create-VM-Windows-network.png)
### 8.确认虚拟机配置- Confirm
最后确认虚拟机配置后点击 **Finish** 完成虚拟机创建。

![确认虚拟机配置](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/13.Create-VM-Windows-confirm.png)

## 3.配置虚拟机
### 1.为虚拟机添加 VirtIO 驱动
1. 选择刚刚创建好的 **109** 号虚拟机，依次选择 **Hardware→Add**。
2. 在弹出的下拉框中选择 **CD/DVD Drive** 添加光驱驱动器设备。
3. 在弹出框 **Add: CD/DVD Drive** 中：
	- **Bus/Device**：总线设备选 **IDE**，编号为 **0**。
	- **ISO image**：镜像文件选择下载好的 **virtio-win-0.1.240.iso** Windows 驱动。

![添加VirtIO驱动](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/setting-vm/1.Setting-VM-Add-VirtIO.png)

![添加VirtIO驱动](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/setting-vm/1.Setting-VM-Add-VirtIO.gif)

![添加VirtIO驱动完成](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/setting-vm/2.Setting-VM-Add-VirtIO.png)

### 2.挂载 Windows Server 2022 ISO
1. 继续在 **109** 号虚拟机中选择 **Hardware→Add**。
2. 然后添加 **CD/DVD Drive** 驱动设备。
3. 在该驱动设备中：
	- **Bus/Device**：总线设备选 **IDE**，编号为 **1**。
	- **ISO image**：选择下载好的 **windows_server_2022.iso** Windows Server 镜像文件。

![挂载Windows Server ISO](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/setting-vm/3.Setting-VM-Add-ISO.png)

完成以上操作后，可在虚拟机的 **Hardware** 中看到已经添加好的设备。
![虚拟机硬件配置完成](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/setting-vm/4.Setting-VM-finish.png)

## 4.为虚拟机安装 Windows Server 2022 操作系统

1. 选择 **109** 号虚拟机→**Console**→**Start Now** （或 **Start**）

![启动虚拟机](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/1.install-VM-Win-start.png)

2. 加载安装程序

![加载安装程序](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/2.install-VM-Win-loading.png)

3. 选择语言-时区-键盘布局

![选择语言时区键盘布局](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/3.install-VM-Win-lag-time-layout.png)

4. **开始安装**→**Datacenter-Desktop**→**许可证**→**自定义安装**

![开始安装](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/4.install-VM-Win-installing.png)

![选择Datacenter Desktop](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/5.install-VM-Win-select-datacenter.png)

![许可证](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/6.install-VM-Win-licen.png)

![自定义安装](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/7.install-VM-Win-onlyinstall.png)

5. 安装 **VirtIO** 驱动
	- 硬盘驱动：**加载驱动程序** → **浏览** → **virtio-win-0.1.240** → **vioscsi** → **2k19** → **amd64** → **Red Hat VirtIO SCSI pass-through controller** → **下一步**
	- 网卡驱动：**加载驱动程序**→**浏览**→**virtio-win-0.1.240**→**NetKVM**→**2k19**→**amd64**→**Redhat VirtIO Ethernet Adapter**→**下一步**
	- 动态内存管理：**加载驱动程序**→**浏览**→**virtio-win-0.1.240**→**Balloon**→**2k19**→**amd64**→**VirtIO Balloon Driver**→**下一步**

![安装VirtIO驱动](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/8.install-VM-Win-virtio.png)

![安装VirtIO驱动](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/9.install-VM-Win-virtio.png)

![安装硬盘驱动](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/10.install-VM-Win-virtio.gif)

![安装网卡驱动](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/11.install-VM-Win-virtio.gif)

![安装动态内存管理驱动](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/12.install-VM-Win-virtio.gif)

6. 分区+格式化

![分区格式化](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/13.install-VM-Win-partion.png)

![分区格式化操作](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/14.install-VM-Win-partion.gif)

![分区格式化完成](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/15.install-VM-Win-partion.png)

7. 安装......

![自动安装中](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/16.install-VM-Win-autoinstall.png)

8. 完成安装并登录系统

![完成安装](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/17.install-VM-Win-login.png)

![登录系统](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-vm-Windows/install-os/18.install-VM-Win-login.png)

## 参考资料
- [Windows 2022 guest best practices](https://pve.proxmox.com/wiki/Windows_2022_guest_best_practices)
- [Windows VirtIO Drivers](https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers)
- [Qemu-guest-agent](https://pve.proxmox.com/wiki/Qemu-guest-agent)
- Windows Server 2022 ISO 镜像下载地址：
	- https://www.microsoft.com/en-us/evalcenter/download-windows-server-2022
- Windows VirtIO 驱动镜像下载地址：
	- https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.240-1/virtio-win-0.1.240.iso
