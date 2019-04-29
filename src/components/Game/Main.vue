<template>
  <b-container fluid id="mainContainer">
    <my-side-bar v-bind:game-id="gameId" class="sideBar"></my-side-bar>
    <div class="row">
      <div class="col-sm">
        <my-roulette v-bind:game-id="gameId" class="roulette"></my-roulette>
      </div>
      <div class="col-6">
        <my-map v-bind:game-id="gameId"></my-map>
      </div>
    </div>
  </b-container>
</template>

<script>
import SideBar from '@/components/Game/SideBar'
import Roulette from '@/components/Game/Roulette'
import Map from '@/components/Game/Map'
import firebase from 'firebase'
import {uuid} from 'vue-uuid'

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
.roulette {
  position: -webkit-sticky; /* safari対応 */
  position: sticky;
  top: 500px; /* 上端から10pxのところで固定 */
  width: 500px;
  z-index: 1;
}

.sideBar {
  background: #fff;
  position: -webkit-sticky; /* safari対応 */
  position: sticky;
  top: 0px; /* 上端から10pxのところで固定 */
  z-index: 2;
}
#mainContainer {
  /*width: 200%;*/
  background: #f7f7f7 url("../../assets/maphaikei.png") center top/cover no-repeat;
}
</style>
