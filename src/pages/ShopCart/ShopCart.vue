<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" :checked="item.isChecked===1"
                               @change="updateChecked(item.skuId,item.isChecked)">
                    </li>
                    <li class="cart-list-con2">
                        <img :src="item.imgUrl">
                        <div class="item-msg">{{ item.skuName }}</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{ item.skuPrice }}.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a class="mins" @click="handler('minus',item)">-</a>
                        <input autocomplete="off" type="text" :value="item.skuNum" class="itxt"
                               @change="handler('change',item,$event.target.value)">
                        <a class="plus" @click="handler('plus',item)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a class="sindelet" @click="deleteCart(item.skuId)">删除</a>
                        <br>
                        <a>移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0"
                       @change="checkedAll">
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="deleteAllCheckedCart">删除选中的商品</a>
                <a>移到我的关注</a>
                <a>清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>{{ totalNum }}</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ totalPrice }}</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" target="_blank">结算</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {throttle} from "lodash/function";

export default {
    name: 'ShopCart',
    mounted() {
        this.$store.dispatch('getCartList')
    },
    computed: {
        ...mapGetters(['cartList']),
        cartInfoList() {
            return this.cartList.cartInfoList || []
        },
        totalPrice() {
            return this.cartInfoList.filter((item) => {
                return item.isChecked === 1
            }).reduce((result, item) => {
                return result + item.skuNum * item.skuPrice
            }, 0)
        },
        isAllChecked() {
            return this.cartInfoList.every((item) => {
                return item.isChecked === 1
            })
        },
        totalNum() {
            return this.cartInfoList.reduce((pre, item) => {
                if (item.isChecked === 1) {
                    return pre + item.skuNum
                } else {
                    return pre
                }
            }, 0)
        }
    },
    methods: {
        handler: throttle(function (type, cart, disNum = 0) {
            switch (type) {
                case 'plus':
                    disNum = 1
                    break
                case 'minus':
                    disNum = cart.skuNum > 1 ? -1 : 0
                    break
                case 'change':
                    disNum = parseInt(disNum)
                    if (disNum < 1 || Number.isNaN(disNum)) {
                        disNum = 0
                    } else {
                        disNum = disNum - cart.skuNum
                    }
                    break
            }
            this.$store.dispatch('addToCart', {id: cart.skuId, num: disNum}).then(() => {
                this.$store.dispatch('getCartList')
            }).catch(() => {
                alert('修改失败！')
            })
        }, 500),
        deleteCart(id) {
            this.$store.dispatch('deleteCart', id).then(() => {
                this.$store.dispatch('getCartList')
            }).catch(() => {
                alert('删除失败！')
            })
        },
        updateChecked(id, isChecked) {
            isChecked = isChecked === 1 ? 0 : 1
            this.$store.dispatch('updateChecked', {id, isChecked}).then(() => {
                this.$store.dispatch('getCartList')
            }).catch(() => {
                console.log('修改失败！')
            })
        },
        deleteAllCheckedCart() {
            this.$store.dispatch('deleteAllCheckedCart').then(() => {
                this.$store.dispatch('getCartList')
            }).catch(() => {
                console.log('删除失败！')
            })
        },
        checkedAll(event) {
            const isChecked = event.target.checked ? 1 : 0
            this.$store.dispatch('checkedAll', isChecked).then(() => {
                this.$store.dispatch('getCartList')
            }).catch(() => {
                console.log('失败！')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;

                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                        cursor: pointer;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        padding: 8px;
                        text-align: center;
                        cursor: pointer;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                        cursor: default;

                        &:hover {
                            color: #e1251b;
                        }
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
                cursor: default;

                &:hover {
                    color: #e1251b;
                }
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>