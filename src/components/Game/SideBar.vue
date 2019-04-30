<template>
  <b-container id="sideBar">
    <!--<p class="mb5"></p>-->
    <h3><img src="../../assets/title_left.png" width="10%">平成を振り返るすごろく<img src="../../assets/title_right.png" width="10%"></h3>
    <b-table id="table" striped hover v-bind:items="gamePlayersTable"></b-table>
    <h5>現在のプレーヤー:<br> {{ currentPlayerName }}</h5>
    <h5>現在のターン: {{Math.floor(currentTurn / 4) + 1}}</h5>
    <p class="mb5"></p>
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
      if (data === undefined || data === null) { return }
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
#sideBar{
  /*padding: 0px 0px 100px 0px;*/
}

h3{
  font-size: 2rem;
}

h5{
  /*font-size: 35px;*/
}

#table{
  font-size: 1.5rem;
}

.mb5{
   margin-top: 3em;
}

</style>
