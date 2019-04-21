<template>
  <div>トップ画面です</div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Index',
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Login')
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
