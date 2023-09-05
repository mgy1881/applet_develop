# 2023年夏季《移动软件开发》实验报告

|                      |                                  |
| -------------------- | -------------------------------- |
| 本实验属于哪门课程？ | 中国海洋大学23夏《移动软件开发》 |
| 实验名称？           | 实验6：推箱子游戏                |

## **一、实验目标**

1、综合应用所学的知识创建完整的推箱子游戏；2、熟练掌握<canvas>和绘图API。



## 二、实验步骤

### 项目创建与页面配置

创建名为boxGame的微信小程序，删除`logs`页面并且新建`game`页面，删除项目模板中的原有代码，初始化项目。

#### 1. 创建其它文件

在项目目录中新建`images`文件夹用于存放图片素材，新建`utils`文件夹用于存放公共JS文件。

将图片素材以及`icons`复制进项目文件夹，并且在`utils`文件夹中新建`data.js`文件。

完成后的项目目录结构如下:

<img src="https://s2.loli.net/2023/09/05/8lLNmiI1MPy2rVY.png" alt="image-20230905083333956" style="zoom:67%;" />

#### 2. 导航栏设计

修改`app.json`文件中的 window属性，来定义导航栏的效果，修改导航栏的背景色与字体：

```json
 "window":{
    "navigationBarBackgroundColor": "#E64340",
    "navigationBarTitleText": "推箱子游戏",
    "navigationBarTextStyle":"white"
  },
```

修改后的效果如下:

<img src="https://s2.loli.net/2023/09/05/Rr1dljKsGTmSiUL.png" alt="image-20230905083702415" style="zoom:67%;" />

#### 3. 页面设计

##### 公共样式设计

在`app.wxss`中设置页面容器和顶端标题的公共样式:

```css
.container{
  height: 100vh;
  color: #E64340;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.title{
  font-size: 18pt;
}
```

##### 首页设计

在`index.wxml`中添加代码如下:

```html
<view class="container">
  <view class="title">游戏选关</view>
  <view class="levelBox">
    <view class="box">
      <image src="/images/level01.png" />
      <text>第1关</text>
    </view>
  </view>
</view>
```

同时在`index.wxss`中添加代码片段来修改样式:

```css
/*关卡列表区域*/
.levelBox{
  width: 100%;
}
/*单个关卡区域*/
.box{
  width: 50%;
  float: left;
  margin: 20rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/*选关图片*/
image{
  width: 300rpx;
  height: 300rpx;
}
```

完成后的显示效果如下:

<img src="https://s2.loli.net/2023/09/05/QuWcyedAlaXxS2I.png" alt="image-20230905085211439" style="zoom:67%;" />

##### 游戏页面设计

在设计游戏页面之前，需要修改编译模式让小程序编译game页面，添加编译模式并且携带参数`level=0`编译game页面：

<img src="https://s2.loli.net/2023/09/05/fQpwB6sYbqADuoZ.png" alt="image-20230905085428758" style="zoom:50%;" />

完成之后在`game.wxml`中分别添加`<view><canvas><button>`组件用于实现关卡提示，图形绘制和重新开始按钮:

```html
<view class="container">
  <!--关卡提示-->
  <view class="title">第1关</view>
    
  <!--游戏画布-->
  <canvas canvas-id="myCanvas"></canvas>
  <!--方向键-->
  <view class="btnBox">
    <button type="warn">↑</button>
    <view>
      <button type="warn">←</button>
      <button type="warn">↓</button>
      <button type="warn">→</button>
    </view>
  </view>
  <!--重新开始按钮-->
  <button type="warn">重新开始</button>
</view>
```

同时需要在`game.wxml`中修改代码样式如下:

```css
/*游戏画布样式*/
canvas{
  border: 1rpx solid;
  width: 320px;
  height: 320px;
}
/*方向键按钮整体区域*/
.btnBox{
  display: flex;
  flex-direction: column;
  align-items: center;
}
/*方向键按钮第二行*/
.btnBox view{
  display: flex;
  flex-direction: row;
}
/*所有方向键按钮*/
.btnBox button{
  width: 90rpx;
  height: 90rpx;
}
/*所有按钮样式*/
button{
  margin: 10rpx;
}

```

完成后的页面显示效果如下:

<img src="https://s2.loli.net/2023/09/05/lekwZs9uOKtfJRv.png" alt="image-20230905091956767" style="zoom:67%;" />

### 逻辑实现

#### 1. 公共逻辑

在公共JS文件中配置游戏地图的数据，代码如下：

```js
var map1 = [
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 2, 2, 1, 1, 1, 0],
  [0, 1, 5, 4, 2, 2, 1, 0],
  [1, 1, 1, 2, 1, 2, 1, 1],
  [1, 3, 1, 2, 1, 2, 2, 1],
  [1, 3, 4, 2, 2, 1, 2, 1],
  [1, 3, 2, 2, 2, 4, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
]
var map2 = [
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 3, 1, 0, 0, 0],
  [0, 0, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 4, 2, 4, 3, 1],
  [1, 3, 2, 4, 5, 1, 1, 1],
  [1, 1, 1, 1, 4, 1, 0, 0],
  [0, 0, 0, 1, 3, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0],
]
var map3 = [
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 3, 3, 1, 0, 0],
  [0, 1, 1, 2, 3, 1, 1, 0],
  [0, 1, 2, 2, 4, 3, 1, 0],
  [1, 1, 2, 2, 5, 4, 1, 1],
  [1, 2, 2, 1, 4, 4, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
]
var map4 = [
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 3, 2, 3, 3, 1, 0],
  [0, 1, 3, 2, 4, 3, 1, 0],
  [1, 1, 1, 2, 2, 4, 1, 1],
  [1, 2, 4, 2, 2, 4, 2, 1],
  [1, 2, 1, 4, 1, 1, 2, 1],
  [1, 2, 2, 2, 5, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
]
```

同时需要将数据出口进行暴露:

```js
module.exports = {
  maps: [map1, map2, map3, map4]
}
```

在`game.js`中引用公共的js文件:

```js
var data = require('../../utils/data.js')
```

#### 2. 首页逻辑

##### 关卡列表展示

在`index.js`中的data数据中添加关卡的图片数据信息:

```js
 data: {
    levels:[
      'level01.png',
      'level02.png',
      'level03.png',
      'level04.png',
    ]
  },
```

之后需要在`index.wxml`中利用for循环展示关卡列表数据和图片:

```html
<view class="container">
  <!--标题-->
  <view class="title">游戏选关</view>
  <!--关卡列表-->
  <view class="levelBox">
    <view class="box" wx:for="{{levels}}" wx:key="index">
      <image src="/images/{{item}}" />
      <text>第{{index+1}}关</text>
    </view>
  </view>
</view>
```

完成后的页面显示效果如下:

<img src="https://s2.loli.net/2023/09/05/oV2jDrW6syBFTMb.png" alt="image-20230905093159090" style="zoom:67%;" />

##### 点击跳转游戏页面

首先需要为关卡列表绑定点击事件：

```html
<view class="box" wx:for="{{levels}}" wx:key="index" bindtap="chooseLevel" data-level="{{index}}">
    <image src="/images/{{item}}" />
    <text>第{{index+1}}关</text>
</view>
```

添加了点击事件函数`chooseLevel`，并且使用`data-level`属性携带了关卡图片的下表信息。

之后需要在对应的JS文件中实现函数的具体逻辑功能，代码如下:

```js
  chooseLevel:function(e){
    let level = e.currentTarget.dataset.level
    wx.navigateTo({
      url:'../game/game?level='+level
    })
  },
```

现在实现了点击关卡图片跳转到game页面，并且也传递了关卡数据，接下来需要在game页面接受数据并展示相应的关卡。

#### 3. 游戏页逻辑

##### 显示当前第几关

在`game.js`中接受关卡数据:

```js
/**
   * 页面的初始数据
   */
  data: {
    level: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let level = options.level
    this.setData({
      level: parseInt(level) + 1
    })
  },
```

修改WXML代码片段如下:

```html
  <view class="title">第{{level}}关</view>
```

完成后可以正确显示关卡名，显示效果如下:

<img src="https://s2.loli.net/2023/09/05/yZNXMk8uJ2dYVRf.png" alt="image-20230905094403272" style="zoom:67%;" />

##### 游戏逻辑实现

1. 首先 在`game.js`文件顶端添加一些游戏的初始数据信息，代码如下:

```js
var map = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];
var box = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];
//方块宽度
var w = 40;
//初始化游戏主角的行与列
var row = 0;
var col = 0;
```

2. 初始化游戏画面
   需要根据当前是第几关读取对应的游戏地图信息。并更新到游戏的初始数据中。

   在`game.js`文件中添加`initMap`函数用于初始化游戏地图数据。

   对应的JS代码片段如下:

   ```js
   initMap:function(level){
       //读取原始的游戏地图数据
       let mapData = data.maps[level];
       //使用双重for循环记录地图数据
       for(var i = 0; i<8; i++){
         for(var j = 0; j<8; j++){
           bos[i][j] = 0;
           map[i][j] = mapData[i][j];
            
           if(mapData[i][j] == 4){
             box[i][j] = 4;
             map[i][j] = 2;
           } else if(mapData[i][j] == 5){
             map[i][j] = 2;
             row = i;
             col = j;
           }
         }
       }
     },
   ```

   该函数读取了公共函数文件`data.js`中的对应关卡的游戏地图数据，使用双重for循环对每一块地图数据进行解析，并更新当前游戏的初始地图数据、箱子数据以及游戏主角的所在位置。

   然后在`game.js`中添加自定义函数`drawCanvas`用于将地图数据绘制画布上:

   ```js
   drawCanvas:function(){
       let ctx = this.ctx
       //清空画布
       ctx.clearRect(0,0,320,320)
       //使用双重for循环绘制8*8地图
       for(var i = 0; i<8;i++){
         for(var j = 0;j<8;j++){
           let img = 'ice'
           if(map[i][j]==1){
             img = 'stone'
           }else if(map[i][j]==3){
             img = 'pig'
           }
   
           ctx.drawImage('/images/icons/'+img+'.png',j*w,i*w,w,w)
   
           if(box[i][j]==4){
             ctx.drawImage('/images/icons/box.png',j*w,i*w,w,w)
           }
         }
       }
       ctx.drawImage('/images/icons/bird.png',col*w,row*w,w,w)
       ctx.draw()
     },
   ```

   最后在`game.js`的`onLoad`函数中创建画布上下文，并调用`initMap`和`drawCanvas`函数：

   ```js
   onLoad(options) {
       let level = options.level
       this.setData({
         level: parseInt(level) + 1
       })
       //创建画布上下文
       this.ctx = wx.createCanvasContext('myCanvas')
       //初始化地图数据
       this.initMap(level)
       //绘制画布内容
       this.drawCanvas()
     },
   ```

   完成后的效果如下:

   <img src="https://s2.loli.net/2023/09/05/rWpyAchGH376O8V.png" alt="image-20230905100516034" style="zoom:67%;" />

3. 方向键逻辑实现

   修改`game.wxml`页面中的4个方向键`<button>`，为其绑定点击事件：

   ```html
   <!--方向键-->
   <view class="btnBox">
       <button type="warn" bindtap='up'>↑</button>
       <view>
         <button type="warn" bindtap='left'>←</button>
         <button type="warn" bindtap='down'>↓</button>
         <button type="warn" bindtap='right'>→</button>
       </view>
     </view>
   ```

   之后在`game.js`文件中添加自定义函数`up`、`down`、`left`和`right`分别用于实现游戏主角的上下左右四个方向的移动:

   ```js
   up: function () {
       //不在最顶端才考虑上移
       if (row > 0) {
           //如果上方不是墙或箱子，可以移动小鸟
         if (map[row - 1][col] != 1 && box[row - 1][col] != 4) {
           //更新当前小鸟的坐标
             row = row - 1
         }
          //如果上方是箱子
         else if (box[row - 1][col] == 4) {
           //箱子不在最顶端才能考虑推动
           if (row - 1 > 0) {
             //如果箱子上方不是墙或箱子
             if (map[row - 2][col] != 1 && box[row - 2][col] != 4) {
               box[row - 2][col] = 4
               box[row - 1][col] = 0
               //更新当前小鸟的坐标
               row = row - 1
             }
           }
         }
         //重新绘制地图
         this.drawCanvas()
       }
     },
   
     down: function () {
       if (row < 7) {
         if (map[row + 1][col] != 1 && box[row + 1][col] != 4) {
           row = row + 1
         } else if (box[row + 1][col] == 4) {
           if (row + 1 < 7) {
             if (map[row + 2][col] != 1 && box[row + 2][col] != 4) {
               box[box + 2][col] = 4
               box[row + 1][col] = 0
               row = row + 1
             }
           }
         }
         this.drawCanvas()
       }
     },
   
     left: function () {
       if (col > 0) {
         if (map[row][col - 1] != 1 && box[row][col - 1] != 4) {
           col = col - 1
         } else if (box[row][col - 1] == 4) {
           if (col - 1 > 0) {
             if (map[row][col - 2] != 1 && box[row][col - 2] != 4) {
               box[row][col - 2] = 4
               boxd[row][col - 1] = 0
               col = col - 1
             }
           }
         }
         this.drawCanvas()
       }
     },
     right:function(){
       if (col < 7) {
         if (map[row][col + 1] != 1 && box[row][col + 1] != 4) {
           col = col + 1
         } else if (box[row][col + 1] == 4) {
           if (col + 1 < 7) {
             if (map[row][col + 2] != 1 && box[row][col + 2] != 4) {
               box[row][col + 2] = 4
               boxd[row][col + 1] = 0
               col = col + 1
             }
           }
         }
         this.drawCanvas()
       }
     },
   ```

##### 判断游戏成功

在`game.js`文件中添加自定义函数`isWin`用于判断游戏是否已经成功。

对应的JS代码片段如下:

```js
isWin:function(){
    for(var i = 0;i<8;i++){
      for(var j =0;j<8;j++){
        if(box[i][j] == 4&&map[i][j]!=3){
          return false
        }
      }
    }
    return true
  },
```

之后添加`checkWin`函数用于弹出游戏成功提示对话框:

```js
checkWin:function(){
    if(this.isWin()){
      wx.showModal({
        title: '恭喜',
        content: '游戏成功！',
        showCancel: false
      })
    }
  },
```

最后在四个方向移动函数中添加关于游戏成功的判断:

```js
 up: function () {
     //不在顶端才考虑上移
    if (row > 0) {
        //如果上方不是箱子或墙，可以移动小鸟
      ...
      //如果上方是箱子
      ...
      //重新绘制地图
      this.drawCanvas()
      //检查游戏是否成功
      this.checkWin()
    }
  },
```

游戏成功后的显示效果如下:

<img src="https://s2.loli.net/2023/09/05/YtvaQeODgE1wW9B.png" alt="image-20230905103711596" style="zoom:67%;" />

##### 重新开始游戏

修改`game.wxml`代码，为“重新开始”按钮添加自定义点击事件:

```html
<button type="warn" bindtap="restartGame" >重新开始</button>
```

在`game.js`文件中添加`restartGame`函数，用于重新开始游戏:

```js
restartGame: function () {
    //初始化地图数据
    this.initMap(this.data.level - 1)
    //绘制画布内容
    this.drawCanvas()
  },
```

此时页面显示效果如下：
<img src="https://s2.loli.net/2023/09/05/y9jmfWG4NnxQDLu.png" alt="image-20230905104309141" style="zoom:50%;" /><img src="https://s2.loli.net/2023/09/05/LWw42PVy7ip5NeY.png" alt="image-20230905104335742" style="zoom:50%;" />

## 三、程序运行结果

+ 选关页面

  <img src="https://s2.loli.net/2023/09/05/5BnCURthPg2kfIy.png" alt="image-20230905104429965" style="zoom:67%;" />

+ 进入关卡
  <img src="https://s2.loli.net/2023/09/05/2K5VRxChkXjywzg.png" alt="image-20230905104502644" style="zoom:67%;" />

+ 游戏成功画面
  <img src="https://s2.loli.net/2023/09/05/4MrQ2xDWdHcGAwN.png" alt="image-20230905104757319" style="zoom:67%;" />



## 四、问题总结与体会

在本次试验中，利用`canvas`组件绘制推箱子游戏，进一步掌握了画布组件的使用方法，掌握了绘图API的调用方法。

同时本次实验中也遇到了一些问题，在绘制方向键时，定义的css样式无法起作用，之后了解到可能是因为微信小程序采用的都是 AppService 和 WebView 的双线程模型，基于 WebView 和原生控件混合渲染的方式，小程序优化扩展了 Web 的基础能力，保证了在移动端上有良好的性能和用户体验。不过官方在 WebView 渲染之外新增了一个渲染引擎 Skyline，但是这个新的引擎还不是特别完善，很多样式不能够兼容，所以可能导致css样式无法正确作用与预期的组件。

解决方案我采用了取消`app.json`中`style:"v2"`的样式设定，成功解决了问题。