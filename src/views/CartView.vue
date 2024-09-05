<template>
  <van-nav-bar title="购物车" fixed placeholder class="nav-01" />

  <div>
    <van-row v-for="item in arr" :key="item.goods_id">
      <van-col span="2">
        <van-checkbox v-model="item.flag" @click="check(item)"></van-checkbox>
      </van-col>
      <van-col span="8">
        <img :src="item.img1" alt="" />
      </van-col>
      <van-col span="14">
        <div>{{ item.proname }}</div>
        <div>单价:{{ item.originprice }} 小记:{{ item.originprice * item.num }}</div>
        <div>数量：<van-stepper v-model="item.num" @change="num(item)" /></div>
        <div><van-button type="danger" @click="del(item)">删除</van-button></div>
      </van-col>
    </van-row>
  </div>

  <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" @change="gtotal()">
    <van-checkbox v-model="isAll" @click="Allcheck">全选</van-checkbox>
  </van-submit-bar>
</template>
<script>
import http from '@/utils/http'

export default {
  created() {
    this.list()
  },
  data() {
    return {
      arr: [],
      isAll: '',
      total: 0
    }
  },
  methods: {
    // 列表
    list() {
      http
        .request({
          url: 'cart/list',
          method: 'POST',
          headers: {
            token: localStorage.getItem('utoken')
          },
          data: {
            userid: localStorage.getItem('userid')
          }
        })
        .then((e) => {
          this.arr = e.data.data
          // console.log(this.arr)
          if (this.arr.every((v) => v.flag == true)) {
            this.isAll = true
          } else {
            this.isAll = false
          }
          this.gtotal()
        })
    },
    // 删除
    del(item) {
      // console.log(item.cartid);
      http
        .request({
          url: 'cart/remove',
          method: 'post',
          headers: {
            token: localStorage.getItem('utoken')
          },
          data: {
            cartid: item.cartid
          }
        })
        .then((e) => {
          if (e.data.code == 200) {
            // eslint-disable-next-line no-undef
            showSuccessToast('删除商品成功')
            this.list()
            this.gtotal()
          }
        })
    },
    // 单选
    check(item) {
      http
        .request({
          url: 'cart/selectone',
          method: 'post',
          headers: {
            token: localStorage.getItem('utoken')
          },
          data: {
            cartid: item.cartid,
            flag: item.flag
          }
        })
        .then(() => {
          if (this.arr.every((v) => v.flag == true)) {
            this.isAll = true
          } else {
            this.isAll = false
          }
          this.gtotal()
        })
    },
    // 全选
    Allcheck() {
      this.arr.forEach((item) => {
        if (this.isAll) {
          item.flag = true
          this.check(item)
        } else {
          item.flag = false
          this.check(item)
        }
      })
      http
        .request({
          url: 'cart/selectall',
          method: 'post',
          headers: {
            token: localStorage.getItem('utoken')
          },
          data: {
            userid: localStorage.getItem('uid'),
            type: this.isAll
          }
        })
        .then(() => {
          this.gtotal()
        })
    },
    // 数量
    num(item) {
      // console.log(item.num);
      http
        .request({
          url: 'cart/updatenum',
          method: 'POST',
          headers: {
            token: localStorage.getItem('utoken')
          },
          data: {
            cartid: item.cartid,
            num: item.num
          }
        })
        .then(() => {
          this.gtotal()
        })
    },
    // 总计
    gtotal() {
      let total = 0
      this.arr.forEach((item) => {
        if (item.flag) {
          total += item.originprice * item.num
        }
      })
      this.total = total * 100
    },
    onSubmit() {}
  }
}
</script>
<style scoped>
img {
  width: 100px;
}

.van-submit-bar {
  bottom: 52px;
}
</style>
