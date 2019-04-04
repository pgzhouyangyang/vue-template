<template>
        <div>
            用户名：<input type="text">
            密码：<input type="text">
            <input type="button" value="登录" @click="login">
        </div>
</template>
<script>
import { login } from "@/api/getData"
export default {
    data() {
        return {

        }
    },
    methods: {
        async login(){
            const result = await login({
                username: "",
                password: ""
            })
            this.$store.commit("setToken", "123456789")
            this.$router.replace({
                path: this.$route.query.redirect || "/"
            })
           
        }
    }
}
</script>
<style lang="scss">

</style>


