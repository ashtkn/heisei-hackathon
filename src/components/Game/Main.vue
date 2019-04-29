<template>
  <b-container>
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
      gamePlayers: ['Player 0', 'Player 1'],
      currentSteps: [0, 0],
      currentPoints: [1000, 500],
      currentTurn: 0,
      currentPlayer: 0,
      currentState: 0,
      remainingSteps: 0
    }).then(() => {
      console.log('App initialized')
    }).catch(error => {
      console.error(error)
    })
  }
}
</script>

<style scoped>

</style>
