---
title: "在 Proxmox LXC 容器中安装 Jellyfin 影音媒体服务器"
date: "2024-12-27"
draft: false
description: "PVE 教程系列"
slug: "在LXC中安装Jellyfin影音媒体服务器"
series: ["Proxmox VE"]
series_order: 7
seriesOpened: true
tags: ["PVE", "Linux", "LXC", "Jellyfin"]
---

## 准备 LXC 模板
1. 在存储资料面板中选择 **local** 本地存储，然后选择 **CT templates** ，并在右侧资源面板的上方点击 **Templates** 进入模板选择页面。![准备LXC模板](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/1.create-lxc-bt-download.png)

2. 在弹出的窗口中找到 **debian-12-standard** 模板，单击选中以后，点击下方的 **Download** 开始下载。![下载模板](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/2.create-lxc-bt-download.gif)

3. 下载完成以后，会在模板资源面板中看到 **debian-12-standard_12.0.1_amd64.tar.zst** 模板压缩文件。![模板下载完成](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-transmission/3.create-lxc-bt-download.png)
> **提示**：可直接关闭下载窗口，下载任务会在后台完成，也可点击下方的 **Logs** 日志查看下载进度。

## 创建 LXC 容器（从模板到容器）
1. 常规选项卡- General
	- **Node**：运行虚拟机的物理服务器节点。
	- **CT ID**：容器 ID。这里的容器 ID 是 **112**。
	- **HostName**：为容器命名。这里命名为 **Jellyfin** 。
	- **Password/ConfirmPassword**：设置 **root** 登录密码
	- **Unprivileged container**：取消非特权容器小勾，创建一个特权容器（特权容器可以修改外部资源）
![1.create-lxc-jellyfin-general](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/1.create-lxc-jellyfin-general.png)
2. 模板选项卡- Template
	- **Stroage**：模板文件的存储，选则 **local** 。
	- **Template**： 容器所使用的模板，**debian-12-standard_120.1_amd64.tar.zst** 。![2.create-lxc-jellyfin-template](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/2.create-lxc-jellyfin-template.png)
3. 系统安装磁盘选项卡- Disks
	- **Storage**：容器资源存储位置, 选 **local-lvm** 。
	- **Disk size**：根据情况调整磁盘大小，这里默认 **8GB** 。
![3.create-lxc-jellyfin-disks](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/3.create-lxc-jellyfin-disks.png)
4. CPU 选项卡
	- **Cores**：CPU 核心数，根据业务情况而定，这里设置 **2** 个核心。
![4.create-lxc-jellyfin-cpu](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/4.create-lxc-jellyfin-cpu.png)
5. 内存选项卡- Memory
	- **Memory**：内存大小可根据虚拟机用途来配置，这里设置内存为 **2GB**。
	- **Swap**：交换内存设置为 **2GB** 。
![5.create-lxc-jellyfin-memory](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/5.create-lxc-jellyfin-memory.png)
6. 网络设备选项卡- Network
	- **Bridge**：网桥默认即可。
	- **IPv4**：选择静态，并设置适当的IP地址/子网和网关地址。
	- **IPv6**：不用填写，选 **SLAAC** (Stateless Address Auto configuration)
![6.create-lxc-jellyfin-network](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/6.create-lxc-jellyfin-network.png)
7. DNS 选项卡
	- DNS 不用填，默认即可。
![7.create-lxc-jellyfin-dns](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/7.create-lxc-jellyfin-dns.png)
8. 确认容器配置- Confirm
	- 确认信息无误后，按 **Finish** 完成 LXC 容器的创建。
![8.create-lxc-jellyfin-confirm](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/8.create-lxc-jellyfin-confirm.png)
9. 配置容器
   在资源中心导航栏中选择 **112** 号容器虚拟机，选择 **Options** ，在资源面板中选中最下方的 **Feature** ，然后单击上方的 **Edit** 进入编辑窗。![15.create-lxc-jellyfin-setting-lxc](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/15.create-lxc-jellyfin-setting-lxc.png)
   在编辑窗口中，将 **Nesting** **NFS** **SMB/CIFS** 三项功能打钩，并点击 **OK** 完成。![16.create-lxc-jellyfin-setting-lxc](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/16.create-lxc-jellyfin-setting-lxc.png)

## 在 LXC 中安装 Jellyfin
1. 启动容器
   在资源中心导航栏中选择 **112** 号容器虚拟机，选择 **Console** 进入后台终端控制器，在资源面板中输入账户 **root** 回车并输入密码。

> **提示**：如果资源面板显示黑屏且并无任何信息，则只需按一下键盘的回车键 `enter` 就会显示登录提示。

![9.create-lxc-jellyfin-login](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/9.create-lxc-jellyfin-login.png)

2. 更新 APT 库
```shell
apt update
```

![10.create-lxc-jellyfin-update](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/10.create-lxc-jellyfin-update.png)

3. 升级 APT 库
```shell
apt upgrade -y
```

![11.create-lxc-jellyfin-upgrade](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/11.create-lxc-jellyfin-upgrade.png)

4. 安装 `curl` 和 `gnupg`
```shell
apt install curl gnupg
```
5. 下载 **GPG** 签名秘钥并安装
```shell
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key | gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
```

6. 将以下代码复制到 **Console** 终端控制台并执行，命令执行完毕会在 `/etc/apt/sources.list.d/` 目录生成 `jellyfin.sources` 库配置文件。
```shell
export VERSION_OS="$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )"
export VERSION_CODENAME="$( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )"
export DPKG_ARCHITECTURE="$( dpkg --print-architecture )"
cat <<EOF | tee /etc/apt/sources.list.d/jellyfin.sources
Types: deb
URIs: https://repo.jellyfin.org/${VERSION_OS}
Suites: ${VERSION_CODENAME}
Components: main
Architectures: ${DPKG_ARCHITECTURE}
Signed-By: /etc/apt/keyrings/jellyfin.gpg
EOF
```

![12.create-lxc-jellyfin-Jellyfinsources](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/12.create-lxc-jellyfin-Jellyfinsources.png)

7. 再次更新 APT 库
```shell
apt update
```
8. 安装 Jellyfin
```shell
apt install jellyfin
```

![13.create-lxc-jellyfin-install-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/13.create-lxc-jellyfin-install-jellyfin.png)

9. 使用 systemctl 命令查看 Jellyfin 服务是否正常启动
```shell
systemctl status jellyfin.service
```

![14.create-lxc-jellyfin-manage-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/create-lxc-jellfyin/14.create-lxc-jellyfin-manage-jellyfin.png)

## Jellyfin 配置
1. 登录 **Jellyfin Web** 管理页面。在浏览器中输入安装 Jellyfin 服务的服务器 IP 地址和端口号，比如，这里安装 Jellyfin 的服务器地址是 `http://10.10.1.40:8096` 。
2. 进入 Jellyfin 设置主页，选择你的首选语言。
![1.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/1.setting-jellyfin.png)

3. 输入用户名和密码创建 Jellyfin 管理员账户。
![2.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/2.setting-jellyfin.png)

4. 点击 **Add Media Library** 以添加媒体库。
![3.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/3.setting-jellyfin.png)

5. 在 **Content type** 的下拉菜单中选择内容类型。例如，这里选择的是 **Movies** 。然后在下方的 **Folders** 右侧点击 **+** 按钮。
![4.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/4.setting-jellyfin.png)

6. 在新窗口中选择媒体内容存放的目录，比如，这里选择的目录是 `/media` 。
![5.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/5.setting-jellyfin.png)
![6.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/6.setting-jellyfin.png)

7. 确认以后点击下方的 **ok** 以进行下一步操作。（下面的其他选项配置暂时不用管，默认即可）
![7.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/7.setting-jellyfin.png)

8. 会看到新增了一个名为 **Movies** 的媒体库，点击 **Next** 继续操作。
![8.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/8.setting-jellyfin.png)

9. 设置 **Metadata** 元数据语言，这里选择默认语言 **English** 和国家 **United States** 。
![9.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/9.setting-jellyfin.png)

10. 允许远程访问连接服务器，继续下一步。
![10.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/10.setting-jellyfin.png)

11. 点击 **Finish** 以完成服务器初始化设置。
![11.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/11.setting-jellyfin.png)

12. 跳转到登录页面，输入刚刚创建的账号和密码，点击 **Sign In** 登录。
![12.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/12.setting-jellyfin.png)
![13.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/13.setting-jellyfin.png)

13. 将电影资源传输到 `/media` 目录下；然后在 Jellyfin Web 管理页面中，鼠标移动到 **Movies** 媒体库的右下角，点击三个竖点；在弹出的选项卡中选择最下方的 **Refresh metadata** 刷新元数据。稍等片刻，存储在服务器上的电影资源就会显示在 Jellyfin Web 管理页面。
![14.setting-jellyfin](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/setting-jellyfin/14.setting-jellyfin.gif)

## 挂载 Samba 共享
- 工具：`cifs-utils`
### 临时挂载
1. 在 PVE WebGUI 管理页面的容器导航中选择 **112** 号虚拟机，然后选择 **Console** 进入容器命令行控制台，在命令行中输入如下代码安装 `cifs-utils` 工具包。
```shell
apt install cifs-utils
```
![1.mount-smb-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/mount-smb/1.mount-smb-setting.png)

2. 创建 **Samba** 服务器共享文件的挂载目录。
```shell
mkdir /mnt/FileServer_smb
```
3. 执行如下代码，并替换语句中的 `<username>` 、`//IPAddress/share_name` 和 `/mnt/smb` 这三个参数，便可将 **Samba** 服务器提供的共享目录挂载到本机的目录上。
```shell
mount -t cifs -o username=<username> //IPAddress/share_name /mnt/smb
```
```shell
mount -t cifs -o username=root //10.10.1.50/storage /mnt/FileServer_smb
```
- **username**：登录账户，此处为 **root** 。
- **//IPAddress/share_name**：Samba 服务器共享目录，此处为 **//10.10.1.50/storage** 。
- **/mnt/smb**：本地挂载目录，此处为 **/mnt/FileServe_smb** 。
4. 回车执行命令后，系统会提示输入 **root** 密码，密码认证成功后不会有任何输出。
5. 验证远程挂载是否成功，可以使用 `mount` 或者 `df -h` 命令
```shell
mount
df -h
```

![2.mount-smb-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/mount-smb/2.mount-smb-setting.png)

### 添加凭据文件
为了安全起见，挂载 **Samba** 共享最好使用包含用户名和密码的凭据文件。
1. 在 `/etc/` 目录下新建一个 `fileserver_credentials` 文件，并用 **vim.tiny** 打开，将如下两行代码添加到文件中，其中 `root` 为账户名，`password` 为账户密码。最后输入 `:` 号后输入 `wq` 保持并退出。
```shell
vim.tiny /etc/fileserver_credentials
username=root
password=passowrd
```

![3.mount-smb-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/mount-smb/3.mount-smb-setting.gif)

2. 要使用凭据文件挂载 Samba 共享，执行如下命令：
```shell
mount -t cifs -o credentials=/etc/fileserver_credentials //10.10.1.50/storage /mnt/FileServer_smb
```
### 自动挂载
在以上的临时挂载方案中，如果重新启动系统，挂载就会消失。想要让系统开机后自动挂载目录，需要执行如下步骤：
1. 用 **vim.tiny** 打开 `/etc/fstab` 文件。
```shell
vim.tiny /etc/fstab
```
2. 将如下代码添加到 `fstab` 文件中。
```shell
# <file system>             <dir>          <type> <options>                                                   <dump>  <pass>
//10.10.1.50/storage  /mnt/FileServer_smb  cifs  credentials=/etc/fileserver_credentials 0       0
```

![4.mount-smb-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/mount-smb/4.mount-smb-setting.gif)

3. 运行 `mount -a` 命令让 `fstab` 文件中的挂载配置生效。可重启系统查看挂载是否成功。
```shell
systemctl daemon-reload # 重载系统配置
mount -a # 挂载 fstab 文件中的配置
```
## 挂载 NFS 共享
### 临时挂载
1. 在 **112** 号容器上安装 NFS 客户端工具包 `nfs-common`
```shell
apt install nfs-common
```
2. 使用 `showmount -e nfs_server_ip` 命令查看服务器端所提供的共享服务
```shell
showmount -e 10.10.1.50
```

![1.mount-nfs-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/mount-nfs/1.mount-nfs-setting.png)

3. 创建 NFS 客户端挂载目录
```shell
mkdir -p /mnt/FileServer_nfs
```
3. 使用 `mount` 命令临时挂载 NFS 服务器共享文件
```shell
mount nfs_server_ip:/nfsshare_name  /mnt/nfs
```
```shell
mount 10.10.1.50:/srv /mnt/FileServer_nfs
```
4. 使用 `mount` 或 `df -h` 验证已挂载的文件系统
```shell
mount
df -h
```
![2.mount-nfs-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/mount-nfs/2.mount-nfs-setting.png)

### 自动挂载
为了让客户端系统在开机时能自动挂载共享文件，需要执行如下步骤：
1. 修改 `/etc/fstab` 文件
```shell
vim.tiny /etc/fstab
```
2. 添加以下信息，使用自己的网络共享设置替换 `nfs_server_ip:/nfsshare_name` 、和 `/mnt/nfs` 。
```shell
nfs_server_ip:/nfsshare_name /mnt/nfs nfs4 default,user,exec,_netdev 0 0
```
```shell
10.10.1.50:/srv /mnt/FileServer_nfs nfs default,user,exec,_netdev 0 0
```
- `nfs_server_ip:/nfsshare_name`: NFS 服务器共享目录，这里是 `10.10.1.50:/srv` 。
- `/mnt/nfs`：客户端挂载目录，这里是 `/mnt/FileServer_nfs` 。
- `nfs`：nfs 版本。
- `default,user,exec`：允许任何用户挂载文件系统，也允许他们执行二进制文件。
- `_netdev`：在启用网络之前，它将阻止客户端尝试挂载 nfs 文件系统。
![3.mount-nfs-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/mount-nfs/3.mount-nfs-setting.gif)

3. 运行 `mount -a` 命令让 `fstab` 文件中的挂载配置生效。
```shell
systemctl daemon-reload # 重载配置
mount -a
```

## 挂载 PVE 目录
也可直接从 Proxmox 主机节点中使用 Proxmox Container Toolkit (`pct`) 命令挂载目录到 LXC 容器。
1. 切换到 Proxmox 节点的 **Shell** 终端下；
2. 执行 `pct set` 语句，语法如下：
```shell
pct set <CTID> -mp[0] <PVE_DIR>,mp=<Path>
```
- `CTID`：容器ID。
- `PVE_DIR`：Proxmox 节点某一要共享的目录。
- `Path`：容器挂载目录。
下面语句的意思是：将 Proxmox 节点的 `/mnt/pve/share_nas2/Movies` 目录挂载到 **112** 号 LXC 容器的 `/mnt/movies` 目录。
```shell
pct set 112 -mp0 /mnt/pve/share_nas2/Movies,mp=/mnt/movies
```

![1.mount-pve-dir](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/mount-pvedir/1.mount-pve-dir.png)

3. 完成命令，切换到 **112** 号容器的 **Resources** 资源面板，可以看到新增了一个挂载点。

![2.mount-pve-dir](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/create-lxc-jellyfin/mount-pvedir/2.mount-pve-dir.png)

## 参考资料
- [Jellyfin](https://jellyfin.org/)
- [Jellyfin Media Server Installation](https://wiki.seeedstudio.com/Jellyfin-on-Docker-Ubuntu-X86/)
- [How to install Plex Media Server in a Proxmox Linux Container (LXC)](https://www.geekbitzone.com/posts/2022/proxmox/plex-lxc/install-plex-in-proxmox-lxc/)
- [SAMBA Client Setup](https://wiki.debian.org/Samba/ClientSetup)
- [How to Mount Windows Share on Linux using CIFS](https://linuxize.com/post/how-to-mount-cifs-windows-share-on-linux/)
- [Setting up an NFS Client](https://tldp.org/HOWTO/NFS-HOWTO/client.html#REMOTEMOUNT)
