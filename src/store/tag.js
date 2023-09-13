import Cookies from 'js-cookie'
const state = {
  isCollapse: false,
  menuList: [],
  auth:'',
  authName:''
}
const mutations = {
  changeFold(state) {
    state.isCollapse = !state.isCollapse
  },
  updateMenuList(state, val) {
    // console.log(val)
    state.menuList = val
    // console.log(JSON.stringify(val))
    // Cookies.set('menuList',JSON.stringify(val))
  },
  addRouteList(state, router) {
    let menuRouteList = []
    state.menuList.forEach(item => {
      if (!item.children) {
        item.component = () => import(`../views/${item.url}`)
        menuRouteList.push(item)
        // console.log(item)
      } else if (item.children) {
        item.children = item.children.map(item => {
          item.component = () => import(`../views/${item.url}`)
          return item
        })
        // console.log(item.children)
        menuRouteList.push(...item.children)
      }
    })
    menuRouteList.forEach(item=>{
      router.addRoute('Main',item)
    })
    // router.addRoute('Main',menuRouteList)
    // console.log(menuRouteList)
  },
  changeAuth(state,val){
    state.auth = val
  },
  changeAuthNmae(state,val){
    state.authName = val
  }
}
export default {
  // namespaced:true,
  state,
  mutations

}