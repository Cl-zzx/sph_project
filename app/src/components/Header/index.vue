<template>
    <!-- 顶部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!userName">
                        <span>请</span>
                        <!-- <a href="###">登录</a> -->
                        <!-- 声明式导航务必要加上to属性 -->
                        <router-link to="/login">登录</router-link>
                        <!-- <a href="###" class="register">免费注册</a> -->
                        <router-link class="register" to="/register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <a>{{  userName  }}</a>
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myorder">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
                    <img src="./images/logo.png" alt="">
                </a> -->
                <router-link to="/home" class="logo">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            keyword: ''
        }
    },
    mounted() {
        this.$bus.$on('clear', () => {
            this.keyword = ''
        })
    },
    methods: {
        // 搜索按钮的回调函数，需要向search路由进行跳转
        goSearch() {
            // 路由传递参数
            // 第一种：字符串形式
            // this.$router.push('/search/' + this.keyword + '?k='+this.keyword.toUpperCase())
            // 第二种：模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            // 第三种：对象写法
            let location = {
                // path: '/search',
                // 当需要给路由传递params参数时，不能使用path，需要使用命名路由
                name: 'search',
                params: {
                    keyword: this.keyword || undefined
                }
            }
            if (this.$route.query) {
                location.query = this.$route.query
            }
            this.$router.push(location)

            // 面试题1：路由传递参数（对象写法）path是否可以和params参数一起使用？
            // 答：路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用

            // 面试题2：如何指定params参数可传可不传?
            // 如果路由要求传递params参数，但是没有传递，发现一件事情，URL会有问题
            // 如何指定params参数可以传递可以不传递，在配置路由的时候，在占位的后面加上一个问号【params可传可不传】

            // 面试题3：params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？
            // 使用undefined解决：params参数可传可不传（空字符串）
            // this.$router.push({ name: 'search', params: { keyword: '' || undefined }, query: { k: this.keyword.toUpperCase() } })


        },
        // 退出登录
        async logout() {
            // 退出登录需要做的事情
            // 1.需要发请求，通知服务器退出登录【清除token】
            // 2.清除项目当中的数据【userInfo、token】
            try {
                await this.$store.dispatch('userLogout')
                this.$router.push('/home')
            } catch (error) {
                alert(error.message)
            }
        }
    },
    computed: {
        userName() {
            return this.$store.state.User.userInfo.name
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>