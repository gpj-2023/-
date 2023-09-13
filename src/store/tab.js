const state= {
  tabList:[{      
    path: "/home",      
    name: "home",      
    label: "首页",      
    icon: "s-home",      
    url: "Home/Home",            
  }],
}
const mutations ={
  selectMenu(state,val) {
    if(val.name!=='home'){
      let index = state.tabList.findIndex(item=>item.name===val.name)
      let length = state.tabList.length-1
      if(index===-1){
        state.tabList.push(val)
        // console.log(index)
        // console.log(state.tabList)
      }
    }
  },
  delTab(state,index){
    state.tabList.splice(index,1)
    // console.log(this.tabList.length-1)
  }
}
export default {
  namespaced:true,
  state,
  mutations
}