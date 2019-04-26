<template>
  <b-container>
    <div>ゲームのメイン画面です</div>
    <my-roulette></my-roulette>
    <my-map></my-map>
  </b-container>
</template>

<script>
import Roulette from '@/components/Game/Roulette'
import Map from '@/components/Game/Map'
import firebase from 'firebase'
export default {
  name: 'Game',
  components: {
    MyRoulette: Roulette,
    MyMap: Map
  },
  data () {
    return {
      userId: '',
      gameId: ''
    }
  },
  created () {
    const db = firebase.firestore()
    this.userId = firebase.auth().currentUser.uid
    // Create game data
    const uuid = require('uuid/v1')
    this.gameId = uuid()
    db.collection('games').doc(this.gameId).set({
      gameId: this.gameId,
      userId: this.userId,
      gameStatus: {
        currentTurn: 0,
        currentPlayer: 0,
        currentStatus: 0
      },
      gamePlayers: [
        {
          name: 'Player 0',
          currentSpace: 0,
          currentPoint: 1000
        },
        {
          name: 'Player 1',
          currentSpace: 0,
          currentPoint: 1000
        }
      ]
    }).then(() => {
      console.log('Successfully written document')
    }).catch(error => {
      console.error(error)
    })
    // Fetch spaces data
  }
}
</script>

<style scoped>

</style>
