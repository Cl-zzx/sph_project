<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle'
export default {
    name: 'Carousel',
    props: ['list'],
    watch: {
        list: {
            // 立即监听：不过数据有没有变化，上来就监听一次
            immediate: true,
            // 为什么watch监听不到floor？因为这个数据从来没有发生变化（数据是父组件给的，父组件给的时候就是一个对象，对象里面的数据都是有的）
            handler() {
                // console.log('我监听到了floor');
                // 只能监听到了数据已经有了，但是v-for动态渲染结构我们还是没办法确认的，因此还是需要使用$nextTick
                this.$nextTick(() => {
                    // 第一次书写Swiper（ListContainer）的时候：在mounted中书写是不可以的，但是为什么这里是可以的？
                    // 第一次书写轮播图的时候，是在组件内部发送请求，动态渲染结构【前台至少服务器数据需要回来】
                    let mySwiper = new Swiper(this.$refs.mySwiper, {
                        autoplay: {
                            delay: 1500
                        },
                        loop: true,
                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                    });
                });
            }
        }
    },
}
</script>

<style>
</style>