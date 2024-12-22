---
title: 安装 Proxmox Virtual Environment (VE)
date: 2024-12-22
draft: false
description: this is 安装 Proxmox Virtual Environment (VE) page.
---
## 0.安装前的准备工作
- 一台符合[PVE系统硬件要求](https://www.proxmox.com/en/proxmox-virtual-environment/requirements)电脑（以下为官方推荐配置）：
	- 支持带有 **Intel VT/AMD-V** （即支持虚拟化技术）技术的 64 位 CPU。
	- 官方推荐最少也要 2G 的运行内存，内存当然是越大越好，内存越大，能开的虚拟机就越多。
	- 推荐使用 **SSD** 作为存储并运行操作系统的介质。
	- 虚拟机（VM）的存储，可采用多种存储方式，比如本地存储（ZFS、DIR），共享存储（NFS、CIFS）和分布式存储（CephFS）。
	- 可多配置几个 **NIC**（网卡），系统也支持 **10 Gbit** 网卡。
	- 对于 **PCIe** 设备直通，还需要 CPU 支持 **VT-d/AMD-d** 。
- 一根网线：推荐使用超六类网线。
- 一个安装&启动系统的 U 盘：容量至少在 8G 以上。
- U 盘格式化&启动工具：
	- MacOS & Linux 推荐使用：[balenaEtcher](https://etcher.balena.io)
	- Windows 推荐使用：[Rufus](https://rufus.ie)
## 1.下载 PVE 官方镜像（ISO）文件
1. 从 Proxmox [官方网站](https://www.proxmox.com/en/downloads/proxmox-virtual-environment/iso) 下载 **Proxmox VE ISO** 文件。选择最新 **Proxmox VE** 版本（我这里是8.0-2版本），点击 **Download** 下载。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/1.download-pve.png)
2. 验证镜像正确性，输入如下命令验证 **PVE** 镜像文件（为了安全起见，务必在下载完 **PVE** 镜像以后验证其正确性。）：
   ```shell
	sha256sum proxmox-ve_8.0-2.iso
	# 输出
	e2b27648a8a91c0da1e8e718882a5ff87a8f054c4dd7e0ea1d8af85125d82812  proxmox-ve_8.0-2.iso
	```

如果输出结果与官网的 **SHA256SUM** 一样，则表示文件可靠，可放心使用；如果输出结果不一样，则要谨慎使用，以防被他人篡改。
{{<alert>}}
不只是 PVE 镜像文件，其他的镜像文件，比如 Debian、OpenMediaVault……也都应该去验证其正确性，尤其是从第三方渠道下载的文件。
{{</alert>}}
## 2.制作 U 盘引导盘（这里使用 **balenaEtcher** 制作引导盘）
1. 插入U盘并启动 **balenaEtcher**；![image](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/1.usbgrub.png)
2. 选择已经下载好的 **PVE** 镜像文件 **proxmox-ve_8.0-2.iso** 。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/2.usbgrub.png)
3. 选择要写入 **PVE** 系统的 **U 盘**（这里选择的是一个 32G 的 Kingston U盘）。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/3.usbgrub.png)
4. 完成以上配置，点击 **Flash** 开始制作引导盘。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/4.usbgrub.png)
5. 等待写入中......![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/5.usbgrub.png)
6. 显示如下，表示引导盘已经制作成功，准备下一步**安装系统**。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/6.usbgrub.png)
## 3.开始安装
一个节点（node）的 **Proxmox VE** 系统安装相对比较简单，几乎只需选择默认选项再点击下一步即可完成，但需要注意的是其中的网络信息设置。下面开始正式安装系统：
1. 将 **U 盘**插入电脑，然后开机进入 **BIOS** 设置，设置 U 盘为**第一启动盘**。
2. 进入 PVE 安装界面，选择 **Install Proxmox VE (Graphical)** 开始安装。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/1.install-pve.png)
3. 选择 **I agree** ，进入下一步。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/2.install-pve.png)
4. 选择要安装的目标磁盘。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/3.install-pve.png)此外，如果需要对存储磁盘做进一步的配置，可点击右边的 **Options** ，选择最适合你需求的文件系统。这里我们选择 **ext4** 文件系统。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/4.install-pve.png)其中的一些选项说明：
	- **hdsize**：安装 Proxmox 所使用的总硬盘大小。
	- **swapsize**：定义交换分区的大小。
	- **maxroot**：定义 `/root` 分区所占用的最大硬盘空间。
	- **minfree**：定义 Proxmox 安装完成后所保留的最小可用空间。
	- **maxvz**：定义数据分区所占用的最大硬盘空间。数据分区一般指的是 `/var/lib/vz` 目录。
	如果要选择 **ZFS** 文件格式，可参考：
	- Advanced ZFS Configuration Optionshttps: pve.proxmox.com/pve-docs/pve-admin-guide.html#advanced_zfs_options
	- ZFS on Linux: https://pve.proxmox.com/pve-docs/pve-admin-guide.html#chapter_zfs
	- ZFS: https://en.wikipedia.org/wiki/ZFS
	![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/5.install-pve.png)
5. 配置地区/国家和键盘布局。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/6.install-pve.png)
6. 配置管理员密码和邮箱。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/7.install-pve.png)
7. 网络配置:
	- **网口**：如果有多个网口，IP地址一定要与网口相配合。
	- **主机名**：可根据自己喜好随意取。
	- **IP地址及子网掩码**：这里的IP地址就是 PVE 主机IP地址，也是 PVE Web管理页面访问地址。
	- **默认网关**：一般默认即可，安装程序会自动识别网络中的路由器网关地址。
	- **DNS服务器**：默认即可。
	  ![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/8.install-pve.png)
8. 确认配置，最后点击**安装**。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/9.install-pve.png)
9. 等待安装......![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/10.install-pve.png)
10. 完成安装，点击**重启**。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/11.install-pve.png)
11. 进入 **GRUB** 引导页面，选择第一项 **Proxmox VE GNU/Linux** 进入系统。!![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/12.install-pve.png)
12. 进入系统，如下所示，则表示系统已正常启动。![](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/13.install-pve.png)
## 相关资料
- [文档](https://pve.proxmox.com/pve-docs/)
- [Virtual Machines](https://www.youtube.com/watch?v=_u8qTN3cCnQ&ab_channel=NetworkChuck)
- [B站司波图](https://www.bilibili.com/video/BV1n54y1Q7Q6/?t=308.2&vd_source=155ee28cb37edb0b5d7389e7c064ac32)


