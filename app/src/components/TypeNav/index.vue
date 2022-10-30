<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 事件的委派 -->
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 利用事件委派+编程式导航实现路由跳转与传递参数 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                </h3>
                                <!-- 二级、三级分类 -->
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c1.categoryName"
                                                    :data-category2Id="c1.categoryId">{{
                                                     c2.categoryName  }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{
                                                         c3.categoryName  }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// 这种方式会引入lodash中全部的功能函数
// import _ from 'lodash'
// console.log(_);

// 最好的引入方式，按需引入
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data() {
        return {
            // 存储用户鼠标移入哪一个一级分类
            currentIndex: -1,
            // 用于控制三级联动菜单的显示与隐藏
            show: true,
        }
    },
    methods: {
        // 鼠标进入修改响应式数据currentIndex
        // 节流模式，防止用户操作过快
        // throttle回调函数别用箭头函数，可能会出现上下文this问题
        changeIndex: throttle(function (index) {
            // index:鼠标移入某一个一级分类的元素的索引值
            // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
            // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
            // 就是由于用户操作过快，导致浏览器反应不过来，如果当前的回调函数中有大量的业务，有可能出现卡顿现象
            this.currentIndex = index
        }, 50),
        // 一级分类鼠标移除的分类
        leaveIndex() {
            this.currentIndex = -1
            if (this.$route.path !== '/home') {
                this.show = false
            }
        },
        enterShow() {
            if (this.$route.path !== '/home') {
                this.show = true
            }
        },
        goSearch(event) {
            // 最好的解决方案：编程式导航+事件委派
            // 利用事件委派存在的问题：1.事件委派，是把全部子节点【h3、dt、dl、em】的事件委派给父亲节点，如何知道点击的元素一定是a标签？2.即使能确定点击的是a标签，如何区分是一级、二级还是三级分类标签？如何获取参数【1、2、3级分类的产品的名字和ID】

            // 第一个问题：把子节点当中的a标签，加上自定义属性data-categoryName，其余的子节点是没有的
            let element = event.target
            // 获取到当前触发这个事件的节点，需要带有data-categoryName的才是a标签
            // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } = element.dataset
            // 如果身上有categoryname则一定是a标签
            if (categoryname) {
                // 整理路由跳转需要的参数
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                // 一级分类、二级分类、三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }

                // 整理完参数
                location.query = query
                // console.log(location);
                if (this.$route.params) {
                    location.params = this.$route.params
                }
                // 路由跳转
                this.$router.push(location)
            }
        }
    },
    // 组件挂载完毕，可以向服务器发送请求
    mounted() {
        // 通知vuex发请求，获取数据，存储于仓库中
        // this.$store.dispatch('categoryList')  //放在App根组件中发送请求，只需要发送一次
        if (this.$route.path !== '/home') {
            this.show = false
        }
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            // 注入一个参数state，其实即为大仓库中的数据
            categoryList: (state) => {
                return state.home.categoryList
            }
        })
    }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }

        // 过渡动画的样式
        // 过渡动画开始状态（进入）
        .sort-enter {
            height: 0px;

        }

        // 过渡动画结束状态
        .sort-enter-to {
            height: 461px;

        }

        // 定义动画的时间、速率
        .sort-enter-active {
            transition: all 0.5s linear;
        }
    }
}
</style>