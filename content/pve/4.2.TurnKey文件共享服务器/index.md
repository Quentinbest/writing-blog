---
title: "使用 LXC TurnKey 模板快速构建网络文件共享服务器"
date: "2024-12-28"
draft: false
description: "PVE 教程系列"
slug: "使用LXC-TurnKey模板构建文件共享服务器"
series: ["Proxmox VE"]
series_order: 8
seriesOpened: true
tags: ["PVE", "Linux", "LXC", "TurnKey"]
---

## 准备 TurnKey 模板文件

## 从 TurnKey 模版创建 LXC 容器

1. 常规选项卡- General
	- **CT ID**：容器 ID 是 **112**。
	- **HostName**：容器名称为 **FileServer** 。
	- **Password/ConfirmPassword**：设置 **root** 登录密码。
	- **Unprivileged container**：创建一个特权容器（取消非特权容器小勾）。
![1.create-lxc-turnkey-fs](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/create-lxc-turnkey-fs/1.create-lxc-turnkey-fs.png)
2. 模版选项卡- Template
	- Template：模板文件选择 **debian-11-turnkey-fileserver_17.1-1.amd64.tar.gz** 。
![2.create-lxc-turnkey-fs](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/create-lxc-turnkey-fs/2.create-lxc-turnkey-fs.png)
3. 容器数据磁盘选项卡- Disks
	- Disk size (GiB)：设置 **200G** 容量。
![3.create-lxc-turnkey-fs](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/create-lxc-turnkey-fs/3.create-lxc-turnkey-fs.png)
4. 内存选项卡- Memory
	- **Memory** ：内存设置 **2GB**。
![4.create-lxc-turnkey-fs](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/create-lxc-turnkey-fs/4.create-lxc-turnkey-fs.png)
5. 网络选项卡- Network
	- **IPv4**：选择静态，并设置IP地址/子网 **10.10.1.50/24** 和网关地址 **10.10.1.1** 。
	- **IPv6**：选 **SLAAC** (Stateless Address Auto configuration)。
![5.create-lxc-turnkey-fs](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/create-lxc-turnkey-fs/5.create-lxc-turnkey-fs.png)
6. 确认容器配置- Confirm
![6.create-lxc-turnkey-fs](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/create-lxc-turnkey-fs/6.create-lxc-turnkey-fs.png)

7. 等待创建容器任务完成
![7.create-lxc-turnkey-fs](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/create-lxc-turnkey-fs/7.create-lxc-turnkey-fs.png)
8. 配置容器。
	1. 在数据中心导航栏选择 **121** 号容器；
	2. 点击选项 **Options**，并在右侧的资源面板中选中最下方的 **Features**；
	3. 然后，在资源面板的上方点击 **Edit** ；
	4. 在弹出的 **Edit: Features** 窗口中分别将 **Nesting** **NFS** **SMB/CIFS** 三个选项后边的框打钩，最后点 **OK** 完成配置。
![8.create-lxc-turnkey-fs](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/create-lxc-turnkey-fs/8.create-lxc-turnkey-fs.png)

![9.create-lxc-turnkey-fs](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/create-lxc-turnkey-fs/9.create-lxc-turnkey-fs.png)

## TurnKey FileServer 初始化设置
在 **Console** 终端后台启动容器，进入 TurnKey FileServer 初始化设置页面。

1. 设置 **Samba root** 账户密码。
![1.turnkey-fs-init](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/1.turnkey-fs-init.png)

2. 初始化 TurnKey 仓库，直接选 **Skip** 跳过
![2.turnkey-fs-init](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/2.turnkey-fs-init.png)

3. 个人邮箱地址，可根据实际需要设置。
![3.turnkey-fs-init](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/3.turnkey-fs-init.png)

4. 安全更新，暂时选 **Skip** 跳过，稍后会手动更新。
![4.turnkey-fs-init](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/4.turnkey-fs-init.png)

5. 完成基础配置，会弹出一个该服务器上的所有应用的访问地址，先点击下方的 **Quit** 退出。
![5.turnkey-fs-init](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/5.turnkey-fs-init.png)

6. 在该容器的 Console 终端中输入 `confconsole` 命令进入高级选项页面。
![6.turnkey-fs-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/6.turnkey-fs-setting.png)

7. 点击下方的 **Advanced Menu** 进入高级选项。
![7.turnkey-fs-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/7.turnkey-fs-setting.png)

8. 用键盘的方向键移动到 **System settings** 选项并按下回车进入该选项。
![8.turnkey-fs-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/8.turnkey-fs-setting.png)

9. 在 System settings 窗口中用键盘方向键选择 Security update 选项并按回车键进行系统安全更新。
![9.turnkey-fs-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/9.turnkey-fs-setting.png)

10. 更新完成后返回上一页，键盘方向键移动到 **Reboot** 重启系统。
![10.turnkey-fs-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/10.turnkey-fs-setting.png)

11. 等待系统重新启动，在浏览器中输入服务器 IP 地址（这里的服务器IP地址是 **10.10.1.50**）进入服务器 WebGUI 管理页面

12. 在 Webmin 登录页面输入 **root** 账户和密码

> **注意**：这里输入的是创建容器时设置的 **root** 密码，而不是在初始化 TurnKey 应用时设置的 **Samba root** 密码。

![11.turnkey-fs-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/11.turnkey-fs-setting.png)

13. 成功登录以后，如下图所示，先点击 **Webmin** 进入管理页面。
![12.turnkey-fs-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/12.turnkey-fs-setting.png)

14. 在 **Webmin** 管理页面中，要重置 **Samba root** 账户的密码，否则无法登录 **WebDAV**。或者新建一个 **Samba** 用户也可以。
	1. 在 **Webmin** 管理页面的侧边栏中选择 **Servers** ，并在下拉菜单中选择 **Samba Windows File Sharing** 选项。
	2. 然后，在右边的资源面板中选择下方的 **Samba Users** 选项。
![13.turnkey-fs-smb](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/13.turnkey-fs-smb.png)
	3. 在 **Samba Users** 页面点击 **root** 用户。
![14.turnkey-fs-smb](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/14.turnkey-fs-smb.png)
	4. 在 **Edit Samba User** 页面中重置 **root** 密码。先选择 **New password** ，再输入新密码，最后点击 **Save** 完成密码重置。
![15.turnkey-fs-smb](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/15.turnkey-fs-smb.png)

15. 再次输入服务器 IP 地址 **10.10.1.50** 进入 TurnKey FileServer 首页，选择 **WebDAV CGI File Manager** 。
![16.turnkey-fs-webdav](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/16.turnkey-fs-webdav.png)

16. 在弹出的登录窗口中输入 **root** 账户和刚刚重置的密码。
![17.turnkey-fs-webdav](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/17.turnkey-fs-webdav.png)

17. 成功登录 WebDAV 文件管理页面。
![18.turnkey-fs-webdav](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-turnkey-fileserver/turnkey-fileserver-setting/18.turnkey-fs-webdav.png)

## 参考资料
- [Confconsole - TurnKey Linux Configuration Console](https://www.turnkeylinux.org/docs/confconsole)
- [File Server - Simple Network Attached Storage](https://www.turnkeylinux.org/fileserver)
- [Webmin](https://webmin.com/docs/)
- [Virtualmin](https://www.virtualmin.com/)
- Webmin 配置文件：`/etc/webmin/miniserv.conf`
