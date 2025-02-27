import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import SignUp from '../components/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/update/:id',
    name: 'update',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
