<template>
  <div>
  <div>ここにすごろくのマップが入ります</div>
  <my-space v-bind:spaceRgb="rgbPlus" v-bind:spaceTitle="spaceTitleMap" spaceDate="2003/05/07" spacePoint="+500P"></my-space>
  <my-space v-bind:spaceRgb="rgbMinus" v-bind:spaceTitle="spaceTitleMap" spaceDate="2003/05/07" spacePoint="-500P"></my-space>
</div>
</template>

<script>
import firebase from 'firebase'
import Space from '@/components/Game/Space'
export default {
  name: 'Map',
  components:{
    MySpace: Space
  },
  data () {
    return {
      spaces: {},
      rgbMinus: 'rgb(255,60,40)',
      rgbPlus: 'rgb(0,120,255)',
      spaceTitleMap: '#平成最後のたまごっち'
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
