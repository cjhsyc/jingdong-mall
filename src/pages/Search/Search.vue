<template>
    <div>
        <TypeNav/>
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a>全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <li class="with-x" v-show="searchParams.categoryName">{{ searchParams.categoryName }}
                            <i @click="removeCategoryName">×</i>
                        </li>
                        <li class="with-x" v-show="searchParams.keyword">{{ searchParams.keyword }}
                            <i @click="removeKeyword">×</i>
                        </li>
                        <li class="with-x" v-show="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}
                            <i @click="removeTm">×</i>
                        </li>
                        <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">
                            {{ item.split(':')[1] }}
                            <i @click="removeProps(index)">×</i>
                        </li>
                    </ul>
                </div>

                <!--selector-->
                <SearchSelector @getTm="getTm" @getAttr="getAttr"/>

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{active:isOne}" @click="changeOrder('1')">
                                    <a>综合<span class="iconfont"
                                               :class="{'icon-jiantou_xiangxia':isDesc,'icon-jiantou_xiangshang':!isDesc}"
                                               v-show="isOne"></span>
                                    </a>
                                </li>
                                <li :class="{active:!isOne}" @click="changeOrder('2')">
                                    <a>价格<span class="iconfont"
                                               :class="{'icon-jiantou_xiangxia':isDesc,'icon-jiantou_xiangshang':!isDesc}"
                                               v-show="!isOne"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <router-link :to="`/detail/${goods.id}`">
                                            <img v-lazy="goods.defaultImg"/>
                                        </router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>{{ goods.price }}.00</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a :title="goods.title">{{ goods.title }}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--total:总商品数，continues：连续的页码数-->
                    <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total"
                                :continues="5" @changePageNo="changePageNo"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'

export default {
    name: "Search",
    components: {
        SearchSelector
    },
    beforeMount() {
        Object.assign(this.searchParams, this.$route.params, this.$route.query)
    },
    mounted() {
        this.getSearchInfo()
    },
    data() {
        return {
            searchParams: {
                category1Id: "",
                category2Id: "",
                category3Id: "",
                categoryName: "",
                keyword: "",
                order: "2:desc",
                pageNo: 1,
                pageSize: 10,
                props: [],
                trademark: ""
            }
        }
    },
    computed: {
        ...mapGetters(['goodsList']),
        //是否为综合排序
        isOne() {
            return this.searchParams.order.includes('1')
        },
        //是否为降序
        isDesc() {
            return this.searchParams.order.includes('desc')
        },
        ...mapState({
            total(state) {
                return state.search.searchList.total
            }
        })
    },
    watch: {
        $route() {
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
            Object.assign(this.searchParams, this.$route.params, this.$route.query)
            this.getSearchInfo()
        }
    },
    methods: {
        getSearchInfo() {
            this.$store.dispatch('getSearchInfo', this.searchParams)
        },
        removeCategoryName() {
            this.searchParams.categoryName = ''
            this.$router.push({name: 'search', params: this.$route.params})
        },
        removeKeyword() {
            this.searchParams.keyword = ''
            this.$router.push({name: 'search', query: this.$route.query})
        },
        removeTm() {
            this.searchParams.trademark = ''
            this.getSearchInfo()
        },
        removeProps(index) {
            this.searchParams.props.splice(index, 1)
            this.getSearchInfo()
        },
        //获取子组件品牌信息
        getTm(tm) {
            this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`
            this.getSearchInfo()
        },
        //获取子组件属性信息
        getAttr(attr) {
            if (this.searchParams.props.indexOf(attr) === -1) {
                this.searchParams.props.push(attr)
                this.getSearchInfo()
            }
        },
        changeOrder(num) {
            //num:1(综合排序)，num：2（价格排序）
            const originNum = this.searchParams.order.split(':')[0]
            const originSort = this.searchParams.order.split(':')[1]
            if (num !== originNum) {
                this.searchParams.order = this.searchParams.order.replace(originNum, num)
            } else {
                this.searchParams.order = this.searchParams.order.replace(originSort, originSort === 'asc' ? 'desc' : 'asc')
            }
            this.getSearchInfo()
        },
        changePageNo(no) {
            this.searchParams.pageNo = no
            this.getSearchInfo()
        }
    }
}
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        max-height: 100%;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                        padding-left: 5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>