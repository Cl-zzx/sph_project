复习：
1.商品分类的三级列表由静态变为动态形式【获取服务器数据：解决跨域问题】
2.函数防抖与节流【面试频率很高】
3.路由跳转：声明式导航（router-link）、编程式导航
编程式导航解决这个问题：自定义属性

1.开打Search模块中的typeNav商品分类菜单（过渡动画效果）
过渡动画：前提是组件|元素务必要有v-if|v-show指令才可以进行过渡动画

2.现在商品分类三级列表可以进行优化
在App根组件中发送一次请求获取商品分类列表数据，而不是在每次路由切换的时候都发送请求

3.合并params和query参数

4.开发首页中ListContainer组件与Floor组件
但是这里需要知道一件事情，服务器返回的数据（接口）只有商品分类菜单的数据，对于ListContainer组件与Floor组件服务器没有提供
mock数据（模拟）：如果你想mock数据。需要用到一个插件mockjs
使用的步骤：
1).在项目当中src文件夹中创建mock文件夹
2).第二步准备JSON数据（mock文件夹中创建相应的JSON文件）---格式化一下，别留空格（不然项目跑不起来）
3).把mock数据需要的图片放到publick文件夹中，【public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中】
4).创建mockServer.js,通过mockjs插件实现模拟数据
5).把mockServe.js文件在入口文件中引入（至少需要执行一次，才能模拟数据）


5.ListContainer组件开发的重点
安装Swiper插件：最新版本是6，这里需要安装5版本
npm install --save swiper@5