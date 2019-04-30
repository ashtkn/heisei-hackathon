<template>
<div id="map">
  <!--<my-space v-bind:spaceRgb="rgbPlus" spaceTitle="#日本人初の宇宙飛行士" spaceDate="2003/05/07" spacePoint="+500P"></my-space>-->
  <!--<my-space v-bind:spaceRgb="rgbMinus" spaceTitle="たまごっち発売！！" spaceDate="2003/05/07" spacePoint="-500P"></my-space>-->
  <p class="mb5"></p>
  <my-popup class="popup"
    popup-rgb='rgba(255,30,60,0.7)'
    v-if="showPopup"
    v-bind:popup-title="popupData.title"
    v-bind:popup-date="popupData.date"
    v-bind:popup-point="popupData.point"
    v-bind:popup-description="popupData.description"
    v-bind:popup-img="popupData.image"
    v-on:close-popup="closePopup"
  ></my-popup>

  <a></a>
  <my-space class="space"
    v-for="(space, index) in spaces"
    v-bind:id="['space' + index]"
    v-bind:key="index"
    v-bind:index="index"
    v-bind:currentSteps0="currentSteps0"
    v-bind:currentSteps1="currentSteps1"
    v-bind:currentSteps2="currentSteps2"
    v-bind:currentSteps3="currentSteps3"
    v-bind:space-rgb="space.color"
    v-bind:space-title="space.title"
    v-bind:space-date="space.date"
    v-bind:space-point="space.point"
    >
  </my-space>
  <!--<my-popup-->
  <!--popup-rgb='rgba(255,30,60,0.7)'-->
  <!--popup-title='#たまごっち発売'-->
  <!--popup-date='2019/03/31'-->
  <!--popup-point='-600P'-->
  <!--popup-description='朝起きたらたまごっちが死んでいた！昨晩から調子が悪かったがまさか夜の間に死んでしまうとは…'-->
  <!--v-bind:popup-img="image"-->
  <!--v-on:close-popup="closePopup"-->
  <!--&gt;</my-popup>-->
</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import vueSmoothScroll from 'vue-smooth-scroll'
// Vue.use(vueSmoothScroll)
import firebase from 'firebase'
import Space from '@/components/Game/Space'
import Popup from '@/components/Game/Popup'
export default {
  name: 'Map',
  components: {
    MySpace: Space,
    MyPopup: Popup
  },
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  methods: {
    closePopup: function () {
      const db = firebase.firestore()
      db.collection('games').doc(this.gameId).update({
        currentState: 4
      }).then(() => {
        console.log('Current state: 4')
      }).catch(error => {
        console.error(error)
      })
    },
    dateToString: function (rawDate) {
      const year = rawDate.getFullYear() - 1988
      const month = ('00' + (rawDate.getMonth() + 1)).slice(-2)
      const day = ('00' + rawDate.getDate()).slice(-2)
      return `H.${year}/${month}/${day}`
    }
  },
  data () {
    return {
      spaces: [],
      showPopup: false,
      currentSteps0: 0,
      currentSteps1: 0,
      currentSteps2: 0,
      currentSteps3: 0,
      popupData: {
        title: '',
        date: '',
        point: 0,
        description: '',
        image: ''
      }
    }
  },
  created () {
    const gameId = this.gameId
    const db = firebase.firestore()
    // マスのデータを取得
    db.collection('spaces').orderBy('date', 'asc').limit(50).get().then(querySnapshot => {
      querySnapshot.forEach(document => {
        const data = document.data()
        this.spaces.push({
          title: `#${data.title}`,
          description: data.description,
          date: this.dateToString(data.date.toDate()),
          point: data.point,
          image: data.image,
          color: data.color
        })
      })
    }).catch(error => {
      console.error(error)
    })
    // ゲームデータのドキュメントリスナーをセット
    db.collection('games').doc(gameId).onSnapshot(document => {
      const data = document.data()
      if (data === undefined || data === null) { return }
      const state = data.currentState
      const currentPlayerIndex = data.currentPlayer
      const currentSpaceIndex = data.currentSteps[currentPlayerIndex]
      const currentSpace = this.spaces[currentSpaceIndex]
      // 状態に応じた処理をする
      if (state === 0) {
        // ルーレットを回せる状態
      } else if (state === 1) {
        // ルーレットを回している状態
      } else if (state === 2) {
        // ルーレットを回し終わって移動している状態
        const currentSteps = data.currentSteps
        const currentPlayerCurrentSteps = currentSteps[currentPlayerIndex]
        let remainingSteps = data.remainingSteps
        // ゴールしたかどうかの判定
        if (currentPlayerCurrentSteps + remainingSteps >= this.spaces.length) {
          console.log('ゴールしました')
          remainingSteps = (this.spaces.length - 1) - currentPlayerCurrentSteps
        }
        const nextSteps = currentSteps.map((value, index, array) => {
          if (index === currentPlayerIndex) {
            return value + remainingSteps
          } else {
            return value
          }
        })
        // 状態のアップデート
        // if (this.spaces[index] <= currentPlayerCurrentSteps){
        //   showplayer3: true
        // } else{
        //   showplayer3: false
        // }

        db.collection('games').doc(gameId).update({
          currentSteps: nextSteps,
          remainingSteps: 0,
          currentState: 3
        }).then(() => {
          console.log('Current state: 3')
        }).catch(error => {
          console.error(error)
        })
        if (currentPlayerIndex === 0) {
          this.currentSteps0 = nextSteps[0]
          console.log('0の今のマスは' + nextSteps[0] + 1)
        } else if (currentPlayerIndex === 1) {
          this.currentSteps1 = nextSteps[1]
          console.log('1の今のマスは' + nextSteps[1] + 1)
        } else if (currentPlayerIndex === 2) {
          this.currentSteps2 = nextSteps[2]
          console.log('2の今のマスは' + nextSteps[2] + 1)
        } else if (currentPlayerIndex === 3) {
          this.currentSteps3 = nextSteps[3]
          console.log('3の今のマスは' + nextSteps[3] + 1)
        }
      } else if (state === 3) {
        // 移動が終了してマスの詳細を表示している状態
        this.showPopup = true
        // イメージのURLを取得
        firebase.storage().refFromURL(currentSpace.image).getDownloadURL().then(url => {
          this.popupData = {
            title: currentSpace.title,
            description: currentSpace.description,
            date: currentSpace.date,
            point: currentSpace.point,
            image: url
          }
        }).catch(error => {
          console.error(error)
        })
      } else if (state === 4) {
        // マスの詳細を閉じてポイント計算をしてプレーヤーを変更する状態
        this.showPopup = false
        const currentPoints = data.currentPoints
        const nextPoints = currentPoints.map((value, index, array) => {
          if (index === currentPlayerIndex) {
            return value + currentSpace.point
          } else {
            return value
          }
        })
        const nextTurn = data.currentTurn + 1
        // TODO: 変更
        let nextPlayer = data.currentPlayer + 1
        if (nextPlayer === 4) {
          nextPlayer = 0
        }
        // 状態のアップデート
        db.collection('games').doc(gameId).update({
          currentPoints: nextPoints,
          currentTurn: nextTurn,
          currentPlayer: nextPlayer,
          currentState: 0
        }).then(() => {
          console.log('Going to next turn')
        }).catch(error => {
          console.error(error)
        })
      } else {
        console.error('State error: ', state)
      }
    })
  }
}
</script>

<style scoped>
.popup{
  position: -webkit-sticky;
  position: sticky;
  top: 50%;
  transform: translate(0%, -50%);
  width: 100%;
  z-index: 3;
}
.mb5{
   margin-top: 3em;
}

</style>
