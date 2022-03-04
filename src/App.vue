<template>
    <div>
        <!--<h1 v-innerText="msg"></h1>-->
        <Header></Header>
        <router-view></router-view>
        <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export default {
    name: 'App',
    data(){
        return{
            msg:'hhh'
        }
    },
    components: {
        Footer,Header
    },
    mounted() {
        this.$store.dispatch('categoryList')
    }
}
</script>

<style>

</style>
