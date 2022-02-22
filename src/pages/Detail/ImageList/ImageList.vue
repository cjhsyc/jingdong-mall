<template>
    <div class="swiper-container" ref="imageList">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in skuImageList" :key="item.id" @click="changeCurrentIndex(index)">
                <img :src="item.imgUrl" :class="{active:currentIndex===index}">
            </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
    name: "ImageList",
    props: ['skuImageList'],
    data() {
        return {
            currentIndex: 0
        }
    },
    watch: {
        skuImageList() {
            this.$nextTick(() => {
                new Swiper(this.$refs.imageList, {
                    slidesPerView: 3,//同时显示的slide的数量
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
            })
        }
    },
    methods: {
        changeCurrentIndex(index) {
            this.currentIndex = index
            this.$bus.$emit('getIndex',index)
        }
    }
}
</script>

<style lang="less" scoped>
.swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
        width: 56px;
        height: 56px;

        img {
            border: 1px solid #ccc;
            padding: 2px;
            width: 50px;
            height: 50px;
            display: block;

            &.active {
                border: 2px solid #f60;
                padding: 1px;
            }

            &:hover {
                border: 2px solid #f60;
                padding: 1px;
            }
        }
    }

    .swiper-button-next {
        left: auto;
        right: 0;
    }

    .swiper-button-prev {
        left: 0;
        right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
        box-sizing: border-box;
        width: 12px;
        height: 56px;
        background: rgb(235, 235, 235);
        border: 1px solid rgb(204, 204, 204);
        top: 0;
        margin-top: 0;

        &::after {
            font-size: 12px;
        }
    }
}
</style>