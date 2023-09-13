import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
import Cookies from "js-cookie";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'Main',
    component: Main,
    redirect: '/home',
    children: [
      // {
      //   path: 'home',
      //   name: 'home',
      //   component: Home,

      // },
      // {
      //   path: 'user',
      //   name: 'user',
      //   component: User
      // },
      // {
      //   path: 'mall',
      //   name: 'mall',
      //   component: Mall
      // },
      // {
      //   path: 'page1',
      //   name: 'page1',
      //   component: PageOne
      // },
      // {
      //   path: 'page2',
      //   name: 'page2',
      //   component: PageTwo
      // },

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

})
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token') 
  if (!token && to.path !== '/login') { 
    next('/login')
  } else if (token && to.path === '/login') { 
    next('/home')
  } else {
     next() 
    } 
  })
// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}


export default router
