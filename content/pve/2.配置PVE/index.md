---
title: "配置 & 探索 Proxmox VE WebGUI 管理页面"
date: "2024-12-22"
draft: false
description: "PVE 系列教程"
slug: "配置 & 探索 Proxmox VE WebGUI 管理页面"
series: ["Proxmox VE"]
series_order: 2
seriesOpened: true
tags: ["PVE", "Linux"]
---

## 1. 登录 PVE Web 管理页面
1. 打开浏览器，输入系统提示的登录地址（例如：这里是 **https://10.10.1.201:8006** ）。
2. 出现不安全提示不用怕，点击 **高级**。![14.install-pve](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/14.install-pve.png)
3. 点击 **继续访问 10.10.1.201（不安全）** 。![15.install-pve](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/15.install-pve.png)
4. 输入**管理员名称**和**密码**，点击登录。![16.install-pve](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/16.install-pve.png)
5. 成功登录 PVE 管理页面。![17.install-pve](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/17.install-pve.png)
## 2. PVE 订阅与仓库管理
### PVE 仓库管理
- **Proxmox VE Enterprise repository**- PVE 企业仓库包：`/etc/apt/sources.list.d/pve-enterprise.list`
- **Proxmox VE No-Subscription or Free repository**- PVE 非订阅仓库包：`/etc/apt/sources.list.d/pve-no-subscription.list`
- **Proxmox VE Test repository**- PVE 测试仓库包
由于 **PVE** 基于 **Debian** 系统，所以 **PVE** 也使用 **APT** 作为系统的包管理工具。因为大部分个人使用 **PVE** 系统的目的要么是基于学习、要么是搭建个人服务器，于是在此处，我们会关闭 **Proxmox VE Enterprise repository** 企业库。但为了能获得社区的支持以及版本的更新，在这里会开启 **Proxmox VE No-Subscription repository**。

基于以上要求，可以分别在 **PVE WebGUI** 管理页面或节点（node）的 **Shell** 中进行操作：
#### CLI
1. 在 PVE WebGUI 管理页面中，依次选择**节点** → **Shell**（或通过SSH登录） 进入命令行管理后台。
2. 执行命令 `vim.tiny /etc/apt/sources.list.d/pve-enterprise.list` 打开文件，将光标移动到行头，然后键盘输入 `i` 进入编辑模式，输入 `#` 字符，并点击 `esc` 退出编辑，再连续输入两个大写的 `ZZ` 保存文件并退出。
3. 继续执行 `vim.tiny /etc/apt/sources.list.d/pve-no-subscription.list` 打开 PVE 非订阅文件，将光标移动到行头，键盘输入 `x` 键删除 `#` 字符以启动非订阅仓库，输入两个大写 `ZZ` 保存并退出文件。
#### WebGUI
1. 进入 PVE WebGUI 管理页面，依次选择**节点** → **Repositories**，进入仓库管理页面。
2. 在右侧的资源中心面板中选择 **pve-enterprise** 企业库，然后点击上方的 **Disable** 按钮关闭 PVE 企业库。
3. 继续在该面板中选择 **pve-no-subscription** 非订阅库，然后点击上方的 **Enable** 按键以启动 PVE 非订阅库。![enable-pve-no-subscription](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/enable-pve-no-subscription.gif)
#### 移除登录 PVE WebGUI 管理页面后的订阅通知（PVE 8.02以后版本已失效）
在未获得 PVE 企业订阅授权时，每次登录 PVE Web 管理页面时，总是会弹出一个 **No valid subscription** 窗口提示，可以进行如下操作删除这个弹出框。![1.no-valid-subscription](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/1.no-valid-subscription.png)
1. 切换目录
	```shell
	cd /usr/share/javascript/proxmox-widget-toolkit
	```
2. 备份文件
	```shell
	cp proxmoxlib.js proxmoxlib.js.bak
	```
3. 编辑文件
	```shell
	vim.tiny proxmoxlib.js
	```
4. 定位到如下代码行
	```shell
	Ext.Msg.show({
	  title: gettext('No valid subscription'),
	```
5. 用 `void` 替换 `Ext.Msg.show`
	```shell
	void({ //Ext.Msg.show({
	  title: gettext('No valid subscription'),
	```
	![2.no-valid-subscription](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/2.no-valid-subscription.png)
6. 重新启动 PVE Web 服务器
	```shell
	systemctl restart pveproxy.service
	```
## 3. 探索 PVE WebGUI 管理界面
PVE WebGUI 管理页面布局分为四个部分：
- 页头
- 资源中心
- 内容面板
- 日志面板
### 1. 页头
最上方的页头区域包括：
1. **Documentation**：打开一个本地 PVE 文档。
2. **Create VM**：创建虚拟机。
3. **Create CT**：创建容器。
![1.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/1.PVE-setting.png)
### 2. 资源中心
1. **Datacenter**：包含了所有集群（Cluster）的设置。
2. **Node**：可以在此级别单独管理集群中的节点。
3. **Guest**：创建的虚拟机和容器。可在此级别管理具体的客户虚拟机。
4. **Storage**：数据存储中心。可在此选项中观察进行存储管理。
![2.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/2.PVE-setting.png)
### 3. 内容面板
各个资源中心都有自己专用的内容面板管理页面，具体有如下几个：
#### 数据中心（Datacenter）
数据中心主要进行集群节点的设置，具体有如下配置：
- **Summary**：显示了集群节点的整体运行状态和资源使用情况。
- **Cluster**：集群功能。
- **Options**：集群的默认配置，包括键盘布局、代理、等设置。
- **Storage**：集群存储管理。
- **Permission**：管理用户、组和 API 令牌权限，以及 LDAP、MS-AD 和双因素（Two-Factor）身份验证。
- **HA**：管理 PVE 高可用。
- **ACME**：为服务器节点设置 ACME 证书。
- **Firewall**：防火墙设置。
![3.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/3.PVE-setting.png)
![4.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/4.PVE-setting.png)
![5.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/5.PVE-setting.png)
#### 节点（Node）
单个节点的配置与管理。右上方有几个快捷按钮，分别是**重启节点（Reboot）**、**关机（Shutdown）**、**节点终端（Shell）**、**批量任务（Bulk Actions）**。
重点关注以下选项：
- **Summary**：显示节点的资源使用情况。
- **Shell**：访问节点的终端接口。
- **System**：配置网络、DNS和时间设置，并可查看系统日志。
- **Disks**：查看连接的磁盘状态。
![6.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/6.PVE-setting.png)
![7.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/7.PVE-setting.png)
![8.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/8.PVE-setting.png)
![9.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/9.PVE-setting.png)
#### 客户机（Guests）
客户机分为基于 **KVM （Kernel-based Virtual Machine）** 的虚拟机和基于 **LXC（Linux Container）** 的容器。
页头的右上方包含一些快捷按钮，分别是**启动（Start）**、**关机（Shutdown）**、**终端控制台（Console）**、**克隆（Clone）**、迁移等。
![10.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/10.PVE-setting.png)
客户机重点关注以下选项：
- **Summary**：虚拟机的基本信息。
- **Console**：虚拟机控制台入口。
- **(KVM)Hardware**：定义虚拟机可用的硬件。
- **(LXC)Resources**：定义容器可用的系统资源。
- **Options**：客户机配置信息。
- **Backup**：创建和恢复系统备份。
- **Snapshots**：创建和恢复虚拟机快照。
![11.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/11.PVE-setting.png)
![12.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/12.PVE-setting.png)
![13.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/13.PVE-setting.png)
![14.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/14.PVE-setting.png)
#### 存储（Storage）
这里显示了集群数据中心挂载的所有存储设备。
- **Summary**：显示有关存储的重要信息，如存储的类型、用途和内容。
- **Content**：存储的每种内容类型的菜单项，包括：
	- **ISO Images**：上传或下载的虚拟机镜像。
	- **CT Templates**：上传或下载的 LXC 容器模板。
	- **Backups**：虚拟机备份。
	- **VM Disks**：QEMU/KVM 客户虚拟机镜像（VM images）。
	- **CT Volumes**：容器数据卷。
- **Permissions:** 管理存储权限。
![15.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/15.PVE-setting.png)
![16.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/16.PVE-setting.png)
### 4. 日志面板
日志面板的具体用处有如下几点：
- 向用户显示集群节点当前正在发生的事情；
- 在后台执行创建虚拟机这类操作，并将这种操作称为任务（**task**）；
- 将任务的所有输出保存在一个单独的日志文件中，只需双击任务日志即可查看；
- 终止正在运行的任务。
## 4. 修改 PVE IP 地址
如果因为某些原因需要修改 PVE IP 地址，则需要对如下三处进行修改。
1.  `/etc/network/interfaces`
2.  `/etc/hosts`
3.  `/etc/issue`
4. 重启系统
## 参考资料：
- [PVE GUI 文档](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#_gui_overview)
- [PVE 仓库包文档](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#sysadmin_package_repositories)
- [移除 PVE 订阅通知](https://johnscs.com/remove-proxmox51-subscription-notice/)
- [PVE 内容面板文档](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#_content_panels)