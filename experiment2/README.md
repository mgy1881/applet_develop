# 2022年夏季《移动软件开发》实验报告

|                      |                                                       |
| -------------------- | ----------------------------------------------------- |
| 本实验属于哪门课程？ | 中国海洋大学22夏《移动软件开发》                      |
| 实验名称？           | 实验2：天气查询小程序                                 |
| 博客地址？           | http://t.csdn.cn/mdScU                                |
| Github仓库地址？     | https://github.com/mgy1881/applet_develop/experiment2 |



## **一、实验目标**

1、掌握服务器域名配置和临时服务器部署；2、掌握 `wx.request` 接口的用法。



## 二、实验步骤

### 实验前准备

#### API密钥申请

根据实验文档提示，注册和风天气的账号并申请免费密钥:

<img src="https://s2.loli.net/2023/08/23/vYrA1OKnWhDuqXG.png" alt="image-20230823175653735" style="zoom:80%;" />

### 项目创建

创建名为`weatherDemo`的微信小程序项目，选择测试号作为AppID 进行开发：

<img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823194319474.png" alt="image-20230823194319474" style="zoom: 50%;" />

### 页面配置

#### 创建与修改页面文件

与实验一的配置流程相同，项目创建完毕后，删除`logs`页面，并删除其余页面中的初始代码，利用自动补全完成初始化即可。

#### 创建其它文件

需要在项目目录下新建一个`images`目录用于存放天气图标素材，天气图标素材在文档中已经给出，挑选自己喜欢的风格的一套图标导入即可，完成后的目录结构如下:

<img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823195046340.png" alt="image-20230823195046340" style="zoom:67%;" />

### 视图设计

#### 导航栏设计

在`app.json`文件中自定义导航栏效果,修改导航栏的颜色为蓝色，文本为“今日天气”:

```json
{
  "pages":[
    "pages/index/index"
  ],
  "window":{
    "navigationBarBackgroundColor": "#3883FA",
    "navigationBarTitleText": "今日天气"
  }
}
```

#### 页面设计

##### 整体容器设计

在`index.wxml`中进行页面设计，首先添加`<view>`页面容器作为最外层容器:

```html
<view class='container'>
</view>
```

然后在`index.wxss`文件中修改容器的样式:

```css
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
```

由于没有添加任何组件，目前页面除导航栏外仍是一片空白:

<img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823200020173.png" alt="image-20230823200020173" style="zoom:50%;" />

##### 地图选择器设计

添加地区选择器，用户可以切换选择其他城市,在`index.wxml`中添加代码片段:

```html
<picker mode="region" >
    <view>北京市</view>
</picker>
```

##### 文本设计

添加`<text>`组件实现显示单行的天气信息，同样的是在之前列出的大框架里面添加代码:

```html
<text>19℃ 晴</text>
```

同时，修改`index.wxss`文件，添加以下代码以改变文本的外观:

```css
text {
  font-size: 80rpx;
  color: #3C5F81;
}
```

修改后显示效果如下：

<img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823200859726.png" alt="image-20230823200859726" style="zoom:50%;" />

##### 天气图标设计

添加显示天气图标的`<image>`组件，利用之前准备好的天气图标素材进行显示:

```html
<image src = '/images/werther_icon/999.png' mode = 'widthFix'></image>
```

同样的添加修改图标样式的代码如下:

```css
image {
  width: 220rpx;
}
```

显示效果如下:

<img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823201257822.png" alt="image-20230823201257822" style="zoom:50%;" />

##### 多行天气信息设计

在`index.wxml`中添加代码用于显示各种天气信息:

```html
 <view class="detail">
    <view class='bar'>
      <view class="box">湿度</view>
      <view class="box">气压</view>
      <view class="box">能见度</view>
    </view>
    <view class="bar">
      <view class="box">0 %</view>
      <view class="box">0 hpa</view>
      <view class="box">0 km</view>
    </view>
    <view class="bar">
      <view class="box">风向</view>
      <view class="box">风速</view>
      <view class="box">风力</view>
    </view>
    <view class="bar">
      <view class="box">0</view>
      <view class="box">0 km/h</view>
      <view class="box">0 级</view>
    </view>
  </view>
```

并且在`index.wxss`中修改样式:

```css
.detail {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.bar {
  display: flex;
  flex-direction: row;
  margin: 20rpx 0;
}

.box {
  width: 33.3%;
  text-align: center;
}
```

运行效果如图:

<img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823203117750.png" alt="image-20230823203117750" style="zoom:67%;" />

### 逻辑实现

#### 更新省、市、区信息

将`<picker>`组件中的固定信息修改为变量，以便于后期进行动态更改,并且追加自定义的`bindchange`事件，用于监听选项变化:

```html
<picker mode="region" bindchange = "regionChange">
    <view>{{region}}</view>
</picker>
```

修改`index.js`文件，在`data`中定义`region`为包含省、市、区3个项目的数组，并且新建`regionChange`函数用于处理地区变化事件:

```js
Page({
  data: {
    region: ["山东省", "青岛市", "黄岛区"],
  },
  regionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
  },
})
```

#### 获取实况天气数据

修改`index.js`文件，添加获取天气数据的文件，这里，由于和风天气的接口规则的修改，已经不再可以利用中文城市名来获取城市天气信息，需要利用对应的城市ID，故需要先编写一个函数用于获取城市ID。

但由于js为异步执行，所以无法单纯利用调用先后顺序来实现先获取ID再利用ID获取城市天气信息的效果。

这里我利用了`promise`构造函数传入获取城市ID的函数，利用`resolve`传值，利用`then()`回调函数获取城市ID值从而实现预期效果。

```js
//返回一个利用promise构造函数构造的对象，用于获取ID
getId: function () {
    let that = this;
    return new Promise((resolve) => {
      wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup',
        data: {
          location: that.data.region[2],//获取地区天气
          adm: that.data.region[1], //传入地区上级行政区的名称联合查询，防止出现地名重复情况
          key: 'my_key'
        },
        success: function (res) {
          resolve(res.data.location[0].id);
          // console.log(res.data)
        }
      }) 
      
    });
  },
  getWeather: function () {
    let that = this;
    that.getId().then((city_id) => { //利用then回调函数获取promise成功后的传值
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/now',
        data: {
          location: city_id,
          // location:101010100,
          key: 'my_key'
        },
        success: function (res) {
          // console.log(res.data);
          that.setData({
            now: res.data.now
          })
        }
      })
    })
  },
```

之后将`getWeather`函数分别在生命周期函数`onLoad`和自定义函数`regionChange`中分别进行调用：

```js
regionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
    this.getWeather()
  },
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
  },
```

在联网状态下，在代码段中填写输出语句，运行程序，便会在Console控制台得到第三方服务器发回的JSON数据:

<img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823205735331.png" alt="image-20230823205735331" style="zoom: 67%;" />

获取到天气数据后，更新数据存入`data`即可:

```js
success: function (res) {
          that.setData({
            now: res.data.now
          })
        },
```

#### 更新页面天气信息

获取到天气信息并且存入`data`后，将页面上的固定数据都替换成`{{now.属性}}`的格式，需要注意的是，由于和风天气的更新，接口数据的名称与文档中不同，官方最新的接口名称如下:

<img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823210603391.png" alt="image-20230823210603391" style="zoom:50%;" />

更新`index.wxml`中的固定信息为动态信息:

```html
<text>{{now.temp}}℃ {{now.text}}</text>
<image src="/images/weather_icon/{{now.icon}}.png" mode="widthFix"></image>
  <view class="detail">
    <view class='bar'>
      <view class="box">湿度</view>
      <view class="box">气压</view>
      <view class="box">能见度</view>
    </view>
    <view class="bar">
      <view class="box">{{now.humidity}} %</view>
      <view class="box">{{now.pressure}} hpa</view>
      <view class="box">{{now.vis}} km</view>
    </view>
    <view class="bar">
      <view class="box">风向</view>
      <view class="box">风速</view>
      <view class="box">风力</view>
    </view>
    <view class="bar">
      <view class="box">{{now.windDir}}</view>
      <view class="box">{{now.windSpeed}} km/h</view>
      <view class="box">{{now.windScale}} 级</view>
    </view>
  </view>
```

最后，在`data`中添加初始值，以供无法及时获取数据时显示:

```js
data: {
    region: ["山东省", "青岛市", "黄岛区"],
    now:{
      temp:"0",
      text:"未知",
      icon:"999",
      humidity:"0",
      pressure:"0",
      vis:"0",
      windDir:"0",
      windSpeed:"0",
      windScale:"0"
    }
  },
```



## 三、程序运行结果

+ **程序初始页面**

<img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823211119534.png" alt="image-20230823211119534" style="zoom: 67%;" />

+ **城市切换**

  <img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823211254752.png" alt="image-20230823211254752" style="zoom:67%;" />

+ **切换城市后的显示效果**

  <img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823211332981.png" alt="image-20230823211332981" style="zoom:67%;" />

+ **城市重复问题**
  陕西省西安市与吉林省辽源市下辖的西安区获取到的天气不会混淆:

​		<img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823211838023.png" alt="image-20230823211838023" style="zoom: 67%;" /><img src="https://cdn.jsdelivr.net/gh/mgy1881/image_upload@main//picGo_up/image-20230823211930819.png" alt="image-20230823211930819" style="zoom: 67%;" />

## 四、问题总结与体会

实验过程中我遇到了无法根据原文档函数编写方法正常获取城市天气信息问题，通过阅读官方文档了解到了接口改变，且需要额外获取城市ID，问题得到解决。

但是我又碰到了无法先获取城市ID后用城市ID获取城市天气信息的问题，通过网上查阅与寻求同学帮助，了解到可以通过promise构造函数解决问题。最后终于实现了预期效果。