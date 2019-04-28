<template>
  <b-container>
    <h1>平成を振り返るすごろく</h1>
    <b-table striped hover v-bind:items="gamePlayersTable"></b-table>
    <div>GAME ID: {{ gameId }}</div>
    <div>現在のプレーヤー: {{ currentPlayerName }}</div>
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
      return this.gamePlayers[this.currentPlayerIndex].name
    },
    gamePlayersTable: function () {
      if (this.gamePlayers === null) {
        return null
      }
      return this.gamePlayers.map((value, index, array) => {
        return {
          player: value.name,
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
      const source = document.metadata.hasPendingWrites ? 'Local' : 'Server'
      const data = document.data()
      console.log(source, ' data: ', data)
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
