<template>
  <van-nav-bar title="分类页" fixed placeholder class="nav-01" />
  <div class="app">
    <van-sidebar v-model="active" @change="onChange" class="left">
      <van-sidebar-item v-for="(item, index) in list" :key="index" :title="item" />
    </van-sidebar>

    <div class="plist">
      <van-row class="right">
        <van-col
          span="12"
          v-for="item in rightList"
          :key="item.proid"
          @click="$router.push('/details?id=' + item.proid)"
        >
          <img :src="item.img1" alt="" />
          <p class="van-multi-ellipsis--l2">{{ item.proname }}</p>
          <p>{{ item.originprice }}</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import http from '@/utils/http'

export default {
  data() {
    return {
      list: [],
      active: 0,
      rightList: []
    }
  },
  methods: {
    onChange() {
      //   console.log(this.list[this.active])
      http
        .request({
          url: 'pro/search',
          method: 'GET',
          params: {
            count: 1,
            limitNum: 10,
            keyword: this.list[this.active]
          }
        })
        .then((e) => {
          this.rightList = e.data.data
          //   console.log(this.rightList[0])
        })
    }
  },
  created() {
    http
      .request({
        url: 'pro/categorylist',
        method: 'GET'
      })
      .then((e) => {
        this.list = e.data.data
        // console.log(this.list[0])
      })
  }
}
</script>
<style scoped lang="scss">
.app {
  display: flex;

  .left {
    height: calc(100vh - 100px);
    overflow: auto;
  }

  .plist {
    flex: 1;
    height: calc(100vh - 100px);
    overflow: auto;
    img {
      width: 100%;
    }
  }
}
</style>
