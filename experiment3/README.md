# 2022年夏季《移动软件开发》实验报告





|                      |                                  |
| -------------------- | -------------------------------- |
| 本实验属于哪门课程？ | 中国海洋大学22夏《移动软件开发》 |
| 实验名称？           | 实验3：视频播放小程序            |

## **一、实验目标**

1、掌握视频列表的切换方法；2、掌握视频自动播放方法；3、掌握视频随机颜色弹幕效果。



## 二、实验步骤

### 项目创建与页面配置

根据之前项目经验，新建小程序，删除相关数据，初始化相关文件即可完成项目初始化。

#### 创建其他文件

项目根目录下新建`images`文件夹用于存放播放图标:

<img src="https://s2.loli.net/2023/08/28/uiIqpD2gdJoxSnZ.png" alt="添加image" style="zoom:67%;" />

### 视图设计

#### 导航栏设计

根据文档在`app.json`文件中更改导航栏的颜色与标题文字:

```json
{
  "pages":[
    "pages/index/index"
  ],
  "window":{
    "navigationBarBackgroundColor": "#987938",
    "navigationBarTitleText": "口述校史"
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}

```

更改后的效果如下:

<img src="https://s2.loli.net/2023/08/28/SPa2fXM1H6kQWiv.png" alt="修改状态栏" style="zoom:67%;" />

#### 页面设计

##### 视频组件设计

利用`<video>`组件实现视频播放器，首先在`index.wxml`中添加组件:

```html
<video id="myVideo" controls></video>
```

在`index.wxss`中修改组件的样式，使其宽度为100%:

```css
video {
  width: 100%;
}
```

修改后的效果如下:

<img src="https://s2.loli.net/2023/08/28/B83tS6rydEsZkxR.png" alt="添加播放器" style="zoom:67%;" />

##### 弹幕区域设计

修改`index.wxml`页面代码，添加弹幕控制相关的组件，包括文本输入框和发送按钮:

```html
<view class="danmuArea">
  <input type="text" placeholder="请输入弹幕内容" />
  <button>发送弹幕</button>
</view>
```

同样的，在`index.wxss`中修改组件的样式:

```css
.danmuArea {
  display: flex;  /*flex模型布局*/
  flex-direction: row;
}
input {
  border: 1rpx solid #987938; /*设置边框线*/
  flex-grow: 1;   /*多余空间扩张*/
  height: 100rpx;
}
button {
  color: white;
  background-color: #987938;
}
```

修改后的效果如下:

<img src="https://s2.loli.net/2023/08/28/21pPDhgvuK7l6Hf.png" alt="添加弹幕发送框" style="zoom:67%;" />

##### 视频列表设计

修改`index.wxml`添加视频列表:

```html
<view class="videoList">
  <view class="videoBar" >
    <image src="/images/play.png"/>
    <text>测试标题</text>
  </view>
</view>
```

修改`index.wxss`更改组件样式:

```css
.videoList {
  width: 100%;
  min-height: 100rpx;
}
.videoBar {
  width: 95%;
  display: flex;
  flex-direction: row;
  border-bottom: 1rpx solid #987938;
  margin: 10rpx;
}
image{
  width: 60rpx;
  height: 60rpx;
  margin: 20rpx;
}
text{
  font-size: 40rpx;
  color: #987938;
  margin: 20rpx;
  flex-grow: 1;
}
```

修改后的效果如下:

<img src="https://s2.loli.net/2023/08/28/9CtUKSoicXLbN3l.png" alt="添加视频列表" style="zoom:67%;" />

### 逻辑实现

#### 更新播放列表

利用`wx:for`功能实现多个视频列表的展示：

```html
<view class="videoList">
  <view class="videoBar" wx:for="{{list}}" wx:key="video{{index}}" >
    <image src="/images/play.png"/>
    <text>{{item.title}}</text>
  </view>
</view>
```

同时在`index.js` 文件的`data`属性中添加`list`列表用于存放视频数据。

添加后的效果如下:

<img src="https://s2.loli.net/2023/08/28/clOnFSjbWCBeuNE.png" alt="更新播放列表" style="zoom:67%;" />

#### 点击播放视频

在`<view>`组件中添加`data-url`属性用于在点击时传回点击的视频的URL地址，添加`bindtap`属性用于相应点击事件:

```html
<view class="videoList">
  <view class="videoBar" wx:for="{{list}}" wx:key="video{{index}}" data-url="{{item.videoUrl}}" bindtap="playVideo" >
    <image src="/images/play.png"/>
    <text>{{item.title}}</text>
  </view>
</view>
```

在`index.js`中的监听页面加载函数中添加函数用于获取`VideoContext`实例:

```js
 onLoad: function (options) {
    this.videoCtx = wx.createVideoContext('myVideo')
  },
```

添加自定义函数:

```js
playVideo: function (e) {
    this.videoCtx.stop();
    this.setData({
      src: e.currentTarget.dataset.url
    })
    this.videoCtx.play();
  },
```

添加后的播放效果如下:

<img src="https://s2.loli.net/2023/08/28/nikR5CtWTOrMNXh.png" alt="点击播放视频" style="zoom:67%;" />

#### 发送弹幕

为`<vedio>`组件添加`enable-danmu` 和 `danmu-btn`属性，同时为文本输入框添加`bindinput`属性

用于获取弹幕的文本内容，为按钮添加`bindtap`属性，用于触发点击事件:

```html
<video id="myVideo" controls src="{{src}}" enable-danmu danmu-btn></video>

<view class="danmuArea">
  <input type="text" placeholder="请输入弹幕内容" bindinput="getDanmu" />
  <button bindtap="sendDanmu">发送弹幕</button>
</view>
```

修改`index.js`文件添加对应的函数用于实现功能:

```js
getDanmu: function (e) {
    this.setData({
      danmuTxt: e.detail.value
    })
  },

  sendDanmu: function (e) {
    let text = this.data.danmuTxt;
      this.videoCtx.sendDanmu({
        text: text,
        color: getRandomColor(), 
      });
  },
```

在文件中添加自定义函数`getRandomColor()`用来获取随机颜色以实现彩色弹幕:

```js
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
```

实现效果如下:

<img src="https://s2.loli.net/2023/08/28/D64KyP7UQGFVJNm.png" alt="image-20230828161510521" style="zoom:67%;" />

## 三、程序运行结果

+ 进入程序页面

​	<img src="https://s2.loli.net/2023/08/28/qixuSDUEojC6pTB.png" alt="image-20230828161720826" style="zoom:67%;" />

+ 播放视频

​	<img src="https://s2.loli.net/2023/08/28/tiN5VaBWmYJ4LZc.png" alt="image-20230828161800031" style="zoom: 67%;" />

+ 发送弹幕

​	<img src="https://s2.loli.net/2023/08/28/VWZs1XL3GfgbARi.png" alt="image-20230828161852684" style="zoom:67%;" />





## 四、问题总结与体会

本次实验中我掌握了`wx:for`的用法，学会了利用该功能循环列表实现多个相同模块的展示。同时也学会了利用`<vedio>`组件进行视频播放，添加弹幕等功能。