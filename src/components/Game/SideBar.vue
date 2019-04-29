<template>
  <b-container>
    <h1>平成を振り返るすごろく</h1>
    <b-table striped hover v-bind:items="gamePlayersTable"></b-table>
    <h5>現在のプレーヤー: {{ currentPlayerName }}</h5>
    <h5>現在のターン: {{Math.floor(currentTurn / 2) + 1}}</h5>
  </b-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'SideBar',
  props: {
    gameId: String
  },
  data () {
    return {
      currentTurn: 0,
      currentPlayerIndex: 0,
      gamePlayers: [],
      currentPoints: [],
      currentSteps: []
    }
  },
  computed: {
    currentPlayerName: function () {
      if (this.gamePlayers.length === 0) {
        return null
      }
      return this.gamePlayers[this.currentPlayerIndex]
    },
    gamePlayersTable: function () {
      if (this.gamePlayers === null) {
        return null
      }
      return this.gamePlayers.map((value, index, array) => {
        return {
          player: value,
          point: this.currentPoints[index],
          steps: this.currentSteps[index]
        }
      })
    }
  },
  created () {
    const db = firebase.firestore()
    const gameId = this.gameId
    db.collection('games').doc(gameId).onSnapshot(document => {
      const data = document.data()
      if (data === null) { return }
      this.currentTurn = data.currentTurn
      this.gamePlayers = data.gamePlayers
      this.currentPlayerIndex = data.currentPlayer
      this.currentPoints = data.currentPoints
      this.currentSteps = data.currentSteps
    })
  }
}
</script>

<style scoped>

</style>
