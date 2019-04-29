<template>
  <b-container>
    <div>ゲームのメイン画面です</div>
    <div>現在の状態: {{currentState}}</div>
    <div>現在のターン: {{currentTurn}}</div>
    <div>残りステップ数: {{remainingSteps}}</div>
    <my-side-bar v-bind:game-id="gameId"></my-side-bar>
    <my-roulette v-bind:game-id="gameId"></my-roulette>
    <my-map v-bind:game-id="gameId"></my-map>
  </b-container>
</template>

<script>
import SideBar from '@/components/Game/SideBar'
import Roulette from '@/components/Game/Roulette'
import Map from '@/components/Game/Map'
import firebase from 'firebase'
import { uuid } from 'vue-uuid'
export default {
  name: 'Game',
  components: {
    MySideBar: SideBar,
    MyRoulette: Roulette,
    MyMap: Map
  },
  data () {
    return {
      gameId: '',
      currentTurn: 0,
      currentState: -1,
      remainingSteps: 0
    }
  },
  created () {
    this.gameId = uuid.v1()
    const db = firebase.firestore()
    db.collection('games').doc(this.gameId).set({
      date: new Date(),
      gameId: this.gameId,
      gamePlayers: [
        {
          name: 'Player 0'
        },
        {
          name: 'Player 1'
        }
      ],
      currentSteps: [0, 0],
      currentPoints: [1000, 500],
      currentTurn: 0,
      currentPlayer: 0,
      currentState: 0,
      remainingSteps: 0
    }).then(() => {
      // Set callback method
      db.collection('games').doc(this.gameId).onSnapshot(document => {
        const data = document.data()
        console.log('Document updated: ', data)
        const state = data.currentState
        this.currentTurn = data.currentTurn
        this.remainingSteps = data.remainingSteps
        if (state === 0) {
          // ルーレットを回せる状態
          this.currentState = 0
        } else if (state === 1) {
          // ルーレットを回している状態
          this.currentState = 1
        } else if (state === 2) {
          // ルーレットを回し終わって移動している状態
          this.currentState = 2
        } else if (state === 3) {
          // 移動が終了してマスの詳細を表示している状態
          this.currentState = 3
        } else if (state === 4) {
          // マスの詳細を閉じてポイント計算をしてプレーヤーを変更する状態
          this.currentState = 4
        } else {
          // エラー
          console.error('State error: ', state)
        }
      })
    }).catch(error => {
      console.error(error)
    })
  }
}
</script>

<style scoped>

</style>
