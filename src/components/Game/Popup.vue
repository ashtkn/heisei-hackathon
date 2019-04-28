<template>
<div>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="900px" height="900px" viewBox="0, 0, 950, 693">
    <!-- ポップアップのパネル -->
    <foreignObject x="-15" y="0" width="980" height="693">
      <img v-bind:src="backgroundImage" width="980" height="693">
    </foreignObject>
    <!-- ポイントの背景 -->
    <ellipse transform="translate(780 50)" rx="150" ry="75" v-bind:fill="popupRgb" stroke-width="20"></ellipse>
    <!-- 日付 -->
    <text x="459" y="70" font-size="50px" font-weight="bold" text-anchor="middle" style="font-family: 'M PLUS Rounded 1c';">{{popupDate}}</text>
    <!-- タイトル -->
    <text x="459" y="170" font-size="50px" font-weight="bold" text-anchor="middle" style="font-family: 'M PLUS Rounded 1c';">{{popupTitle}}</text>
    <!-- ポイント -->
    <text x="777" y="73" font-size="60px" font-weight="bold" text-anchor="middle" fill="white" style="text-shadow:5px 5px 1px #999999; font-family: 'M PLUS Rounded 1c';">{{popupPoint}}</text>
    <!-- 画像 -->
    <image v-bind:xlink:href="popupImg" preserveAspectRatio="xMidYMid" x="0" y="190" width="918" height="300" />
    <!-- 説明 -->
    <foreignObject x="50" y="500" width="830" height="500" font-size="35">
      <p xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'M PLUS Rounded 1c'; text-align : left;">{{popupDescription}}</p>
    </foreignObject>
    <!-- 閉じるボタン -->
    <foreignObject x="400" y="610" width="800" height="500" font-size="35">
      <button class="button" @click="$emit('close-popup')">CLOSE</button>
    </foreignObject>
  </svg>
</div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    popupRgb: String,
    popupDate: String,
    popupTitle: String,
    popupPoint: String,
    popupDescription: String,
    popupImg: String
  },
  data () {
    return {
      backgroundImage: require('@/assets/popuprect.svg')
    }
  }
}
</script>

<style scoped>
.wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  width: 140px;
  height: 45px;
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: bold;
  color: orange;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.button:hover {
  background-color: orange;
  box-shadow: 0px 15px 20px rgba(255, 165, 0, 0.4);
  color: #fff;
}
</style>
