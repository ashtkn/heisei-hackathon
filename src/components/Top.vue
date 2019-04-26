<template>
  <b-container>
    <div>トップ画面です</div>
    <div>
      <b-button v-bind:to="router.game.path">ゲーム開始</b-button>
    </div>
    <div>
      <b-button v-bind:to="router.post.path">新規投稿</b-button>
    </div>
  </b-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Index',
  data () {
    return {
      router: {
        game: {
          path: '/game'
        },
        post: {
          path: '/post'
        }
      }
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Login: ', user)
      } else {
        console.log('Not login')
        this.$router.push({
          path: '/login'
        })
      }
    })
  }
}
</script>

<style scoped>

</style>
