<template>
  <b-container>
    <div>ゲームのメイン画面です</div>
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
      gameId: ''
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
          name: 'Player 0',
          currentSpace: 0,
          currentPoint: 1000
        },
        {
          name: 'Player 1',
          currentSpace: 0,
          currentPoint: 500
        }
      ],
      gameStatus: {
        currentTurn: 0,
        currentPlayer: 0,
        currentState: 0,
        remainingSteps: 0
      }
    }).then(() => {
      console.log('Successfully written document')
    }).catch(error => {
      console.error(error)
    })
  }
}
</script>

<style scoped>

</style>
