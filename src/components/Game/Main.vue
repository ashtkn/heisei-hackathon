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
  props: {
    gamePlayers: Array
  },
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
    let gamePlayers = []
    if (this.gamePlayers === undefined || this.gamePlayers === null) {
      gamePlayers = ['名無しさん@お腹いっぱい 0', '名無しさん@お腹いっぱい 1']
    } else {
      gamePlayers = this.gamePlayers
    }
    const initialSteps = gamePlayers.map((value, index, array) => {
      return 0
    })
    const initialPoints = gamePlayers.map((value, index, array) => {
      return 1000
    })
    const db = firebase.firestore()
    db.collection('games').doc(this.gameId).set({
      date: new Date(),
      gameId: this.gameId,
      gamePlayers: gamePlayers,
      currentSteps: initialSteps,
      currentPoints: initialPoints,
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
