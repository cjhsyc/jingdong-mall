<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <h2 class="all" @mouseenter="show=true" @mouseleave="leaveShow">全部商品分类</h2>
            <nav class="nav">
                <a href="#">服装城</a>
                <a href="#">美妆馆</a>
                <a href="#">尚品汇超市</a>
                <a href="#">全球购</a>
                <a href="#">闪购</a>
                <a href="#">团购</a>
                <a href="#">有趣</a>
                <a href="#">秒杀</a>
            </nav>
            <div class="sort" v-show="show" @mouseenter="show=true" @mouseleave="leaveShow">
                <div class="all-sort-list2" @click="toSearch">
                    <div class="item" v-for="item in categoryList" :key="item.categoryId">
                        <h3>
                            <a :data-categoryName="item.categoryName"
                               :data-categoryId1="item.categoryId">{{ item.categoryName }}</a>
                        </h3>
                        <div class="item-list clearfix">
                            <div class="subitem" v-for="subitem in item.categoryChild" :key="subitem.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-categoryName="subitem.categoryName"
                                           :data-categoryId2="subitem.categoryId">{{ subitem.categoryName }}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="em in subitem.categoryChild" :key="em.categoryId">
                                            <a :data-categoryName="em.categoryName"
                                               :data-categoryId3="em.categoryId">{{ em.categoryName }}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'TypeNav',
    mounted() {
        if (this.$route.path !== '/home') {//不在home首页就隐藏
            this.show = false
        }
    },
    data() {
        return {
            show: true
        }
    },
    computed: {
        ...mapState({
            categoryList(state) {
                return state.home.categoryList
            }
        })
    },
    methods: {
        toSearch(event) {
            const {categoryname, categoryid1, categoryid2, categoryid3} = event.target.dataset
            console.log(event.target.dataset)
            if (categoryname) {
                const location = {name: 'search'}
                const query = {categoryName: categoryname}
                if (categoryid1) {
                    query.category1Id = categoryid1
                } else if (categoryid2) {
                    query.category2Id = categoryid2
                } else {
                    query.category3Id = categoryid3
                }
                location.query = query
                if (this.$route.params){
                    location.params=this.$route.params
                }
                this.$router.push(location)
            }
        },
        leaveShow(){
            if (this.$route.path!=='/home'){
                this.show=false
            }
        }
    }
}
</script>

<style lang="less" scoped>
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
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                a {
                    cursor: pointer;
                }

                .item {
                    h3 {
                        line-height: 27px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        &:hover {
                            background-color: rgba(220, 54, 54, 0.3);
                        }

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        height: 200px;
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
                                    padding: 0 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 590px;
                                    padding: 1px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 16px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>
