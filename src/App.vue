<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './views/Home.vue'
import User from './views/User.vue'
import Main from './views/Main'


export default {
  
  components:{Home,User,Main},
  data() {
    return { 

    };
  },
};

</script>
<style>
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: rgb(31, 13, 13);
}
#app {
  width: 100vw;
}
</style>

