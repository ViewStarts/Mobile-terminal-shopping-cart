<template>
  <van-nav-bar title="小米商城" fixed placeholder class="nav-01" />
  <div class="list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" lazy-render class="my-swipe">
        <van-swipe-item v-for="item in images" :key="item.proid">
          <img :src="item.banners" @click="deta(item.proid)" />
        </van-swipe-item>
      </van-swipe>

      <!-- 列表 -->
      <van-row>
        <van-col
          span="12"
          v-for="item in arr"
          :key="item.proid"
          class="goods-item"
          @click="deta(item.proid)"
        >
          <img :src="item.banners" alt="" />
          <p class="van-multi-ellipsis--l2">{{ item.proname }}</p>
          <p>{{ item.originprice }}</p>
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>
<script>
import http from '@/utils/http.js'
export default {
  async created() {
    let r = await http.request({
      method: 'GET',
      url: 'pro/list'
    })
    this.arr = r.data.data
    this.images = this.arr.slice(0, 4)
    // console.log(this.arr);
  },
  data() {
    return {
      arr: [],
      images: [],
      loading: false,
      finished: false,
      current: 2,
      pagesize: 10
    }
  },
  methods: {
    deta(id) {
      this.$router.push('/details?id=' + id)
    },
    async onLoad() {
      let r = await http({
        method: 'get',
        url: 'pro/list',
        params: {
          count: this.current,
          limitNum: 10
        }
      })
      this.arr.push(...r.data.data)
      this.loading = false
      if (this.current == r.data.total) {
        this.finished = true
      } else {
        this.current++
      }
    }
  }
}
</script>
<style scoped lang="scss">
.my-swipe .van-swipe-item img {
  width: 375px;
  height: 200px;
}

.goods-item {
  img {
    width: 100%;
    height: 200px;
  }
}
.list {
  height: calc(100vh - 100px);
  overflow: auto;
}
</style>
