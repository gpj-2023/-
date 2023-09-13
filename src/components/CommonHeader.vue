<template>
  <div class="commonHeader">
    <div class="l-header">
      <el-button @click="fold" icon="el-icon-menu" size="mini"></el-button>
      <!-- <p>{{ tabList }}</p> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tabList" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-header">
      <el-dropdown @command="handldrop">
        <span class="el-dropdown-link">
          <img src="../assets/login1.jpg" width="40" height="40" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";
export default {
  
  methods: {
    fold() {
      this.$store.commit("changeFold");
    },
    handldrop(command){
      if(command === 'out'){
        // console.log(111)
        Cookies.remove('token')
        this.$router.push('/login')
        Cookies.remove('menuList')
        Cookies.remove('auth')
        Cookies.remove('authName')
        this.$message({
          message: '退出登录',
          type: 'warning'
        });
      }
    }
  },
  computed: {
    ...mapState("tab", ["tabList"]),
  },
  // mounted(){
  //   console.log(this.tabList)
  // }
};
</script>

<style lang="less">
.commonHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
.el-dropdown-link img {
  border-radius: 50%;
  margin-right: 10px;
}
.l-header {
  display:flex;
  align-items:center;
}
.el-breadcrumb {
  margin-left:10px;
  .el-breadcrumb__inner.is-link {
    color:rgb(163, 219, 239);
    &:hover {
      cursor:pointer;
      
    }
  }

}
.el-breadcrumb .el-breadcrumb__item:last-child{     
  .el-breadcrumb__inner.is-link {     
    font-weight:600;  
    color:white; 
    text-shadow:1px 1px 1px black;    
    
  }   
}


</style>