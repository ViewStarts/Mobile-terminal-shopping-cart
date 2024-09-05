<template>
  <div>
    <van-tabbar v-model="active" route v-show="$route.meta.showTab">
      <van-tabbar-item icon="home-o" to="/" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="other-pay" to="/friends" replace>分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart" replace>购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" :to="add" replace>我的</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    const token = localStorage.getItem('utoken')
    token ? (this.add = '/my') : (this.add = '/setting')
    // console.log(this.add)
  },
  data() {
    return {
      active: 0,
      add: ''
    }
  }
}
</script>
<style></style>
