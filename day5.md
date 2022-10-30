复习：
1、完成商品分类的三级列表路由跳转以及路由传参（合并参数）
2、完成search模块中对于typeNav的使用（过渡动画）
3、对于typeNav的请求次数也进行了优化
4、swiper插件
swiper插件:经常制作轮播图（移动端|PC端都可以使用）
使用步骤：
第一步：引入响相应依赖包（swiper.js|swiper.css）
第二步：页面中的结构务必要有
第三步：初始化swiper实例，给轮播图添加动态效果
5、mock数据，通过mockjs模块实现的

1.最完美的解决方案，解决轮播图的问题
watch + nextTick:数据监视：监听已有数据变化
$nextTick:在下次DOM更新 循环结束之后 执行延迟回调，在 修改数据之后 立即使用这个方法，获取更新后的DOM
$nextTick:可以保证页面中的结构是一定有的，经常和很多插件一起使用【因为很多插件都需要DOM存在才能进行操作】


2.开发Floor组件
切记：仓库当中的state的数据格式：别瞎写、乱写，数据格式取决于服务器返回的数据
2.1getFloorList这个action在哪里触发，是需要在Home路由组件当中触发，不能在Floor组件内部触发action，因为我们需要v-for遍历产生Floor组件

2.2v-for也可以在自定义组件中使用

2.3组件通信的方式有哪些？（面试频率极高）
props：用于父子组件通信的
自定义事件：$on $emit 可以实现子给父通信
全局事件总线：$bus 全能
pubsub.js:vue当中几乎不用 全能
插槽
vuex

3.把首页中的轮播图拆分为一个共用的全局组件
切记：以后开发项目的时候，如果看到某一个组件在很多地方都使用，把它变成全局组件，注册一次，可以在任何地方使用，共用的组件|非路由组件放到components文件夹中

4.search模块开发
1.先静态页面+静态组件拆分出来
2.发请求（API）
3.vuex（三连环）
4.组件获取仓库数据，动态展示数据