<template>
  <div>
    <van-nav-bar
      title="用户信息编辑"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed
      placeholder
    />

    <van-form @submit="onSaveInfo">
      <van-cell-group inset>
        <van-uploader :after-read="afterRead" style="margin-left: 200px" />
        <van-field
          v-model="username"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="[{ pattern: /^\S{2,}$/, message: '用户名至少两位' }]"
        />
        <van-field type="digit" name="性别" label="性别">
          <template #input>
            <van-radio-group v-model="usex" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 保存个人信息 </van-button>
        </div>
      </van-cell-group>
    </van-form>
  </div>
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
        this.usex = e.data.data[0].sex == -1 ? '男' : '女'
        // console.log(e.data.data[0])
      })
  },
  data() {
    return {
      uimg: '',
      username: '',
      usex: ''
    }
  },
  methods: {
    onSaveInfo() {
      // console.log(this.username, this.usex)
      http
        .request({
          url: 'user/bindusername',
          method: 'GET',
          headers: {
            token: localStorage.getItem('utoken')
          },
          params: {
            userid: localStorage.getItem('userid'),
            username: this.username
          }
        })
        .then(() => {
          // eslint-disable-next-line no-undef
          showSuccessToast('提交信息成功')
        })
    }
  },
  // 点击上传图片
  setup() {
    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      localStorage.setItem('imgname', file.objectUrl)
      // eslint-disable-next-line no-undef
      showSuccessToast('上传头像成功')
      http.request({
        url: 'user/binduseravatar',
        headers: {
          token: localStorage.getItem('utokend')
        },
        params: {
          avatar: file.objectUrl,
          userid: localStorage.getItem('uid')
        }
      })
    }
    return {
      afterRead
    }
  }
}
</script>
<style></style>
