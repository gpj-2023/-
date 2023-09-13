<template>

    <el-card>
      <h3>系统登录</h3>
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item label="账号:" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
          </el-form-item>
      </el-form>
    </el-card>

</template>

<script>
import {getMenu} from '../api'
import Cookies from "js-cookie";
export default {
  data(){
    return {
      form:{
        account:'',
        password:''
      },
      rules:{
        account: [             
          { required: true, message: '请输入账号', trigger: 'blur' },             
        ],
        password: [             
          { required: true, message: '请输入密码', trigger: 'blur' },             
        ],
      }
    }
  },
  methods:{
    submit(){
      getMenu(this.form).then(({data})=>{
        // console.log(data)
        this.$refs.form.validate((valid)=>{
          // console.log(valid)
          if(valid){            
            if(data.code===20000){
              // console.log(data)
              Cookies.set('token',data.data.token)
              this.$store.commit('updateMenuList',data.data.menu)
              this.$store.commit('addRouteList',this.$router)
              this.$store.commit('changeAuth',data.data.auth)
              this.$store.commit('changeAuthNmae',data.data.authName)
              // console.log(this.$router)
              this.$router.push('/home')
            }
            else{
              this.$message.error(data.data.message);
            }
          }
        })

      })
    }
  }
}
</script>

<style lang="less" scoped>

  .el-card{
    margin:10% auto;
    width:30vw;
    display:flex;
    justify-content:center;
    h3{
      color:aqua;
      text-align:center;
      padding-bottom:10px;
    }
    .el-form-item {
      display:flex;
      justify-content:center;
    }
  }

</style>