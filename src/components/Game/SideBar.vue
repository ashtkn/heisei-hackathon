<template>
  <b-container>
    <h1>平成を振り返るすごろく</h1>
    <b-table striped hover v-bind:items="gamePlayersTable"></b-table>
    <div>GAME ID: {{ gameId }}</div>
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
      gamePlayers: []
    }
  },
  computed: {
    gamePlayersTable: function () {
      return this.gamePlayers.map((value, index, array) => {
        return {
          player: value.name,
          point: value.currentPoint
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
    })
  }
}
</script>

<style scoped>

</style>
