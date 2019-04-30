import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import Game from '@/components/Game/Main'
import Post from '@/components/Post/Main'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      props: true
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
