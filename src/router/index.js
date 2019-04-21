import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import Game from '@/components/Game/Main'
import Post from '@/components/Post/Main'

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
      component: Game
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    }
  ]
})
