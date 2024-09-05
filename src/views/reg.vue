<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[
            {
              pattern: /^[A-Za-z]\w{4,}$/,
              required: true,
              message: '用户名必须用字母开头，由数字字母下划线组成，至少5位'
            }
          ]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, pattern: /^\S{5,}$/, message: '请填写密码' }]"
        />
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 注册 </van-button>

        <p>
          <van-button round block type="primary" @click="$router.push('/login')">
            去登录
          </van-button>
        </p>
      </div>
    </van-form>
  </div>
  <router-view></router-view>
</template>
<script>
import http from '@/utils/http'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async code() {
      let r = await http.request({
        // url: 'user/15105697744',
        method: 'GET'
      })
      console.log(r)
    },
    onSubmit() {
      http
        .request({
          url: 'user/reg',
          method: 'POST',
          data: {
            loginname: this.username,
            password: this.password
          }
        })
        .then((e) => {
          console.log(e)
          if (e.data.code == '200') {
            alert('注册成功！！')
            this.$router.push('/login')
          } else if (e.data.code == '1001') {
            alert('注册失败！')
          }
        })
    },
    onClickLeft() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped></style>
