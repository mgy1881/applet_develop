# 2022年夏季《移动软件开发》实验报告

|                |                                  |
| -------------- | -------------------------------- |
| 本实验属于课程 | 中国海洋大学22夏《移动软件开发》 |
| 实验名称       | 实验4：拼图游戏                  |

## **一、实验目标**

1、综合应用所学知识创建完整的拼图游戏项目；2、熟练掌握<canvas>组件。



## 二、实验步骤

### 项目创建与页面配置

新建项目，删除模板中原有的代码，新增`game`页面，并新建`images`目录用于存放图片文件，完成之后的项目目录如下：

<img src="https://s2.loli.net/2023/08/29/iom15rwjN2aQpRv.png" alt="项目目录" style="zoom:50%;" />

### 视图设计

#### 导航栏设计

在`app.json`中更改window属性用于定义导航栏颜色与文字效果:

```json
"window":{
    "navigationBarBackgroundColor": "#E64340",
    "navigationBarTitleText": "拼图游戏"
  },
```

修改后的显示效果如下所示:

<img src="https://s2.loli.net/2023/08/29/nrLvtpNH6GoQIAU.png" alt="修改导航栏" style="zoom: 67%;" />

#### 页面设计

##### 公共样式设计

在`app.wxss` 中设置页面窗口和顶端标题的公共样式：

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
  font-size:18pt;
}
```

##### 首页设计

在`index.wxml`文件中新增组件用于显示关卡以及游戏选关标题:

```html
<view class="container">
  <view class="title">游戏选关</view>
  <view class="levelBox">
    <view class="box">
      <image src="/images/pic01.jpg" />
      <text>第1关</text>
    </view>
  </view>
</view>
```

同时修改`index.wxss`页面，修改样式：

```css
.levelBox{
  width: 100%;
}
.box{
  width: 50%;
  float: left;
  margin: 25rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
image{
  width: 260rpx;
  height: 260rpx;
}
```

修改后的效果如图所示：

<img src="https://s2.loli.net/2023/08/29/nPhxiyA7ozb48gQ.png" alt="首页选关" style="zoom:67%;" />

##### 游戏页面设计

修改编译模式之后可以实现启动即显示新增的game页面。

在`game.wxml`页面新增组件用于显示提示图和新增画布组件用于显示图像作为游戏区域，添加按钮用于提供重新开始功能：

```html
<view class="container">
  <view class="title" >提示图</view>
  <image src="/images/pic01.jpg" />
  <canvas canvas-id="myCanvas"> </canvas>  
  <button type="warn">重新开始</button>
</view>
```

修改`game.wxss`页面，添加样式:

```css
image{
  width: 250rpx;
  height: 250rpx;
}
canvas{
  border: 1rpx solid;
  width: 300px;
  height: 300px;
}
```

修改后的显示效果如下所示：

<img src="https://s2.loli.net/2023/08/29/JUR4uI3FTtmsWg9.png" alt="添加画布" style="zoom:67%;" />

### 逻辑实现

#### 首页逻辑

##### 关卡列表展示

在`index.js`文件中添加游戏关卡对应的图片数据，便于后期调用:

```js
data: {
    levels:[
      'pic01.jpg',
      'pic02.jpg',
      'pic03.jpg',
      'pic04.jpg',
      'pic05.jpg',
      'pic06.jpg'
    ]
  },
```

之后为`<view>`组件添加for循环用于循环展示多个关卡的数据和图片，修改`index.wxml`的代码如下:

```html
<view class="container">
  <view class="title">游戏选关</view>
  <view class="levelBox">
    <view class="box" wx:for="{{levels}}" wx:key='index'>
      <image src="/images/{{item}}" />
      <text>第{{index+1}}关</text>
    </view>
  </view>
</view>
```

显示效果如图所示：

<img src="https://s2.loli.net/2023/08/29/wmB5OAMqrXHv7Qf.png" alt="首页关卡列表展示" style="zoom:67%;" />

##### 点击跳转游戏页面

首先为关卡列表项目添加点击事件,同时传递level信息以便于得知具体点击的关卡序号:

```html
<view class="container">
  <view class="title">游戏选关</view>
  <view class="levelBox">
    <view class="box" wx:for="{{levels}}" wx:key='index' bindtap='chooseLevel' data-level="{{item}}">
      <image src="/images/{{item}}" />
      <text>第{{index+1}}关</text>
    </view>
  </view>
</view>
```

在 `index.js`文件中添加`chooseLevel`函数的内容,用于再点击后导航到game页面同时传递点击的关卡信息:

```js
chooseLevel:function(e){
    let level = e.currentTarget.dataset.level
    wx.navigateTo({
      url: '../game/game?level=' + level,
    })
  },
```



#### 游戏页逻辑

##### 显示提示图

修改`game.js`页面添加代码用于更新该页面的图片url数据：

```js
  onLoad(options) {
    url = '/images/' + options.level
    this.setData({
      url: url
    })
  },
```

也需要修改`game.wxml`页面代码显示动态数据:

```html
<view class="container">
  <view class="title" >提示图</view>
  <image src="{{url}}" />
  <canvas canvas-id="myCanvas"> </canvas>  
  <button type="warn" >重新开始</button>
</view>
```

此时首页点击图片跳转已经可以正常显示对应的图片内容了:

<img src="https://s2.loli.net/2023/08/29/aZscNPkQHExUARK.png" alt="关卡点击跳转" style="zoom:50%;" /><img src="https://s2.loli.net/2023/08/29/2sZtAzUjHFrckMS.png" alt="跳转页面" style="zoom:50%;" />

##### 游戏逻辑实现

1. 准备工作。首先在`game.js`文件顶端新建一些变量用于记录游戏初始数据，添加的变量如下：
   ```js
   var num = [
     ['00', '01', '02'],
     ['10', '11', '12'],
     ['20', '21', '22']
   ];
   var w = 100;
   var url = '/images/pic01.jpg';
   ```

2. 初始化拼图画面。实现方法是每次随机交换空白方块与其相邻某一个方向的方块的位置，以实现随机打乱的效果，也同时保证了打乱之后可以按原路移回，从而保证有解，在`game.js`中添加代码如下：
   ```js
     shuffle: function () {
       num = [
         ['00', '01', '02'],
         ['10', '11', '12'],
         ['20', '21', '22']
       ];
       var row = 2;
       var col = 2;
       for (var i = 0; i < 100; i++) {
         var direction = Math.round(Math.random() * 3)
         if (direction == 0) {
           if (row != 0) {
             num[row][col] = num[row - 1][col]
             num[row - 1][col] = '22'
             row -= 1
           }
         } else if (direction == 1) {
           if (row != 2) {
             num[row][col] = num[row + 1][col]
             num[row + 1][col] = '22'
             row += 1
           }
         } else if (direction == 2) {
           if (col != 0) {
             num[row][col] = num[row][col - 1]
             num[row][col - 1] = '22'
             col -= 1
           }
         }else if(direction==3){
           if(col!=2){
             num[row][col] = num[row][col+1]
             num[row][col+1] = '22'
             col+=1
           }
         }
       }
     },
   ```

   该代码实现了随机进行100次的打乱。

   之后添加`dramCanvas`函数用于将打乱后的图片方块绘制到画布上:

   ```js
     drawCanvas: function () {
       let ctx = this.ctx
       ctx.clearRect(0, 0, 300, 300)
       for (var i = 0; i < 3; i++) {
         for (var j = 0; j < 3; j++) {
           if (num[i][j] != '22') {
             var row = parseInt(num[i][j] / 10)
             var col = num[i][j] % 10
             ctx.drawImage(url, col * w, row * w, w, w, j * w, i * w, w, w)
           }
         }
       }
       ctx.draw()
     },
   ```

   最后在`game.js`的`onLoad`函数调用刚刚自定义的两个函数，对应的js代码片段添加如下:

   ```js
   onLoad(options) {
       url = '/images/' + options.level
       this.setData({
         url: url
       })
       this.ctx = wx.createCanvasContext('myCanvas')
       this.shuffle()
       this.drawCanvas()
     },
   ```

   当前显示效果如图所示:

   <img src="https://s2.loli.net/2023/08/29/5Bqn34MsRIkGKvr.png" alt="图片打乱" style="zoom:67%;" />

3. 移动被点击的方块。修改`game.wxml`页面中的画布组件，为其绑定触摸事件。修改后的代码如下：
   ```html
   <canvas canvas-id="myCanvas" bindtouchstart = 'touchBox'> </canvas>  
   ```

   在`game.js`文件添加自定义函数touchBox，用于实现图片方块的移动，对应的代码片段添加如下:

   ```js
     touchBox:function(e){
       if(this.data.isWin){
         return
       }
   
       var x = e.changedTouches[0].x
       var y = e.changedTouches[0].y
   
       var row = parseInt(y/w)
       var col = parseInt(x/w)
   
       if(num[row][col]!='22'){
         this.moveBox(row,col)
         this.drawCanvas()
         if(this.isWin()){
           let ctx = this.ctx
           ctx.drawImage(url,0,0)
   
           ctx.setFillStyle('#e64340')
           ctx.setTextAlign('center')
           ctx.setFontSize(60)
           ctx.fillText('游戏成功',150,150)
           ctx.draw()
         }
       }
   
     },
   ```

   添加`moveBox`函数用于移动方块:

   ```js
     moveBox:function(i,j){
       if(i>0){
         if(num[i-1][j]=='22'){
           num[i-1][j] = num[i][j]
           num[i][j] = '22'
           return
         }
       }
   
       if(i<2){
         if(num[i+1][j]=='22'){
           num[i+1][j]=num[i][j]
           num[i][j] = '22'
           return
         }
       }
       if(j>0){
         if(num[i][j-1] == '22'){
           num[i][j-1]=num[i][j]
           num[i][j] = '22'
           return
         }
       }
   
       if(j<2){
         if(num[i][j+1]=='22'){
           num[i][j+1]=num[i][j]
           num[i][j]='22'
           return
         }
       }
     },
   ```

   添加后可以实现图块的移动效果:

   <img src="https://s2.loli.net/2023/08/29/j91ZWYuSrIh25aU.png" alt="方块点击前" style="zoom:50%;" /><img src="https://s2.loli.net/2023/08/29/p2JtFxRQAuVZKLy.png" alt="方块点击后" style="zoom:50%;" />

4. 判断游戏成功
   首先在`game.js`文件中的data中添加初始数据isWin,用于标记游戏成功与否。对应的JS代码片段添加如下:

   ```js
   data: {
       isWin:false
     },
   ```

   当`isWin`为false时表示游戏尚未成功，当成功时会重置为true。

   在`game.js`文件中添加自定义函数`isWin`，用于判断游戏是否已经成功：

   ```js
     isWin:function(){
       for(var i = 0;i<3;++i){
         for(var j = 0;j<3;++j){
           if(num[i][j]!= i*10+j){
             return false
           }
         }
       }
       this.setData({isWin:true})
       return true
     },
   ```

   然后修改`game.js`中的`touchBox`函数，在被触发时，追加对游戏成功状态的判断:

   ```js
     touchBox:function(e){
       if(this.data.isWin){
         return
       }
   
       var x = e.changedTouches[0].x
       var y = e.changedTouches[0].y
   
       var row = parseInt(y/w)
       var col = parseInt(x/w)
   
       if(num[row][col]!='22'){
         this.moveBox(row,col)
         this.drawCanvas()
         if(this.isWin()){
           let ctx = this.ctx
           ctx.drawImage(url,0,0)
   
           ctx.setFillStyle('#e64340')
           ctx.setTextAlign('center')
           ctx.setFontSize(60)
           ctx.fillText('游戏成功',150,150)
           ctx.draw()
         }
       }
     },
   ```

5. 重新开始游戏
   修改`game.wxml`代码，为重新开始按钮追加自定义函数的点击事件，`game.wxml`代码片段修改如下:

   ```html
   <view class="container">
     <view class="title" >提示图</view>
     <image src="{{url}}" />
     <canvas canvas-id="myCanvas" bindtouchstart = 'touchBox'> </canvas>  
     <button type="warn" bindtap="restartGame">重新开始</button>
   </view>
   ```

   同时在`game.js`文件中添加`restartGame`函数，用于重新开始游戏，对应的JS代码片段添加如下:

   ```js
     restartGame:function(){
       this.setData({isWin:false})
       this.shuffle()
       this.drawCanvas()
     },
   ```

   显示的游戏效果如下：

   <img src="https://s2.loli.net/2023/08/29/Bkj3hcQIv2DxP1V.png" alt="重新开始前" style="zoom: 67%;" />

   <img src="https://s2.loli.net/2023/08/29/OMTGC4VrBljeFXb.png" alt="游戏成功" style="zoom:67%;" />

## 三、程序运行结果

+ 游戏开始选关界面

  <img src="https://s2.loli.net/2023/08/30/gVcJEDBYoSeNiGw.png" alt="image-20230830160404165" style="zoom:67%;" />

+ 关卡游戏界面

<img src="https://s2.loli.net/2023/08/30/2T1FlzaGHRsijS7.png" alt="image-20230830160622720" style="zoom:67%;" />

+ 游戏成功界面
  <img src="https://s2.loli.net/2023/08/30/JXfWIMTg7D1dZjn.png" alt="image-20230830160821338" style="zoom:60%;" />

## 四、问题总结与体会

在本次实验中，需要用到画布组件进行图像绘制与图片操作等功能，但是由于微信接口更新，旧的api显示不再维护，但是又因为经验不足，对接口功能掌握不够透彻，更新接口时遇到了很多麻烦，导致画面始终无法加载。最后还是采用旧的接口才实现了预期的显示效果。

但也收获到了画布组件的大致用法以及结合自定义函数实现一些较为复杂的逻辑功能的方法。