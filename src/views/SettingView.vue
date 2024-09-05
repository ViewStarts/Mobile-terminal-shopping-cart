<template>
    <div>
        <button @click="$router.push('/reg')">注册</button>
        <button @click="$router.push('/login')">登录</button>
    </div>
    <router-view></router-view>
</template>
<script>
export default {

}
</script>
<style scoped>
div {
    text-align: center;
    margin-top: 300px;
}
</style>