<template>
  <b-container>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <svg
      id="mysvg"
      viewBox="0 0 200 120"
      @mousemove="drag($event)"
      @mouseup="dragStop($event)">
      <!-- パイの切れ端 -->
      <g v-for="(item, index) in items" v-bind:key="index">
        <path
          :fill="item.fill"
          :d="item.d"
          stroke="#d8d8d8"
          stroke-width="0.5"
          @mousedown="dragStart(index, $event)"
          @mouseenter="startMouseOverPie(index)"
          @mouseleave="finishMouseOverPie(index)"
        />
        <text
          :x="item.textX"
          :y="item.textY"
          :class="item.textSize"
          text-anchor="middle"
          user-select="none"
          dominant-baseline="central"
          @mousedown="dragStart(index, $event)"
          @mouseenter="startMouseOverPie(index)"
          @mouseleave="finishMouseOverPie(index)">
          {{item.text}}
        </text>
      </g>
      <!-- ドラッグ中のパイ型 -->
      <path
        :fill="dragItem.fill"
        stroke="#d8d8d8"
        stroke-width="0.5"
        opacity="0.5"
        :d="dragItem.d"
      />
      <!-- 回転するフォーカス -->
      <path
        v-if="showFocus"
        fill="#ffffff"
        stroke="#d8d8d8"
        stroke-width="0.5"
        opacity="0.9"
        :d="focusItem"
      />
      <!-- 真ん中のルーレットスイッチ -->
      <circle
        :cx="cx"
        :cy="cy"
        :r="sr"
        :fill="fillSwitch"
        stroke-width="0.5"
        stroke="white"
        @mouseup="switchRoulette"
        @mouseenter="startMouseOverSwitch"
        @mouseleave="finishMouseOverSwitch"
      />
      <!-- 現在の数値 -->
      <text
        v-if="showCurrent"
        :x="cx"
        :y="cy"
        text-anchor="middle"
        user-select="none"
        dominant-baseline="central"
        @mouseup="switchRoulette"
        @mouseenter="startMouseOverSwitch"
        @mouseleave="finishMouseOverSwitch"
      >
        {{items[focusIndex].text}}
      </text>
      <!-- 確定した数字 -->
      <text
        v-if="showFixedNum"
        :x="cx"
        :y="cy"
        class="fixedNum animated flash faster"
        text-anchor="middle"
        user-select="none"
        dominant-baseline="central"
        @mouseup="switchRoulette"
        @mouseenter="startMouseOverSwitch"
        @mouseleave="finishMouseOverSwitch"
      >
        {{items[focusIndex].text}}
      </text>
    </svg>
    <div v-if="readyToStart">プレーヤーX のターンです！</div>
  </b-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Roulette',
  props: {
    gameId: {
      type: String,
      required: true
    },
    isEnabled: {
      type: Boolean,
      required: true
    }
  },
  data: function () {
    return {
      cx: 100, // 円の中心座標
      cy: 60, // 円の中心座標
      r: 50, // 円の半径
      sr: 20, // スイッチの半径
      number: 10, // 数字の数
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // 残っている数
      dragStartPos: {x: 0, y: 0}, // パイのドラッグ量計算用
      movePos: {x: 0, y: 0}, // パイのドラッグ量計算用
      dragIndex: -1, // パイのドラッグ量計算用
      dragPos: [], // パイのドラッグ量計算用
      focusItem: null, // 回るフォーカス
      focusIndex: 0, // 回るフォーカス
      interval: 10, // 回るフォーカス
      status: 'stop', // stop / running / breaking / pause
      vSwitch: 0.84, // スイッチの色の濃さ
      highlightPieIndex: -1, // ハイライトされたパイのインデックス
      jitterBase: [-3, -2, -1, 0, 1, 2, 3],
      readyToStart: this.isEnabled
    }
  },
  watch: {
    number: function (newValue, oldValue) {
      let numbers = []
      for (let i = 0; i < this.number; i++) {
        numbers.push(i + 1)
      }
      this.numbers = numbers
    }
  },
  methods: {
    hsvToRgb: function (H, S, V) {
      const C = V * S
      const Hp = H / 60
      const X = C * (1 - Math.abs(Hp % 2 - 1))
      let R, G, B
      if (Hp >= 0 && Hp < 1) {
        [R, G, B] = [C, X, 0]
      }
      if (Hp >= 1 && Hp < 2) {
        [R, G, B] = [X, C, 0]
      }
      if (Hp >= 2 && Hp < 3) {
        [R, G, B] = [0, C, X]
      }
      if (Hp >= 3 && Hp < 4) {
        [R, G, B] = [0, X, C]
      }
      if (Hp >= 4 && Hp < 5) {
        [R, G, B] = [X, 0, C]
      }
      if (Hp >= 5 && Hp < 6) {
        [R, G, B] = [C, 0, X]
      }

      const m = V - C;
      [R, G, B] = [R + m, G + m, B + m]
      R = Math.floor(R * 255)
      G = Math.floor(G * 255)
      B = Math.floor(B * 255)
      const rgb = [R, G, B]
      return '#' + rgb.map(function (value) {
        const hx = parseInt(value).toString(16)
        if (hx.length === 1) return '0' + hx
        return hx
      }).join('')
    },
    d: function (pos) {
      return 'M ' + pos[0] + ' ' + pos[1] + ' L ' + pos[2] + ' ' + pos[3] + ' A ' + this.r + ' ' + this.r + ' 0 0 0 ' + pos[4] + ' ' + pos[5] + ' Z'
    },
    parseD: function (d) {
      const pd = d.split(' ')
      return [
        Number(pd[1]),
        Number(pd[2]),
        Number(pd[4]),
        Number(pd[5]),
        Number(pd[12]),
        Number(pd[13])
      ]
    },
    dragStart: function (index, event) {
      if (this.status === 'running' || this.status === 'breaking') return
      if (this.numbers.length === 2) return
      this.dragStartPos = this.getSvgPos(event)
      this.movePos = {x: 0, y: 0}
      this.dragIndex = index
      this.dragPos = this.parseD(this.items[index].d)
    },
    drag: function (event) {
      if (this.status === 'running') return
      if (this.dragIndex !== -1) {
        const currentPos = this.getSvgPos(event)
        this.movePos = {
          x: currentPos.x - this.dragStartPos.x,
          y: currentPos.y - this.dragStartPos.y
        }
      }
    },
    dragStop: function (event) {
      if (this.status === 'running') return
      if (this.dragIndex === -1) return
      const currentPos = this.getSvgPos(event)
      if (this.isOut(currentPos.x, currentPos.y)) {
        // 円の外なら削除
        this.numbers.splice(this.dragIndex, 1)
      }
      // 削除によってフォーカス対象がなくなったときのための処理
      if (this.focusIndex > this.items.length - 1) {
        this.focusIndex = this.items.length - 1
      }
      this.dragPos = []
      this.dragIndex = -1
    },
    switchRoulette: function (event) {
      // ルーレット停止または一時停止
      if (!this.readyToStart) {
        console.log('Roulette is not enabled.')
        return
      }
      if (this.status === 'stop' || this.status === 'pause') {
        // ルーレット開始
        this.interval = 50
        this.status = 'running'
        const jitter = this.jitterBase[Math.floor(Math.random() * 7)]
        const self = this
        const db = firebase.firestore()
        const gameId = self.gameId
        db.collection('games').doc(gameId).update({
          currentState: 1
        }).then(() => {
          console.log('Current state: 1')
        }).catch(error => {
          console.error(error)
        })
        setTimeout(function countDown () {
          // ルーレット一時停止
          if (self.interval > 400) {
            const steps = Number(self.items[self.focusIndex].text)
            console.log('Roulette paused: ', steps)
            self.status = 'pause'
            db.collection('games').doc(gameId).update({
              remainingSteps: steps,
              currentState: 2
            }).then(() => {
              console.log('Current state: 2')
            }).catch(error => {
              console.error(error)
            })
            return
          }
          const base64 = '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'

          const sound = new Audio('data:audio/mp3;base64,' + base64)
          sound.play()
          if (self.focusIndex > 0) {
            self.focusIndex--
          } else {
            self.focusIndex = self.numbers.length - 1
          }
          self.focusItem = self.items[self.focusIndex].d
          // ブレーキ中はインターバルを増やしていく
          if (self.status === 'breaking') {
            self.interval += 16 + jitter
          }
          setTimeout(countDown, self.interval)
        }, this.interval)
      } else if (this.status === 'running') {
        // ルーレット中にブレーキON
        this.status = 'breaking'
      } else if (this.status === 'breaking') {
        // ブレーキ中は無効
      }
    },
    isOut: function (x, y) {
      return ((Math.pow((this.cx - x), 2) + Math.pow((this.cy - y), 2)) > Math.pow(this.r, 2))
    },
    getSvgPos: function (event) {
      const svg = document.getElementById('mysvg')
      let pt = svg.createSVGPoint()
      pt.x = event.clientX
      pt.y = event.clientY
      return pt.matrixTransform(svg.getScreenCTM().inverse())
    },
    startMouseOverSwitch: function () {
      this.vSwitch += 0.1
    },
    finishMouseOverSwitch: function () {
      this.vSwitch -= 0.1
    },
    startMouseOverPie: function (index) {
      if (this.status === 'stop' || this.status === 'pause') {
        this.highlightPieIndex = index
      }
    },
    finishMouseOverPie: function (index) {
      this.highlightPieIndex = -1
    }
  },
  computed: {
    items: function () {
      let items = []
      const th = 2 * Math.PI / this.numbers.length
      for (let i = 0; i < this.numbers.length; i++) {
        const x0 = this.cx + this.r * Math.cos(-i * th)
        const y0 = this.cy + this.r * Math.sin(-i * th)
        const x1 = this.cx + this.r * Math.cos(-(i + 1) * th)
        const y1 = this.cy + this.r * Math.sin(-(i + 1) * th)
        const d = this.d([this.cx, this.cy, x0, y0, x1, y1])
        let v = 0.9
        if (this.highlightPieIndex === i) {
          v = 1.0
        }
        const fill = this.hsvToRgb(i * 360 / this.numbers.length, 1, v)
        const textX = this.cx + this.r * 0.8 * Math.cos(-(i + 0.5) * th)
        const textY = this.cy + this.r * 0.8 * Math.sin(-(i + 0.5) * th)
        let textSize = 'size20'
        if (this.numbers.length > 6) {
          textSize = 'size10'
        }
        if (this.numbers.length > 20) {
          textSize = 'size4'
        }
        items.push(
          {
            d: d,
            fill: fill,
            textX: textX,
            textY: textY,
            text: this.numbers[i],
            textSize: textSize
          }
        )
      }
      return items
    },
    dragItem: function () {
      if (this.dragPos.length > 0) {
        const newDragPos = [
          this.dragPos[0] + this.movePos.x,
          this.dragPos[1] + this.movePos.y,
          this.dragPos[2] + this.movePos.x,
          this.dragPos[3] + this.movePos.y,
          this.dragPos[4] + this.movePos.x,
          this.dragPos[5] + this.movePos.y
        ]
        return {
          d: this.d(newDragPos),
          filla: this.items[this.dragIndex].fill
        }
      } else {
        return {}
      }
    },
    // ルーレットが回っているかブレーキを掛けている途中か
    showCurrent: function () {
      return this.status === 'running' || this.status === 'breaking'
    },
    // ルーレット確定状態
    showFixedNum: function () {
      return this.status === 'pause'
    },
    showFocus: function () {
      return this.status === 'running' || this.status === 'breaking'
    },
    canEdit: function () {
      // return this.status === 'stop'
      return false
    },
    // スイッチの色
    fillSwitch: function () {
      return this.hsvToRgb(0, 0, this.vSwitch)
    }
  }
}
</script>

<style scoped>
div {
  border: #d0d0d0 10px;
  font-size: 24px;
}

svg {
  user-select: none;
}

input {
  font-size: 24px;
  text-align: right;
}

.fixedNum {
  animation-iteration-count: 3
}

.size4 {
  font-size: 8px;
}

.size10 {
  font-size: 10px;
}

.size20 {
  font-size: 16px;
}
</style>
