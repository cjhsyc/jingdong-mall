<template>
<div>
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="item in floorList" :key="item.id" :floor="item"/>
    <Brand/>
</div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
import Rank from "./Rank/Rank";
import Like from "./Like/Like";
import Floor from "./Floor/Floor";
import Brand from "./Brand/Brand";
import {mapState} from "vuex";

export default {
    name: "Home",
    components:{
        ListContainer,TodayRecommend,Rank,Like,Floor,Brand
    },
    computed:{
        ...mapState({
            floorList(state){
                return state.home.floorList
            }
        })
    },
    created() {
        this.$store.dispatch('getFloorList')
    },

}
</script>

<style scoped>

</style>