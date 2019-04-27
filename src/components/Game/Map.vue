<template>
  <div>
  <div>ここにすごろくのマップが入ります</div>
  <my-space v-bind:spaceRgb="rgbPlus" spaceTitle="日本人初の宇宙飛行士" spaceDate="2003/05/07" spacePoint="+500P"></my-space>
  <my-space v-bind:spaceRgb="rgbMinus"　spaceTitle="日本人初の宇宙飛行士" spaceDate="2003/05/07" spacePoint="-500P"></my-space>
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
      rgbMinus: 'rgba(255,60,40,0.8)',
      rgbPlus: 'rgba(0,120,255,0.8)',
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
