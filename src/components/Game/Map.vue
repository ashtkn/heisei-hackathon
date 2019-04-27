<template>
<div id="map">
  <my-space v-bind:spaceRgb="rgbPlus" spaceTitle="#日本人初の宇宙飛行士" spaceDate="2003/05/07" spacePoint="+500P"></my-space>
  <my-space v-bind:spaceRgb="rgbMinus" spaceTitle="たまごっち発売！！" spaceDate="2003/05/07" spacePoint="-500P"></my-space>
</div>
</template>

<script>
import firebase from 'firebase'
import Space from '@/components/Game/Space'
export default {
  name: 'Map',
  components: {
    MySpace: Space
  },
  data () {
    return {
      spaces: {},
      rgbMinus: 'rgba(255,30,60,0.7)',
      rgbPlus: 'rgba(0,120,255,0.7)'
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
/* #map {
  height:100%;
  background: url("maphaikei.png");
  background-size: cover;
} */
</style>
