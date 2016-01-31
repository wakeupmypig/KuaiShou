# **Ionic（Cordova）开发环境搭建文档** #

---

### **目录** ###
1. Android篇  
  (1)配置JAVA  
  (2)配置Android  
  (3)安装Cordova和Ionic  

2. IOS篇  
  (1)安装xcode  
  (2)配置JAVA  
  (3)配置Android  
  (4)安装Cordova和Ionic  

---

### **1. Android篇** ###

#### **必备工具** ####

 1. JAVA JDK 版本7以上 (**64位系统建议安装64位版本**） [下载地址][1]
 2. Android SDK 安装最新版 [下载地址][2]
 3. NodeJS v4.2.2 [下载地址][3]
 4. Cordova, Ionic [安装方法][4]

(1)配置JAVA
安装完**JAVA JDK**后配置环境变量，在系统的环境变量里添加JAVA_HOME变量，值为JAVA SDK的安装位置，如下： 

>JAVA_HOME C:\Program Files\Java\jdk1.8.0_60-

(2)安装Android SDK
下载SDK的安装包。安装完成后检查Path里是否已经添加了Android ADB tools的路径

(3)安装NodeJS
正常安装，没有什么特殊的地方。
安装完成后在CMD里运行“npm -v”命令检查是否安装成功。

(4)安装Cordova，Ionic
启动CMD，输入：

> npm install -g cordova ionic

静候安装成功。如果安装的时候出现错误提示，可能是GFW的问题，需要翻墙，或添加NPM的国内镜像[CNPM][5]再次进行安装，直至成功。
CNPM的安装方法见http://cnpmjs.org/。
安装完成后，进入CMD，运行 ionic 命令检查安装是否成功，如果显示ionic的相关帮助信息就表示安装成功了。
  
a.在任意位置运行命令，建立工程：ionic start kuaishou tabs  
b.进入kuaishou目录，用我给你的www.rar里的文件覆盖www里的所有文件。  
c.运行 npm install 安装相关程序  
d.运行 ionic state restore 恢复项目  
e.然后再运行 ionic platform add android 添加android平台。  
f.使用 ionic build andorid 检查项目是否编译成功  
g.platform>output文件夹生成apk文件

 
  
  
  
  
  ### **2. ios篇** ###
  
  #### **必备工具** ####
  
   1. JAVA JDK 版本7以上  
   2. Android SDK 安装最新版
   3. NodeJS v4.2.2 
   4. Cordova, Ionic 
   5. 最新版xcode
  
  (1)配置JAVA
  升级mac系统中java jdk版本1.7+

  (2)安装Android SDK
  下载SDK的安装包（见必备工具）。手动添加Android ADB tools的路径
  
  (3)安装NodeJS
  正常安装，没有什么特殊的地方。
  安装完成后在terminal里运行“npm -v”命令检查是否安装成功。
  
  (4)安装Cordova，Ionic
  启动terminal，输入：
  
> sudo npm install -g cordova ionic
  
  安装完成后，进入terminal，运行 ionic 命令检查安装是否成功，如果显示ionic的相关帮助信息就表示安装成功了。
    
  a.在任意位置运行命令，建立工程：ionic start kuaishou tabs  
  b.进入kuaishou目录，用我给你的www.rar里的文件覆盖www里的所有文件。  
  c.运行 npm install 安装相关程序  
  d.运行 ionic state restore 恢复项目  
  e.然后再运行 ionic platform add ios 添加ios平台。  
  f.使用xcode 打开生成的ios项目 run可在xcode虚拟机中运行  
  g.配置开发者账号可进行真机调试。  
  h.通过archive生成.ph文件  
 
 
 
 
   [1]: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
   [2]: http://developer.android.com/intl/zh-cn/sdk/index.html#Other
   [3]: http://nodejs.org/
   [4]: http://ionicframework.com/getting-started/
   [5]: http://cnpmjs.org/