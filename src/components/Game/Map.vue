<template>
  <div>ここにすごろくのマップが入ります</div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Map',
  data () {
    return {
      spaces: {}
    }
  },
  created () {
    const db = firebase.firestore()
    db.collection('spaces').limit(50).get().then(querySnapshot => {
      querySnapshot.forEach(document => {
        console.log(document.id, ' => ', document.data())
      })
    }).catch(error => {
      console.error(error)
    })
  }
}
</script>

<style scoped>

</style>
