1.编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？
--路由跳转有两种形式：声明式导航、编程式导航
--声明式导航没有这类问题，因为vue-router底层已经处理好了
1.1为什么编程式路由导航进行路由跳转的时候，就有这种警告呢？
vue-router引入了promise
1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前的错误，可以解决
1.3通过底部的代码，可以实现解决错误
this.$router.push({name: 'search',query: {k: this.keyword.toUpperCase()},params: {keyword: this.keyword}},()=>{},()=>{});
这种写法：治标不治本，将来在别的组件中使用push|replace，编程式导航还是有类似的错误

1.4
this：当前组件实例（search）
this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加了$router和$router属性
push():VueRouter类的原型对象的一个方法


2.三级联动组件完成
---由于三级联动，在Home、Search、Detail出现，把三级联动注册为全局组件
好处：只需要注册一次，就可以在项目的任意地方使用


3.完成其余静态组件
HTML+CSS+图片资源 --- 信息【结构、样式、图片资源缺一不可】

4.postman测试接口
--经过postman测试，接口是没有问题的，
--如果服务器返回的数据code字段是200，代表服务器返回数据成功
--整个项目，接口前缀都有/api字样


5.axios二次封装
XMLHttpRequest、fetch、JQ、axios二次封装
5.1为什么需要对axios进行二次封装？
请求拦截器、响应拦截器：请求拦截器，可以在发送请求之前处理一些业务，响应拦截器，当服务器数据返回以后，可以处理一些事情

5.2在项目当中，经常会出现API文件夹【axios请求相关】

5.3有点同学基础不好，可以参考git|npm关于axios的文档

6.接口统一管理
项目很小：完全可以在组件的生命周期函数中发请求
项目很大：axios.get('xxx')

7.1跨域问题
什么是跨域问题：协议、域名、端口号不同请求，称之为跨域
http://localhost:8080/#/home ---前端项目本地服务器
http://gmall-h5-api.atguigu.cn ---后台服务器

JSONP,CROS,代理


8.nprogress进度条的使用
start:进度条开始
done:进度条结束
进度条的颜色是可以修改的，需要修改对应的样式

9.vuex状态管理库
9.1vuex是什么？
vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据

切记：并不是全部的项目都需要vuex，如果项目很小，完全不需要Vuex，如果项目很大，组件很多、数据很多，数据维护很费劲，可以使用vuex
state
mutations
actions
getters
modules

9.2vuex的基本使用

9.3vuex实现模块式开发，组件过多，接口也很多，数据也很多，可以让vuex实现模块式开发
模拟state存储数据
{
    count:1
    search:{a:1}
    home:{b:2}
    pay:{}
}

{
    modules:{
        home,
        search,
        pay
    }
}


10.完成TypeNav三级联动展示数据业务