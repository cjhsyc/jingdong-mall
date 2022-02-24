<template>
    <div>
        <div id="shortcut">
            <ul>
                <li>
                    <router-link to="/login">你好，请登录</router-link>
                    <router-link to="/register" class="register">免费注册</router-link>
                </li>
                <li><a>我的订单</a></li>
                <li><router-link to="/shopCart">我的购物车</router-link></li>
                <li><a>我的京东</a></li>
                <li><a>京东会员</a></li>
                <li><a>企业采购</a></li>
                <li><a>关注京东</a></li>
                <li><a>合作招商</a></li>
                <li><a>商家后台</a></li>
            </ul>
        </div>
        <div id="header">
            <div id="logo">
                <router-link to="/home">
                    <img src="./image/logo.png" alt="logo">
                </router-link>
            </div>
            <div id="search">
                <input type="text" v-model="keyword">
                <button @click="toSearch">搜索</button>
            </div>
            <div id="cart">
                <span><img src="./image/cart.png" alt="cart"></span>
                <router-link to="/shopCart">我的购物车</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        toSearch() {//点击搜索按钮跳转到搜索页面
            //字符串写法（传递params参数需要在路由中设置占位符）
            // this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase())
            //模板字符串写法
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            //对象写法(需要在路由中设置name，因为params参数不能配合path进行传参，query参数配合两种都可以)
            const location={name: 'search', params: {keyword: this.keyword || undefined}}
            if (this.$route.query){
                location.query=this.$route.query
            }
            this.$router.push(location)
        }
    }
}
</script>

<style scoped>
#shortcut {
    height: 30px;
    line-height: 30px;
    color: #999;
    background-color: #e3e4e5;
    font-size: 12px;
}

#shortcut ul {
    display: flex;
    justify-content: center;
}

#shortcut ul .register {
    color: red;
}

#shortcut li a {
    padding: 0 10px;
}

#shortcut li:not(:first-child) a {
    border-left: 1px solid #999999;
}

#header {
    display: flex;
    justify-content: space-evenly;
}

#logo img {
    width: 190px;
    height: 120px;
}

#search {
    height: 35px;
    border: 2px solid #e2231a;
    margin-top: 30px;
}

#search input {
    padding: 2px 17px 2px 17px;
    width: 425px;
    height: 26px;
    border: 1px solid transparent;
    line-height: 26px;
    font-size: 14px;
    outline: none;
}

#search button {
    width: 58px;
    height: 35px;
    line-height: 32px;
    border: none;
    background-color: #e1251b;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
}

#cart {
    border: 1px solid #eee;
    height: 35px;
    margin-top: 30px;
    width: 132px;
    line-height: 35px;
}

#cart:hover {
    border-color: #e1251b;
}

#cart a {
    color: #e1251b;
    margin-left: 15px;
}

#cart span {
    margin-left: 5px;
}

#cart img {
    width: 20px;
}

</style>