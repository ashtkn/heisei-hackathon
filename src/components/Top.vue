<template>
  <b-container>
    <b-container class="p-4">
      <b-form @submit="start">
        <b-form-group
          id="p0"
          label="Player 0"
          label-for="p0">
          <b-form-input
            id="p0"
            v-model="p0"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="p1"
          label="Player 1"
          label-for="p1">
          <b-form-input
            id="p1"
            v-model="p1"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="p2"
          label="Player 2"
          label-for="p2">
          <b-form-input
            id="p2"
            v-model="p2"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="p3"
          label="Player 3"
          label-for="p3">
          <b-form-input
            id="p3"
            v-model="p3"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">ゲーム開始</b-button>
      </b-form>
    </b-container>

    <b-container class="p-4">
      <b-form @submit="post">
        <b-button type="submit">新規投稿</b-button>
      </b-form>
    </b-container>
  </b-container>
</template>

<script>
// import Game from '@/components/Game/Main'
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
      },
      p0: '名無し 0',
      p1: '名無し 1',
      p2: '名無し 2',
      p3: '名無し 3'
    }
  },
  methods: {
    start: function (evt) {
      evt.preventDefault()
      const gamePlayers = [this.p0, this.p1, this.p2, this.p3]
      console.log(gamePlayers)
      this.$router.push({name: 'Game', params: { gamePlayers: gamePlayers }})
    },
    post: function (evt) {
      evt.preventDefault()
      this.$router.push('/post')
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
