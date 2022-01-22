<template>
    <div class="footer">
        <div class="footer-container">
            <div class="footerList">
                <div class="footerItem">
                    <h4>购物指南</h4>
                    <ul class="footerItemCon">
                        <li>购物流程</li>
                        <li>会员介绍</li>
                        <li>生活旅行/团购</li>
                        <li>常见问题</li>
                        <li>购物指南</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>配送方式</h4>
                    <ul class="footerItemCon">
                        <li>上门自提</li>
                        <li>211限时达</li>
                        <li>配送服务查询</li>
                        <li>配送费收取标准</li>
                        <li>海外配送</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>支付方式</h4>
                    <ul class="footerItemCon">
                        <li>货到付款</li>
                        <li>在线支付</li>
                        <li>分期付款</li>
                        <li>邮局汇款</li>
                        <li>公司转账</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>售后服务</h4>
                    <ul class="footerItemCon">
                        <li>售后政策</li>
                        <li>价格保护</li>
                        <li>退款说明</li>
                        <li>返修/退换货</li>
                        <li>取消订单</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>特色服务</h4>
                    <ul class="footerItemCon">
                        <li>夺宝岛</li>
                        <li>DIY装机</li>
                        <li>延保服务</li>
                        <li>京东E卡</li>
                        <li>京东通信</li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <ul class="helpLink">
                    <li>关于我们</li>
                    <li>联系我们</li>
                    <li>关于我们</li>
                    <li>商家入驻</li>
                    <li>营销中心</li>
                    <li>友情链接</li>
                    <li>关于我们</li>
                    <li>营销中心</li>
                    <li>友情链接</li>
                    <li>关于我们</li>
                </ul>
                <p>地址：xxxxxxxxxxxxxxxxxxxxx</p>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped>
.footer{
    background-color: #e3e4e5;
}

p,li{
    font-size: 12px;
}

.footerList{
    padding-top: 20px;
    display: flex;
    justify-content: space-around;
}

.footerItemCon li{
    margin-top: 5px;
}

.helpLink{
    margin-top: 20px;
    width: 800px;
    display: flex;
    justify-content: space-evenly;
    margin-left: 50%;
    position: relative;
    left: -400px;
}

.copyright{
    text-align: center;
}

.copyright p{
    padding: 10px;
}
</style>