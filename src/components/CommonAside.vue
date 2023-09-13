<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"

    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
    <el-menu-item @click="showMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name+''">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.name" :index="item.name+''">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="subItem in item.children"
          :key="subItem.name"
          :index="subItem.name+''"
          @click="showMenu(subItem)"
        >
        <i :class="`el-icon-${subItem.icon}`"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      

    };
  },
  methods: {
    showMenu(item) {
      this.$router.push(item.path);
      // this.$store.commit('selectMenu',item)
      this.selectMenu(item)
      
    },
    ...mapMutations('tab',['selectMenu'])
  },
  computed: {
    noChildren() {
      return this.MenuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.MenuData.filter((item) => item.children);
    },
    isCollapse(){
      return this.$store.state.tag.isCollapse
    },
    MenuData(){
      return this.$store.state.tag.menuList //|| JSON.parse(Cookies.get('menuList'))
    }
    // ...mapState('tag',['isCollapse'])

  },
  mounted(){
    // console.log(this.MenuData)
  }

};
  
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 12vw;
  min-height: 400px;
}
.el-aside {
  height:110vh;
}
.el-menu-vertical-demo {
  height:100%;
  border-right:none;
}

</style>