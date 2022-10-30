复习：
昨天：支付（elementui+qrcode） + 个人中心（二级路由）

1.个人中心完成
面试的时候：是否封装过组件：分页器、日历
个人中心当中：分页器


2.全局守卫
未登录访问，交易相关（trade）、支付相关（pay、paysuccess）、用户中心（center）相关，都会跳转到登录页

3.路由独享守卫
只有从购物车界面才能跳转到交易页面（创建订单）
只有从交易页面（创建订单）才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面

4.图片懒加载
https://www.npmjs.com/package/vue-lazyload

自定义插件

5.vee-validate基本使用

第一步：插件安装与引入
npm i vee-validate@2 --save 安装2版本的

import VeeValidate from 'vee-validata'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

第二步：提示信息
VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field)=>`${field}必须与密码相同` //修改内置规则的message,让确认密码与密码相同
    },
    attributes:{ //给校验的field属性名映射中文名称
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        isCheck:'协议'
    }
})

第三步：基本使用
<input type="text" placeholder="请输入你的手机号" v-model="phone" name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }" :class="{invalid:errors.has('phone')}">


<span class="error-msg">{{errors.first("phone")}}</span>

const success = await this.$validator.validateAll(); //全部表单验证


6.路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

7.打包上线
7.1npm run build

项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误无法准确得知是哪里的代码报错
有了map就可以像未加密的代码一样，准确地输出是哪一行有错
所以该文件如果项目不需要是可以去除掉的
vue.config.js配置
productionSourceMap:false


7.2购买云服务器
1.阿里云 腾讯云等
2.设置安全组，让服务器一些端口号打开
3.利用xshell工具登录服务器

linux： / 根目录
linux常用指令：cd 跳转目录    ls 查看    mkdir创建目录     pwd查看绝对路径

7.3nginx？
1.为什么访问服务器IP地址就可以访问到咱们的项目？ ---配置一些东西
http://82.156.11.187/
刚刚在服务器上 创建了文件夹 root/jch/www/shangpinhui/dist

2.项目的数据来自于http://39.98.123.211

nginx配置：
1.xshell进入根目录 /etc
2.进入etc目录，这个目录下有一个nginx目录，进入到这个目录【已经安装过nginx，如果没有安装过，只有四五个文件】
3.如果想安装nginx:yum install nginx
4.安装完nginx服务器之后，你会发现nginx目录下多了一个nginx.conf文件，在这个文件中进行配置
5.vim nginx.conf进行编辑，主要添加如下两项
解决第一个问题：
location / {
    root    /root/jch/www/shangpinhui/dist;
    index   index.html;
    try_files $uri $uri/  /index/html;
}
解决第二个问题
location /api{
    proxy_pass http://39.98.123.211;
}

6.nginx服务器跑起来
service nginx start