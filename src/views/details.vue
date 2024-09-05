<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" fixed placeholder />
        <img :src="arr.banners" alt="">
        <p>{{ arr.desc }}</p>
        <p>{{ arr.originprice }}</p>
        <p v-for="(item, index) in arr.imgs" :key="index">
            <img :src="item" alt="">
        </p>
    </div>

    <van-action-bar placeholder>
        <van-action-bar-icon icon="chat-o" text="客服" dot />
        <van-action-bar-icon icon="cart-o" text="购物车" badge="5" @click="$router.push('/cart')" />
        <van-action-bar-icon icon="shop-o" text="店铺" badge="12" />
        <van-action-bar-button type="warning" text="加入购物车" @click="jia" />
        <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
</template>
<script>
import http from '@/utils/http';
export default {
    created() {
        // console.log(this.$route.query.id);
        http.request({
            method: 'GET',
            url: 'pro/detail/' + this.$route.query.id
        }).then((e) => {
            this.arr = e.data.data;
            // console.log(this.arr);
        })
    },
    data() {
        return {
            arr: []
        }
    }, methods: {
        onClickLeft() {
            this.$router.back()
        },
        jia() {
            let token = localStorage.getItem('utoken');
            let userid = localStorage.getItem('userid');
            if (token != null) {
                http.request({
                    url: 'cart/add',
                    method: 'POST',
                    headers: {
                        'token': token
                    },
                    data: {
                        userid: userid,
                        proid: this.arr.proid,
                        num: 1
                    }
                }).then(() => {
                    // eslint-disable-next-line no-undef
                    showSuccessToast('加入购物车成功');
                })
            }
        }
    },
}
</script>
<style scoped>
img {
    width: 100%;
}
</style>