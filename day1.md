1.vue-cli脚手架初始化项目
node + webpack + 淘宝镜像

node_modules文件夹：项目依赖文件夹

public文件夹：一般放置一些静态资源（图片），需要注意：放在public文件夹中的静态资源，webpack进行打包的时候，会原封不动的打包到dist文件夹中

src文件夹（程序员代码文件夹）

    assets文件夹：一般也是放置静态资源（一般放置多个组件共用的静态资源），需要注意，放置在assets文件夹中的静态资源，在webpack打包的时候，webpack会把静态资源当作一个模块，打包在JS文件里面

    components文件夹 ：一般放置的是非路由组件（全局组件）

    App.vue：唯一的根组件，Vue当中的组件（.vue）
    main.js：程序入口文件，也是整个程序当中最先执行的文件

babel.config.js:配置文件（babel相关）

package.json文件：可以认为是项目的“身份证”，记录项目叫做什么、项目中有哪些依赖、项目怎么运行

package-lock.json：缓存性文件

README.md:说明性文件



2.项目的其他配置

2.1项目运行起来的时候，让浏览器自动打开
  --package.json文件做如下设置
  "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },

2.2eslint校验功能关闭
--在根目录下，创建一个vue.config.js文件
// 关闭eslint
  lintOnSave: false,

比如：声明变量但是没有使用eslint校验工具报错

2.3src文件夹目录的简写方式，配置别名
jsconfig.json配置别名@提示 【@符号代表的是src文件夹，这样将来文件过多，找的时候方便很多】
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
  "exclude": ["node_modules","dist"]
}



3.项目路由的分析
vue-router
前端所谓的路由：KV键值对
key：URL（地址栏中的路径）
value:相应的路由组件

路由组件：
Home首页路由组件、Search路由组件、Login登录路由组件、Register注册路由组件
非路由组件：
Header【首页、搜索页、登录、注册页面均有】
Footer组件【在首页、搜索页】，但是在登录、注册页面没有


4.完成非路由组件Header与Footer业务
项目开发中，不再以HTML+CSS为主，主要搞业务、逻辑
在开发项目的时候：
1.书写静态页面（HTML+CSS）
2.拆分组件
3.获取服务器的数据动态展示
4.完成相应的动态业务逻辑

注意1：创建组件的时候，组件结构+组件样式+图片资源
注意2：项目中采用的是less样式，浏览器不识别less样式，需要通过less、less-loader(安装版本5)进行处理less，把less样式编委css样式，浏览器才可以识别
注意3：如果想让组件识别less样式，需要在style标签上加上 lang=less

4.1使用组件的步骤（非路由组件）
-创建或者定义组件
-引入
-注册
-使用


5.路由组件的搭建
在上面分析的时候，路由组件应该有4个：Home、Search、Login、Register
-componentes文件夹：经常放置的非路由组件（全局共用组件）
-pages|views文件夹：经常放置路由组件

5.1配置路由
项目当中配置的路由一般放在router文件夹中

5.2总结
路由组件和非路由组件的区别？
1.路由组件一般放置在pages|views文件夹中，非路由组件一般放置在components组件中
2.路由组件一般需要在router文件夹中进行注册（使用的是组件的名字），非路由组件的名字在使用的时候，一般都是以标签的形式使用
3.注册完路由，不管路由组件还是非路由组件，身上都有$router和$router属性

$route:一般获取路由信息【路径、query参数、params参数】
$router：一般进行编程式导航进行路由跳转【push|replace】

5.3路由的跳转？
路由的跳转有两种形式：
声明式导肮router-link,可以进行路由的跳转
编程式导航push|replace,可以进行路由的跳转

编程式导航：声明式导航能做的，编程式导航都能做
但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑

6.Footer组件的显示与隐藏
显示或隐藏组件 v-show|v-if
Footer组件：在Home、Search显示Footer组件
Footer组件：在登录、注册的时候显隐藏

6.1我们可以根据组件身上的$router获取当前路由的信息，通过路由路径判断Footer显示与隐藏
6.2配置路由的时候，可以给路由添加路由元信息【meta】，路由需要配置对象，它的key不能瞎写


7.路由传参
7.1：路由传参有几种方式
比如A->B
声明式导航：router-link(务必要有to属性)，可以实现路由的跳转
编程式导航：利用的是组件实例的$router.push|replace方法，可以实现路由的跳转（可以书写一些自己的业务）

7.2：路由传参，参数有几种写法？
params参数：参数属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
query参数：参数不属于路径当中的一部分，类似于ajax中的queryString /home?k=v&k=v,不需要占位

8.路由传参相关【面试题】
1.路由传递参数（对象写法）path是否可以结合params参数一起使用

2.如何指定params参数可传可不传
比如：配置路由的时候，占位了（params参数），但是路由跳转的时候不传递
路径会出现问题
http://localhost:8080/#/?k=qwe

3.params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？

4.路由组件能不能传递props数据？
答：可以，且有三种写法，Vue基础课中讲到过