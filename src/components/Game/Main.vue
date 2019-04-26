<template>
  <b-container>
    <div>ゲームのメイン画面です</div>
    <roulette></roulette>
  </b-container>
</template>

<script>
import Roulette from '@/components/Game/Roulette'
import firebase from 'firebase'
export default {
  name: 'Game',
  components: {
    Roulette: Roulette
  },
  data () {
    return {
      userId: null,
      gameId: null
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
          point: 1000
        },
        {
          name: 'Player 1',
          point: 1000
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
