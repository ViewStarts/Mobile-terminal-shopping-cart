<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeft" />
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
        <van-button round block type="primary" native-type="submit"> 登录 </van-button>

        <p>
          <van-button round block type="primary" @click="$router.push('/reg')"> 去注册 </van-button>
        </p>
      </div>
    </van-form>
  </div>
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
    onSubmit() {
      http
        .request({
          url: 'user/login',
          method: 'POST',
          data: {
            loginname: this.username,
            password: this.password
          }
        })
        .then((e) => {
          if (e.data.code == '200') {
            // eslint-disable-next-line no-undef
            showSuccessToast('登录成功')
            localStorage.setItem('utoken', e.data.data.token)
            localStorage.setItem('userid', e.data.data.userid)
            this.$router.push('/my')
          } else {
            alert('登录失败！')
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
