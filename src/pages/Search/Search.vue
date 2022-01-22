<template>
    <div>搜索
        <h2>关键字：{{$route.params.keyWord}}---{{keyWord}}</h2>
        <h2>大写：{{$route.query.k}}---{{k}}</h2>
    </div>
</template>

<script>
export default {
    name: "Search",
    props:['keyWord','k']
}
</script>

<style scoped>

</style>