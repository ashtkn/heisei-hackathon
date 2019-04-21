<template>
  <container>
    <div>ログイン画面です</div>
    <div>
      <b-button @click="signInAnonymously">匿名ログイン</b-button>
    </div>
  </container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  methods: {
    signInAnonymously () {
      firebase.auth().signInAnonymously().then(res => {
        console.log(res)
        this.$router.push({
          path: '/'
        })
      }).catch(error => {
        console.log('SignIn Error: ', error.code, error.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
