---
title: "PVE 存储详解"
date: "2024-12-30"
draft: false
description: "PVE 教程系列"
slug: "PVE存储详解"
series: ["Proxmox VE"]
series_order: 10
seriesOpened: true
tags: ["PVE", "Linux", "Storage"]
---

## 两种存储类型
- 文件级存储（file）
- 块级存储（block）

精简资源配置（Thin Provisioning）

## 节点存储池配置
- 配置文件 `/etc/pve/storage.cfg`
```shell
<type>: <STORAGE_ID>
        <property> <value>
        <property> <value>
        <property>
        ...
```

## 数据卷
当从存储池分配数据时，它会返回一个数据卷标识符，数据卷由 `<storage_id>` 标识，后跟与存储类型相关的卷名称，中间用冒号分割。

有效的 `<volume_id>`
```shell
local:230/example-image.raw
local:iso/debian-501-amd64-netinst.iso
```

使用数据卷id `<volume_id>` 获得文件系统路径
```shell
pvesm path <volume_id>
```

数据卷ID可以以下路径查看
- QEMU/KVM VM →Hardware→Hard Disk
- LXC Container →Resources→Root Disk

## 命令行操作
### 存储池
添加存储池
```shell
pvesm add <TYPE> <STORAGE_ID> <OPTIONS>
pvesm add dir <STORAGE_ID> --path <PATH>
pvesm add nfs <STORAGE_ID> --path <PATH> --server <SERVER> --export <EXPORT>
pvesm add lvm <STORAGE_ID> --vgname <VGNAME>
```

禁用存储池
```shell
pvesm set <STORAGE_ID> --disable 1
```

启用存储池
```shell
pvesm set <STORAGE_ID> --disable 0
```

更改、设置存储池选项
```shell
pvesm set <STORAGE_ID> <OPTIONS>
pvesm set <STORAGE_ID> --shared 1
pvesm set local --format qcow2
pvesm set <STORAGE_ID> --content iso
```

删除存储池，但不会删除数据，也不会卸载任何设备，只是删除存储配置文件
```shell
pvesm remove <STORAGE_ID>
```

### 数据卷
分配数据卷
```shell
pvesm alloc <STORAGE_ID> <VMID> <name> <size> [--format <raw|qcow2>]
```
```shell
pvesm alloc local <VMID> '' 4G
```

释放数据卷
```shell
pvesm free <VOLUME_ID>
```

### 存储池详细内容
列出存储池状态
```shell
pvesm status
```
![pvesm-status](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/pve-storage/pvesm-status.png)

列出存储池内容
```shell
pvesm list <STORAGE_ID>
```
![pvesm-list-volumes](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/pve-storage/pvesm-list-volumes.png)

其中 `Volid` 列就是 `<VOLUME_ID>`

根据 `VMID` 列出存储池内容：
```shell
pvesm list <STORAGE_ID> --vmid <VMID>
```

根据内容类型只列出存储池内容：
- `images`: QEMU/KVM VM images.
- `rootdir`: Allow to store container data
- `vztmpl`: Container templates.
- `backup`: Backup files
- `iso`: ISO images
- `snippets`: Snippet files, for example guest hook scripts
```shell
pvesm list <STORAGE_ID> --content <type>
```

只列出容器模板
```shell
pvesm list <STORAGE_ID> --content vztmpl
```

![pvesm-list-volumes-content](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/pve-storage/pvesm-list-volumes-content.png)

显示数据卷文件系统路径
```shell
pvesm path <VOLUME_ID>
```

![pvesm-path-vmid](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/pve-storage/pvesm-path-vmid.png)

## 什么是虚拟磁盘镜像（Virtual Disk Image）
虚拟磁盘镜像是虚拟机在其中存储虚拟机数据的一个或一组文件。

支持格式：
- raw
- qcow2
- vmdk

## 为 Proxmox VE 添加外部存储
### 挂载 CIFS 存储池
1. Datacenter->Storage->Add->SMB/CIFS 如果遇到 500 错误，则可切换到 `PVE.Shell` 中使用 Proxmox VE Storage Manager (pvesm) 命令行添加：
```shell
pvesm add cifs smb --server <server_ip> --share <share_name> --username <username> --password <password>
```
- `storagename` ：相当于在PVE节点服务器中的`/mnt/pve/` 目录下新建了一个目录。
- `--server` ：要挂载smb共享的服务器地址
- `--share` ：smb服务器配置中设置的共享目录名称（不是创建的共享目录路径）
- `--username` ：访问smb服务需要的用户名
- `--password` ：访问smb服务需要的密码

### 如何正确删除 CIFS 存储
1. 列出所有存储池状态
```shell
pvesm status
```
2. 首先删除存储池配置文件，执行 remove 命令
```shell
pvesm remove <storage_id>
```
3. 其次，卸载目录（确认存储池是否处于挂载状态）
```shell
mount
umount /mnt/pve/[storage_name]
# 如遇无法卸载，可强制执行
umount -f -l /mnt/pve/[storage_name]
```
4. 删除数据
```shell
rmdir /mnt/pve/[storage_name]
```

### 挂载 NFS 存储池
在 PVE 上挂载 NFS 存储需要在 NFS 服务器上添加以下配置，否则，会因权限问题无法挂载。
```shell
subtree_check,insecure,no_root_squash,anonuid=100,anongid=100
```
并确保共享文件归 `user (gid 100)` 组所有。

CLI 挂载：
```shell
pvesm add nfs nfs_share --server 10.10.1.20 --path /mnt/pve/nfs_share --export /export/nfsshare --content images,rootdir,vztmpl,iso,backup
```

GUI 挂载：
Datacenter→Storage→Add→NFS
- ID：NFS 存储池名称
- Server：NFS 服务器IP地址
- Export：NFS export 路径（通过 `pvesm scan nfs ServerIP` 列出）
- Content：可存储文件类型
- path：本地挂载点（默认为`/mnt/pve/<storage_id>`）

## 参考资料
- [PVE Storage Manager CLI](https://pve.proxmox.com/pve-docs/pvesm.1.html)
- [PVE Storage Documentation](https://pve.proxmox.com/pve-docs/chapter-pvesm.html)
- [Can't Use NFS Share](https://forum.proxmox.com/threads/cant-use-nfs-share.53463/)
- [How To Mount and Use NFS ISO Share on Proxmox VE](https://techviewleo.com/mount-and-use-nfs-iso-share-on-proxmox/)
