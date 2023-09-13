<template>
  <div class="tab">
    <el-tag
      v-for="(item,index) in tabList"
      :key="item.label"
      @click="changeTab(item)"
      @close="handleClose(index)"
      :closable="item.name!=='home'"
      :effect="$route.name===item.name?'dark':'light'"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'CommonTab',
  computed: { 
    ...mapState("tab", ["tabList"]) 
  },
  methods:{
    ...mapMutations('tab',["delTab"]),
    handleClose(index){
      this.delTab(index)
      let length = this.tabList.length-1              
      // console.log(length)
      if(index-1===length){
        this.$router.push(this.tabList[length].path)
      }
      else if(index-1<length){
        this.$router.push(this.tabList[index].path)
      }
    },
    changeTab(item){
      this.$router.push(item.path)
    }
  }

};
</script>

<style>
.el-tag.el-tag--light{
  cursor:pointer; 
}
.tab{
  margin-bottom:10px;
}
</style>