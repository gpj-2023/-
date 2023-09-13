<template>
  
    <el-container>
      <el-aside class="common-aside" width="auto">
        
        
      <common-aside></common-aside>

        <!-- <common-aside/> -->
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <el-main>
          <common-tab></common-tab>
          <router-view></router-view>
          
        </el-main>
      </el-container>
    </el-container>
 
</template>

<script>

import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTab from '../components/CommonTab.vue'
import Hello1 from './Hello1.vue'
export default {

  name: "Main",
  components:{CommonAside,CommonHeader,CommonTab,Hello1}
};
</script>

<style lang="less">
.el-container {
  width:100vw;
}
.common-aside {
  overflow:hidden;
   
  h3{
    color:rgb(71, 141, 203);
    padding-left:10%;
    background-color:#545c64;
  }
}

.el-header {
  background-color:#545c64;
  width:100%;
  
}
</style>