# 2022年夏季《移动软件开发》实验报告



|                    |                                                              |
| ------------------ | ------------------------------------------------------------ |
| 本实验属于哪门课程 | 中国海洋大学22夏《移动软件开发》                             |
| 实验名称           | 实验1：第一个微信小程序                                      |
| Github仓库地址     | [applet_develop/experiment1 at main · mgy1881/applet_develop (github.com)](https://github.com/mgy1881/applet_develop/tree/main/experiment1) |
| 博客地址           | http://t.csdn.cn/OGuXR                                       |



## **一、实验目标**

1、学习使用快速启动模板创建小程序的方法；2、学习不使用模板手动创建小程序的方法。



## 二、实验步骤

#### 使用模板创建小程序

打开微信开发这工具后选择新建小程序，选择JS模板创建小程序：

​	<img src=".\images\2023-08-22.png" alt="2023-08-22" style="zoom: 40%;" />

#### 手动创建小程序

在原先创建出的模板基础上，根据文档要求删除对应的文件夹，并在`index.js`和`app.js`文件中利用自动补全完成基础设置:
<img src=".\images\删除app.png" alt="删除app" style="zoom:38%;" />

#### 视图设计

###### 导航栏设计

修改`app.json`文件配置导航栏显示效果

```json
{
  "pages":[
    "pages/index/index"
  ],
  "window":{
    "navigationBarBackgroundColor": "#663399", //修改导航栏颜色
    "navigationBarTitleText": "手动创建第一个小程序" //修改导航栏标题文字
  }
}
```

修改后效果如下:

<img src=".\images\导航栏设计.png" alt="导航栏设计" style="zoom:75%;" />

###### 页面设计

修改`index.wxml`文件，为主页添加头像、昵称和按钮显示区域:

```html
<view class='container'>//用于修改样式的标签
  <image></image> //供微信头像显示的组件
  <text>Hello World</text>//用来显示昵称
  <button>点击获取头像和昵称</button>//显示按钮，用于用户交互
</view>
```

同时修改`index.wxss`文件改变样式:

```css
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
image {  //修改image标签的样式
  width: 300rpx;
  border-radius: 50%;
}
text {   //修改text标签的样式
  font-size: 50rpx;
}
```

可在项目目录中新建一个`images`文件夹用于存放默认的头像图片并修改之前的`image`标签显示默认头像:

```html
<image src='/images/logo.png' mode="widthFix"></image>
```

目录结构如下 ：

<img src=".\images\Clip_20230822_092017.png" alt="Clip_20230822_092017" style="zoom:55%;" />

修改之后显示效果如下:

<img src=".\images\Clip_20230822_092627.png" alt="Clip_20230822_092627" style="zoom:45%;" />



#### 逻辑实现

###### 获取微信用户信息

由于微信小程序版本更新的原因，无法通过`wx.getUserInfo`与`<button open-type="getUserInfo"/>`获取用户个人信息，将直接获取匿名数据，故使用`getUserProfile`方式获取用户信息


在`index.wxml`中修改`button`标签内容为：

```html
<button bindtap="getUserProfile">点击获取头像和昵称</button>
```

用于调用`getUserProfile`

同时在`index.js`中添加` getUserProfile`函数：

```javascript
getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        let info = res.userInfo;
        console.log(info);
      }
    })
  },
```

在用户确认授予个人信息后，控制台中即出现获取到的用户信息:

<img src=".\images\Clip_20230822_094435.png" alt="Clip_20230822_094435" style="zoom:55%;" />

###### 使用动态数据显示头像和昵称

之前已经成功获取到了用户的个人信息，现在只需要将这些信息动态显示出来即可。
修改`index.wxml`代码，将固定值更改为动态数据:

```html
<view class='container'>
  <image src='{{src}}' mode="widthFix"></image>
  <text>{{name}}</text>
  <button bindtap="getUserProfile">点击获取头像和昵称</button>
</view>
```

在`index.js`中data属性中添加动态数据的值:

```js
data: {
    src: '/images/logo.png',
    name: 'Hello World'
  },
```

###### 更新头像和昵称

修改`index.js`中`getUserProfile`函数的代码，使其可以将获取到的用户信息更新到动态数据上:

```javascript
getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        let info = res.userInfo;
        this.setData({
          src: info.avatarUrl,
          name: info.nickName,  
        })
      }
    })
  },
```

## 三、程序运行结果

+ 程序打开后默认界面：
  <img src=".\images\Clip_20230822_095455.png" alt="Clip_20230822_095455" style="zoom:60%;" />

+ 点击按钮弹出授权框:
  <img src=".\images\Clip_20230822_095545.png" alt="Clip_20230822_095545" style="zoom:60%;" />

+ 点击允许之后即可显示头像与昵称：

  <img src=".\images\Clip_20230822_095626.png" alt="Clip_20230822_095626" style="zoom:60% ;" align="left" />



## 四、问题总结与体会

在实验过程中，实验文档讲解十分详细，但是由于微信小程序接口更新较快，导致一些内容过时。

本次实验中，获取用户信息时，文档中给出的`getUserInfo`方法只能获取到匿名的用户信息，无法达到实验要求。通过查阅微信小程序的官方文档，了解到可以使用`getUserProfile`接口获取用户信息，结合微信小程序初始模板中给出的获取用户信息的代码示例与老师的帮助，成功获取到了用户信息。