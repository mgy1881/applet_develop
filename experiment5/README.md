# 2022年夏季《移动软件开发》实验报告

|                      |                                  |
| -------------------- | -------------------------------- |
| 本实验属于哪门课程？ | 中国海洋大学22夏《移动软件开发》 |
| 实验名称？           | 实验5：高校新闻网                |

## **一、实验目标**

1、综合所学知识创建完整的前端新闻小程序项目；能够在开发过程中熟练掌握真机预览、调试等操作。



## 二、实验步骤

### 项目创建

新建微信小程序，删除原有配置，新增`detail`和`my`两个页面，新增`images`和`utils`文件夹分别用于存放图片资源和公共JS文件。

全部完成后的目录结构如下:

<img src="https://s2.loli.net/2023/09/04/cg2EYRwvFWSIArV.png" alt="项目目录结构" style="zoom:50%;" />

### 视图设计

#### 1. 导航栏设计

修改`app.json`文件来自定义导航栏效果，分别修改了导航栏的颜色，标题以及标题颜色:

```json
"window":{
    "navigationBarBackgroundColor": "#328EEB",
    "navigationBarTitleText": "我的新闻网",
    "navigationBarTextStyle":"white"
  },
```

修改后的显示效果如下:

<img src="https://s2.loli.net/2023/09/04/WPNmSqulbz58H1k.png" alt="导航栏设计" style="zoom:67%;" />

#### 2. tabBar设计

在`app.json`中添加代码以启用tabBar，同时引用`images`中的图片素材修改未选中和选中时的样式：

```json
"tabBar": {
    "color": "#000",
    "selectedColor": "#328EEB",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "images/index.png",
        "selectedIconPath": "images/index_blue.png",
        "text": "首页"
      },{
        "pagePath": "pages/my/my",
        "iconPath": "images/my.png",
        "selectedIconPath": "images/my_blue.png",
        "text": "我的"
      }
    ]
  }
```

修改后的显示效果如下:

<img src="https://s2.loli.net/2023/09/04/QpFfrdl8goVk9G5.png" alt="tabBar完成" style="zoom:67%;" />

#### 3. 页面设计

##### 首页设计

首页需要两部分内容，一部分为幻灯片滚动另一部分为新闻列表。

在`index.wxml`中添加代码如下:

```html
<swiper indicator-dots="true" autoplay="true" interval="5000" duration="500">
</swiper>
<view id='news-list'>
 这是新闻列表
</view>
```

之后为组件添加`wx:for`属性循环显示多条内容:

```html
<swiper indicator-dots="true" autoplay="true" interval="5000" duration="500">
  <block wx:for="{{swiperImg}}" wx:key="index">
    <swiper-item>
      <image src="{{item.src}}" class="slide-image"/>
    </swiper-item>
  </block>
</swiper>

<view id='news-list'>
  <view class="list-item" wx:for="{{newsList}}" wx:for-item="news" wx:key="id">
    <image src="{{news.poster}}"/>
    <text >{{news.title}}--{{news.add_date}}</text>
  </view>  
</view>
```

同时修改`index.wxss`页面定义样式:

```css
swiper{
  height: 400rpx;
}
swiper image{
  width: 100%;
  height: 100%;
}
```

由于其中部分样式需要重复利用，故将其直接写在`app.wxss`中作为全局样式，需要作为全局样式的内容如下：

```css
#news-list{
  min-height: 600rpx;
  padding: 15rpx;
}

.list-item{
  display: flex;
  flex-direction: row;
  border-bottom: 1rpx solid gray;
}

.list-item image{
  width: 230rpx;
  height: 150rpx;
  margin: 10rpx;
}

.list-item text{
  width: 100%;
  line-height: 60rpx;
  font-size: 10pt;
}
```

在`index.js`中添加临时数据后的显示效果如下:

<img src="https://s2.loli.net/2023/09/04/d2NmvZD9lXYH56x.png" alt="首页设计" style="zoom:67%;" />

##### 个人中心页设计

修改`my.wxml`页面添加代码如下:

```html
<!--pages/my/my.wxml-->
<view id='myLogin'>
  <block>
    <image src="{{src}}" id='myIcon' />
    <text id='nickeName'>{{nickName}}</text>
  </block>
</view>
<view id='myFavorites'>
  <text>我的收藏({{num}})</text>
  <view id='news-list'>
    <view class="list-item" wx:for="{{newsList}}" wx:for-item="news" wx:key="id">
      <image src="{{news.poster}}"/>
        <text>{{news.title}}--{{news.add_date}}</text>
    </view>
  </view>
</view>
```

修改对应的WXSS页面代码如下:

```css
#myLogin{
  background-color: #328EEB;
  height: 400rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

#myIcon{
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
}
#nickName{
  color:white;
}
#myFavourites{
  padding: 20rpx;
}
```

同时由于之前已经在`app.wxss`中定义了全局样式，故新闻列表的样式无需重新定义，此时的显示效果如下:

<img src="https://s2.loli.net/2023/09/04/el2pzJOD1SXyMkY.png" alt="个人中心页设计" style="zoom:67%;" />

##### 新闻页设计

新闻页面用于展示新闻的详细内容，在没有实现跳转之前可以自定义编译模式展示`detail`页面。

在`detail.wxml`中添加代码如下:

```html
<view class="container">
  <view class="title">{{article.title}}</view>
  <view class="poster">
    <image src="{{article.poster}}" mode="widthFix"/>
  </view>
  <view class="content">{{article.content}}</view>
  <view class="add_date">时间：{{article.add_date}}</view>
</view>

```

同时在`detail.wxss`中添加代码如下:

```css
.container{
  padding: 15rpx;
  text-align: center;
}
.title{
  font-size: 14pt;
  line-height: 80rpx;
}
.poster image{
  width: 100%;
}
.content{
  text-align: left;
  font-size: 12pt;
  line-height: 60rpx;
}
.add_date{
  font-size: 12pt;
  text-align: right;
  line-height: 30rpx;
  margin-right: 25rpx;
  margin-top: 20rpx;
}
```

添加临时数据后的显示效果如下:

<img src="https://s2.loli.net/2023/09/04/retHmUfdXTvk4yn.png" alt="新闻页显示" style="zoom:67%;" />

### 逻辑实现

#### 1. 公共逻辑

引入老师提供的`common.js`文件即可。

#### 2. 首页逻辑

##### 新闻列表展示

在`index.js`中添加代码实现主页新闻列表展示:

```js
 onLoad: function (options) {
      let list = common.getNewsList()
      this.setData({newsList:list})
  },
```

添加后的效果如下:

<img src="https://s2.loli.net/2023/09/04/C3zyJLFvEsYhWtB.png" alt="首页新闻列表展示" style="zoom:67%;" />

##### 点击跳转新闻内容

在`index.wxml`中修改代码如下:

```html
<view id='news-list'>
  <view class="list-item" wx:for="{{newsList}}" wx:for-item="news" wx:key="id">
    <image src="{{news.poster}}"/>
    <text bindtap='goToDetail' data-id='{{news.id}}'>{{news.title}}--{{news.add_date}}</text>
  </view>  
</view>
```

然后在`index.js`中添加绑定事件：

```js
 goToDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../detail/detail?id='+id
    })
  },
```

#### 3. 新闻页逻辑

##### 显示对应新闻

在`detail.js`中接收传递的参数：

```js
onLoad(options) {
    let id = options.id
    let result = common.getNewsDetail(id)
    if (result.code == '200') {
        this.setData({
            article: result.news,
        })
    }
   }
```

此时的显示效果如下:

<img src="https://s2.loli.net/2023/09/04/C3zyJLFvEsYhWtB.png" alt="首页新闻列表展示" style="zoom:50%;" /><img src="https://s2.loli.net/2023/09/04/atFLxnEjiv1W2gP.png" alt="显示对应新闻" style="zoom:50%;margin-left=10px" />

##### 添加/取消新闻收藏

修改`detail.wxml`代码,添加如下两个组件:

```html
<button wx:if="{{isAdd}}" plain bindtap='cancelFavorites'>已收藏</button>
<button wx:else plain bindtap='addFavorites'>点击收藏</button>
```

修改WXSS代码如下:

```css
button{
  width: 250rpx;
  height: 100rpx;
  margin:20rpx auto;
}
```

同时也需要修改`detail.js`中的onLoad代码：

```js
onLoad(options) {
    let id = options.id
    var article = wx.getStorageSync(id)
    if (article != '') {
      this.setData({
        article,
        isAdd: true
      })
    } else {
      let result = common.getNewsDetail(id)
      if (result.code == '200') {
        this.setData({
          article: result.news,
          isAdd: false
        })
      }
    }
  },
```

继续追加函数实现点击添加/取消新闻收藏:

```js
addFavorites: function (options) {
    let article = this.data.article;
    wx.setStorageSync(article.id, article);
    this.setData({
      isAdd: true
    })
  },
  cancelFavorites: function () {
    let article = this.data.article;
    wx.removeStorageSync(article.id);
    this.setData({
      isAdd: false
    });
  },
```

显示效果如下:

+ 未收藏新闻
  <img src="https://s2.loli.net/2023/09/04/uVnhFMQe7CD3Td6.png" alt="未收藏新闻" style="zoom: 50%;" />

  <img src="https://s2.loli.net/2023/09/04/JLAOHG1EoT7yagD.png" alt="无本地缓存" style="zoom:50%;" />

+ 收藏新闻后
  <img src="https://s2.loli.net/2023/09/04/mED1kdgcRo6Luvl.png" alt="收藏新闻" style="zoom: 50%;" />
  <img src="https://s2.loli.net/2023/09/04/ZvnsucXFa3iGeoH.png" alt="添加本地缓存" style="zoom: 67%;" />

#### 个人中心页逻辑

##### 获取微信用户信息

在`my.wxml`中添加组件用于显示登录按钮：

```html
<view id='myLogin'>
  <block wx:if="{{isLogin}}">
    <image src="{{src}}" id='myIcon' />
    <text id='nickeName'>{{nickName}}</text>
  </block>
  <button wx:else  bindtap="getMyInfo">未登录，点此登录</button>
</view>
```

此时显示效果如下:

<img src="https://s2.loli.net/2023/09/04/b3CPjsNtQAHJzIg.png" alt="未登录状态" style="zoom:50%;" />

在`my.js`中完善获取用户信息的函数:

```js
 getMyInfo:function(e){
    wx.getUserProfile({
      desc: '获取信息',
      success:res=>{
        let info = res.userInfo;
        this.setData({
          isLogin:true,
          src:info.avatarUrl,
          nickName:info.nickName
        });
        this.getMyFavorites();
      }
    })
  },
```

此时已经可以正常登录，登录后的效果如下:

<img src="https://s2.loli.net/2023/09/04/LFlVEWX2f4rTADd.png" alt="登录状态" style="zoom:50%;" />

##### 获取收藏列表

修改`my.wxml`：

```html
<text>我的收藏({{num}})</text>
```

在`detail.js`中的data中添加`num`属性，并设置默认值为0，追加`getMyFavorites`函数用于动态展示收藏列表:

```js
getMyFavorites:function(){
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;

    let myList = [];
    for(var i = 0;i<num;i++){
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);
    }
    this.setData({
      newsList:myList,
      num
    });
  },
```

同时在获取用户信息的函数中调用获取收藏列表的函数，修改`onShow`函数：

```js
onShow() {
    if(this.data.isLogin){
      this.getMyFavorites()
    }
  },
```

<img src="https://s2.loli.net/2023/09/04/x1z2kwaCsAG3yti.png" alt="我的收藏" style="zoom:67%;" />

##### 浏览收藏的新闻

修改`my.wxml`代码：

```html
<text bindtap='goToDetail' data-id="{{news.id}}">{{news.title}}--{{news.add_date}}</text>
```

绑定回调函数，并在`my.js`中添加`goToDetail`函数的内容：

```js
goToDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
 },
```

运行效果如图所示:

<img src="https://s2.loli.net/2023/09/04/x1z2kwaCsAG3yti.png" alt="我的收藏" style="zoom:50%;" /><img src="https://s2.loli.net/2023/09/04/gt2LhWJdK68IRNX.png" alt="浏览已收藏新闻" style="zoom:50%;margin-left:50px;" />





## 三、程序运行结果

+ 首页

  <img src="https://s2.loli.net/2023/09/04/4ygjNSBHvIcXnls.png" alt="image-20230904164931974" style="zoom:60%;" />

+ 新闻详情
  <img src="https://s2.loli.net/2023/09/04/95CFGZOgfpoWjTn.png" alt="image-20230904165009036" style="zoom:67%;" />

+ 收藏新闻
  <img src="https://s2.loli.net/2023/09/04/Goq8WiE3xkbhCUd.png" alt="image-20230904165034556" style="zoom:67%;" />

+ 我的页面

  <img src="https://s2.loli.net/2023/09/04/xb6PVUnTEvKw1rX.png" alt="image-20230904165111116" style="zoom:67%;" />

+ 登录之后
  <img src="https://s2.loli.net/2023/09/04/yEKSVIpgtzW48QZ.png" alt="image-20230904165148399" align="middle" style="zoom:67%;" />



## 四、问题总结与体会

通过本次实验，我了解了数据本地存储的方法，利用`wx.setStorageSync()`函数可以将数据以唯一key存储到本地，而`wx.getStorageSync('key')`可以查找本地存储的对应key的数据。通过本次实验我也学会了利用js文件存储模拟数据并对外暴露接口供其他程序调用。