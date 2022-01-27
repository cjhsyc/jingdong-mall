<template>
    <div class="page">
        <div class="sui-pagination clearfix">
            <ul>
                <li class="prev" :class="{disabled:pageNo===1}" @click="$emit('changePageNo',pageNo-1)">
                    <a>«上一页</a>
                </li>
                <li v-if="pageNo>3" @click="$emit('changePageNo',1)">
                    <a>1</a>
                </li>
                <li class="dotted" v-if="pageNo>4"><span>...</span></li>
                <li :class="{active:pageNo===pageScope.start+num-1}" v-for="num in pageScope.end-pageScope.start+1"
                    :key="num" @click="$emit('changePageNo',pageScope.start + num - 1)">
                    <a>{{ pageScope.start + num - 1 }}</a>
                </li>
                <li class="dotted" v-if="pageNo<page-3"><span>...</span></li>
                <li v-if="pageNo<page-2" @click="$emit('changePageNo',page)">
                    <a>{{ page }}</a>
                </li>
                <li class="next" :class="{disabled:pageNo===page}" @click="$emit('changePageNo',pageNo+1)">
                    <a>下一页»</a>
                </li>
            </ul>
            <div><span>共{{ page }}页&nbsp;</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        page() {
            //页数，ceil：向上取整
            return Math.ceil(this.total / this.pageSize)
        },
        pageScope() {
            let start = 0, end = 0
            if (this.continues >= this.page) {
                start = 1
                end = this.page
                return {start, end}
            }
            start = this.pageNo - Math.floor(this.continues / 2)
            end = this.pageNo + Math.floor(this.continues / 2)
            if (start < 1) {
                start = 1
                end = this.continues
            }
            if (end > this.page) {
                end = this.page
                start = this.page - this.continues + 1
            }
            return {start, end}
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    height: 66px;
    margin: 0 auto;

    .sui-pagination {
        display: flex;
        justify-content: center;

        ul {
            float: left;

            li {
                line-height: 18px;
                display: inline-block;
                cursor: pointer;
                a {
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid #e0e9ee;
                    margin-left: -1px;
                    font-size: 14px;
                    padding: 9px 18px;
                    color: #333;
                }

                &.active {
                    pointer-events: none;
                    a {
                        background-color: #fff;
                        color: #e1251b;
                        border-color: #fff;
                        cursor: default;
                    }
                }

                &.prev {
                    a {
                        background-color: #fafafa;
                    }
                }

                &.disabled {
                    pointer-events: none;
                    a {
                        color: #999;
                        cursor: default;
                    }
                }

                &.dotted {
                    span {
                        margin-left: -1px;
                        position: relative;
                        float: left;
                        line-height: 18px;
                        text-decoration: none;
                        background-color: #fff;
                        font-size: 14px;
                        border: 0;
                        padding: 9px 18px;
                        color: #333;
                    }
                }

                &.next {
                    a {
                        background-color: #fafafa;
                    }
                }
            }
        }

        div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 70px;
            line-height: 38px;
            padding-left: 25px;
        }
    }
}

</style>