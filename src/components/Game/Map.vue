<template>
<div id="map">
  <!--<my-space v-bind:spaceRgb="rgbPlus" spaceTitle="#日本人初の宇宙飛行士" spaceDate="2003/05/07" spacePoint="+500P"></my-space>-->
  <!--<my-space v-bind:spaceRgb="rgbMinus" spaceTitle="たまごっち発売！！" spaceDate="2003/05/07" spacePoint="-500P"></my-space>-->
  <my-space
    v-for="(space, index) in spaces"
    v-bind:key="index"
    v-bind:space-rgb="space.color"
    v-bind:space-title="space.title"
    v-bind:space-date="space.date"
    v-bind:space-point="space.point">
  </my-space>
  <my-popup
  popup-rgb='rgba(255,30,60,0.7)'
  popup-title='#たまごっち発売'
  popup-date='2019/03/31'
  popup-point='-600P'
  popup-description='朝起きたらたまごっちが死んでいた！昨晩から調子が悪かったがまさか夜の間に死んでしまうとは…'
  v-bind:popup-img="image"
  ></my-popup>
</div>
</template>

<script>
import firebase from 'firebase'
import Space from '@/components/Game/Space'
import Popup from '@/components/Game/Popup'
export default {
  name: 'Map',
  components: {
    MySpace: Space,
    MyPopup: Popup
  },
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      spaces: [],
      image: require('@/assets/hsm100-jpp01036777.jpg')
    }
  },
  created () {
    const db = firebase.firestore()
    db.collection('spaces').orderBy('date', 'asc').limit(50).get().then(querySnapshot => {
      querySnapshot.forEach(document => {
        const data = document.data()
        const rawDate = data.date.toDate()
        const year = rawDate.getFullYear()
        const month = ('00' + (rawDate.getMonth() + 1)).slice(-2)
        const day = ('00' + rawDate.getDate()).slice(-2)
        const point = data.point
        this.spaces.push({
          title: `#${data.title}`,
          description: data.description,
          date: `${year}/${month}/${day}`,
          point: `${point}P`,
          image: data.image,
          color: data.color
        })
      })
    }).catch(error => {
      console.error(error)
    })
    const gameId = this.gameId
    db.collection('games').doc(gameId).onSnapshot(document => {
      const data = document.data()
      console.log('Document updated: ', data)
      const state = data.currentState
      const currentPlayerIndex = data.currentPlayer

      if (state === 0) {
        // ルーレットを回せる状態
      } else if (state === 1) {
        // ルーレットを回している状態
      } else if (state === 2) {
        // ルーレットを回し終わって移動している状態
        console.log('プレーヤー移動開始')
        // TODO: 移動する処理
        const currentSteps = data.currentSteps
        const nextSteps = currentSteps.map((value, index, array) => {
          if (index === currentPlayerIndex) {
            return value + data.remainingSteps
          } else {
            return value
          }
        })
        db.collection('games').doc(gameId).update({
          currentSteps: nextSteps,
          remainingSteps: 0,
          currentState: 3
        }).then(() => {
          console.log('Current state: 3')
        }).catch(error => {
          console.error(error)
        })
      } else if (state === 3) {
        // 移動が終了してマスの詳細を表示している状態
      } else if (state === 4) {
        // マスの詳細を閉じてポイント計算をしてプレーヤーを変更する状態
      } else {
        // エラー
        console.error('State error: ', state)
      }
    })
  }
}
</script>

<style scoped>
</style>
