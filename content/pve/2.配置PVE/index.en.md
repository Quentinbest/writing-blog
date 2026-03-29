---
title: "Configuring & Exploring the Proxmox VE WebGUI"
date: "2024-12-22"
draft: false
description: "PVE Tutorial Series"
slug: "Configuring & Exploring the Proxmox VE WebGUI"
series: ["Proxmox VE"]
series_order: 2
seriesOpened: true
tags: ["PVE", "Linux"]
---

## 1. Logging into the PVE Web Management Interface
1. Open a browser and enter the login address shown during installation (e.g., **https://10.10.1.201:8006**).
2. A security warning will appear — don't worry, click **Advanced**.![14.install-pve](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/14.install-pve.png)
3. Click **Proceed to 10.10.1.201 (unsafe)**.![15.install-pve](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/15.install-pve.png)
4. Enter the **administrator username** and **password**, then click Login.![16.install-pve](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/16.install-pve.png)
5. You have successfully logged into the PVE management interface.![17.install-pve](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/17.install-pve.png)
## 2. PVE Subscription & Repository Management
### PVE Repository Management
- **Proxmox VE Enterprise repository** — Enterprise repository: `/etc/apt/sources.list.d/pve-enterprise.list`
- **Proxmox VE No-Subscription or Free repository** — No-Subscription repository: `/etc/apt/sources.list.d/pve-no-subscription.list`
- **Proxmox VE Test repository** — Test repository

Since **PVE** is based on **Debian**, it uses **APT** as its package manager. Most individuals use **PVE** either for learning purposes or to set up a personal server, so we will disable the **Proxmox VE Enterprise repository**. However, to receive community support and version updates, we will enable the **Proxmox VE No-Subscription repository**.

You can make these changes either through the **PVE WebGUI** management interface or via the node's **Shell**:
#### CLI
1. In the PVE WebGUI management interface, navigate to **Node** → **Shell** (or log in via SSH) to access the command-line console.
2. Run `vim.tiny /etc/apt/sources.list.d/pve-enterprise.list` to open the file. Move the cursor to the beginning of the line, press `i` to enter insert mode, type `#` to comment out the line, press `esc` to exit insert mode, then type `ZZ` (two uppercase Z's) to save and quit.
3. Next, run `vim.tiny /etc/apt/sources.list.d/pve-no-subscription.list` to open the No-Subscription repository file. Move the cursor to the beginning of the line and press `x` to delete the `#` character, enabling the No-Subscription repository. Type `ZZ` to save and quit.
#### WebGUI
1. Open the PVE WebGUI management interface and navigate to **Node** → **Repositories** to access the repository management page.
2. In the Content Panel on the right, select the **pve-enterprise** Enterprise repository, then click the **Disable** button at the top to disable it.
3. Next, select the **pve-no-subscription** No-Subscription repository in the same panel, then click the **Enable** button at the top to enable it.![enable-pve-no-subscription](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/enable-pve-no-subscription.gif)
#### Removing the Subscription Notice from the PVE WebGUI Login (No longer works after PVE 8.02)
Without an active PVE enterprise subscription, a **No valid subscription** popup appears every time you log into the PVE Web management interface. You can remove this popup by following the steps below.![1.no-valid-subscription](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/1.no-valid-subscription.png)
1. Change directory
	```shell
	cd /usr/share/javascript/proxmox-widget-toolkit
	```
2. Back up the file
	```shell
	cp proxmoxlib.js proxmoxlib.js.bak
	```
3. Edit the file
	```shell
	vim.tiny proxmoxlib.js
	```
4. Locate the following lines
	```shell
	Ext.Msg.show({
	  title: gettext('No valid subscription'),
	```
5. Replace `Ext.Msg.show` with `void`
	```shell
	void({ //Ext.Msg.show({
	  title: gettext('No valid subscription'),
	```
	![2.no-valid-subscription](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/2.no-valid-subscription.png)
6. Restart the PVE web server
	```shell
	systemctl restart pveproxy.service
	```
## 3. Exploring the PVE WebGUI Management Interface
The PVE WebGUI management interface is divided into four sections:
- Header
- Resource Tree
- Content Panel
- Log Panel
### 1. Header
The Header at the top of the page contains:
1. **Documentation**: Opens the local PVE documentation.
2. **Create VM**: Creates a new Virtual Machine.
3. **Create CT**: Creates a new Container.
![1.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/1.PVE-setting.png)
### 2. Resource Tree
1. **Datacenter**: Contains settings for all Clusters.
2. **Node**: Allows you to manage individual nodes within a Cluster.
3. **Guest**: Displays created Virtual Machines and Containers. You can manage specific Guests at this level.
4. **Storage**: The data storage center. You can monitor and manage storage from this section.
![2.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/2.PVE-setting.png)
### 3. Content Panel
Each item in the Resource Tree has its own dedicated Content Panel. The specific panels are as follows:
#### Datacenter
The Datacenter section is primarily used for Cluster-wide settings. The available options are:
- **Summary**: Displays the overall health and resource usage across all Cluster nodes.
- **Cluster**: Cluster management.
- **Options**: Default Cluster settings, including keyboard layout, proxy configuration, etc.
- **Storage**: Cluster-wide storage management.
- **Permission**: Manage users, groups, and API token permissions, as well as LDAP, MS-AD, and Two-Factor authentication.
- **HA**: Manage Proxmox VE High Availability (HA).
- **ACME**: Configure ACME certificates for server nodes.
- **Firewall**: Firewall settings.
![3.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/3.PVE-setting.png)
![4.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/4.PVE-setting.png)
![5.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/5.PVE-setting.png)
#### Node
Configuration and management of an individual Node. The upper-right corner provides several shortcut buttons: **Reboot**, **Shutdown**, **Shell**, and **Bulk Actions**.
Key options to note:
- **Summary**: Displays resource usage for the Node.
- **Shell**: Provides terminal access to the Node.
- **System**: Configure network, DNS, and time settings, and view system logs.
- **Disks**: View the status of connected disks.
![6.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/6.PVE-setting.png)
![7.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/7.PVE-setting.png)
![8.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/8.PVE-setting.png)
![9.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/9.PVE-setting.png)
#### Guests
Guests are divided into **KVM (Kernel-based Virtual Machine)** Virtual Machines and **LXC (Linux Container)** Containers.
The upper-right corner of the Header provides shortcut buttons: **Start**, **Shutdown**, **Console**, **Clone**, Migrate, etc.
![10.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/10.PVE-setting.png)
Key options to note for Guests:
- **Summary**: Basic information about the Virtual Machine.
- **Console**: Access the Virtual Machine console.
- **(KVM) Hardware**: Define the hardware available to the Virtual Machine.
- **(LXC) Resources**: Define the system resources available to the Container.
- **Options**: Guest configuration settings.
- **Backup**: Create and restore system backups.
- **Snapshots**: Create and restore Virtual Machine Snapshots.
![11.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/11.PVE-setting.png)
![12.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/12.PVE-setting.png)
![13.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/13.PVE-setting.png)
![14.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/14.PVE-setting.png)
#### Storage
This section displays all storage devices mounted in the Cluster Datacenter.
- **Summary**: Displays key information about the storage, including type, usage, and content.
- **Content**: Menu entries for each content type stored, including:
	- **ISO Images**: Uploaded or downloaded Virtual Machine images.
	- **CT Templates**: Uploaded or downloaded LXC Container templates.
	- **Backups**: Virtual Machine backups.
	- **VM Disks**: QEMU/KVM Guest VM images.
	- **CT Volumes**: Container data volumes.
- **Permissions:** Manage storage permissions.
![15.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/15.PVE-setting.png)
![16.PVE-setting](https://raw.githubusercontent.com/Quentinbest/imageupload/master/pve/16.PVE-setting.png)
### 4. Log Panel
The Log Panel serves the following purposes:
- Displays what is currently happening on the Cluster nodes;
- Background operations such as creating a Virtual Machine are run as **tasks**;
- All task output is saved to a separate log file — double-click a task entry to view it;
- Allows you to terminate running tasks.
## 4. Changing the PVE IP Address
If you need to change the PVE IP address for any reason, you must modify the following three files:
1.  `/etc/network/interfaces`
2.  `/etc/hosts`
3.  `/etc/issue`
4. Reboot the system
## References:
- [PVE GUI Documentation](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#_gui_overview)
- [PVE Package Repositories Documentation](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#sysadmin_package_repositories)
- [Remove PVE Subscription Notice](https://johnscs.com/remove-proxmox51-subscription-notice/)
- [PVE Content Panel Documentation](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#_content_panels)
