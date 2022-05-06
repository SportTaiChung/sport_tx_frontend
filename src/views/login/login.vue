<template>
    <div class="login">
        登入页面
    </div>
</template>

<script>

import {login} from "../../request/api/Login";
import {setToken} from "@/utils/auth.js"
export default {
    name: 'login',
    data(){
        return{
          logindata:{
            mbID: "a13",
            pw: "123456789",
            verCode: "5688",
            siteid:1,
            udomain:"https://demo.queen168.net"
          }
        }
    },
    components: {},
    mounted() {
      login(this.logindata).then((res)=>{
        setToken(res.data.loginID,res.data.mb.mbID)
        this.$router.push('/')
      })
    },
    methods: {

    }
}
</script>


