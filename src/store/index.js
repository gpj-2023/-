import Cookies from 'js-cookie'
import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import tab from './tab'
import tag from './tag'
Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [ 		
    // 可以有多个持久化实例   		
    persistedState(
      { 			key: 'menuList', // 状态保存到本地的 key，自己命名 			
    paths: ['tag.menuList',], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c    			
    storage: { // 存储方式定义   				
      getItem: key => Cookies.get(key),         
      setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),         
      removeItem: key => Cookies.remove(key)  
    } 		},
    
    ), 	
    persistedState(       { 			key: 'auth', 
    // 状态保存到本地的 key，自己命名 			    
     paths: ['tag.auth',], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c    			     
     storage: { // 存储方式定义   				       
      getItem: key => Cookies.get(key),                
      setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),                
      removeItem: key => Cookies.remove(key)       } 		},          ),
    persistedState(       { 			key: 'authName', 
    // 状态保存到本地的 key，自己命名 			    
     paths: ['tag.authName',], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c    			     
     storage: { // 存储方式定义   				       
      getItem: key => Cookies.get(key),                
      setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),                
      removeItem: key => Cookies.remove(key)       } 		},          ),
  ],
  modules: {
    tag,
    tab
  }
})
