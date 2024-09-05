<template>
  <van-nav-bar title="个人信息" fixed placeholder class="nav-01" />
  <div class="a1">
    <van-image width="100" height="100" :src="imguname" class="a2" />
    <div style="display: flex" class="a5">
      <div class="a2,a5">昵称: {{ username }} 性别:{{ usex == -1 ? '男' : '女' }}</div>
    </div>
  </div>
  <van-button type="primary" to="/bian" class="a3">点击编辑</van-button>
  <van-button type="primary" class="a3" @click="tui">退出登录</van-button>
</template>
<script>
import http from '@/utils/http'

export default {
  created() {
    http
      .request({
        url: 'user/info',
        method: 'GET',
        headers: {
          token: localStorage.getItem('utoken')
        },
        params: {
          userid: localStorage.getItem('userid')
        }
      })
      .then((e) => {
        this.uimg = e.data.data[0].avatar
        this.username = e.data.data[0].username
        this.usex = e.data.data[0].sex
        // console.log(e.data.data[0])
      })
  },
  computed: {
    imguname() {
      return localStorage.getItem('imgname')
    }
  },
  data() {
    return {
      uimg: '',
      username: '',
      usex: 0
    }
  },
  methods: {
    tui() {
      localStorage.clear()
      this.$router.push('/setting')
    }
  }
}
</script>
<style scoped>
.a2 {
  margin-top: 10px;
  margin-left: 150px;
}
.a3 {
  margin-left: 80px;
  margin-top: 10px;
}
.a5 {
  margin-left: 130px;
}
</style>
