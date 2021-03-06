import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import GoodsList from '../components/goods/List.vue'
import Add from '../components/goods/Add.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home, 
    redirect: '/Welcome', 
    children :[
      { path:'/Welcome', component: Welcome },
      { path:'/users', component: Users },
      { path:'/rights', component: Rights },
      { path:'/roles', component: Roles },
      { path:'/categories', component: Cate },
      { path:'/params', component: Params },
      { path:'/goods', component: GoodsList },
      { path:'/goods/add', component: Add }
    ]
    }
  ]
})
