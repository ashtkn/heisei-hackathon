<template>
  <div>
    <head>
      <link href="https://fonts.googleapis.com/earlyaccess/nikukyu.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/earlyaccess/kokoro.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c" rel="stylesheet">
    </head>
    <svg
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="250px" height="250px" viewBox="0 0 600 600">
    <defs>
    <filter filterUnits="userSpaceOnUse" id="Filter_0" x="0px" y="0px" width="519px" height="519px"  >
        <feOffset in="SourceAlpha" dx="0" dy="3" />
        <feGaussianBlur result="blurOut" stdDeviation="3.162" />
        <feFlood flood-color="rgb(0, 0, 0)" result="floodOut" />
        <feComposite operator="atop" in="floodOut" in2="blurOut" />
        <feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
        <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="PSgrad_0" x1="0%" x2="0%" y1="100%" y2="0%">
      <stop offset="0%" stop-color="rgb(255,255,255)" stop-opacity="0.5" />
      <stop offset="100%" stop-color="rgb(255,255,255)" stop-opacity="0" />
    </linearGradient>

    </defs>
    <g filter="url(#Filter_0)">
    <path fill-rule="evenodd"  v-bind:fill="spaceRgb"
     d="M157.000,6.000 L357.000,6.000 C439.843,6.000 507.000,73.157 507.000,156.000 L507.000,356.000 C507.000,438.843 439.843,506.000 357.000,506.000 L157.000,506.000 C74.157,506.000 7.000,438.843 7.000,356.000 L7.000,156.000 C7.000,73.157 74.157,6.000 157.000,6.000 Z"/>
    </g>
    <path fill="url(#PSgrad_0)"
     d="M157.000,6.000 L357.000,6.000 C439.843,6.000 507.000,73.157 507.000,156.000 L507.000,356.000 C507.000,438.843 439.843,506.000 357.000,506.000 L157.000,506.000 C74.157,506.000 7.000,438.843 7.000,356.000 L7.000,156.000 C7.000,73.157 74.157,6.000 157.000,6.000 Z"></path>

 <foreignObject x="25" y="10%" width="450" height="500" font-size="55" >
 <p xmlns="http://www.w3.org/1999/xhtml" style="  color:white; font-weight: bold;font-family: 'M PLUS Rounded 1c'
   ">{{spaceDate}}</p>
 </foreignObject>

 <foreignObject x="25" y="30%" width="450" height="500" font-size="60" >
 <p xmlns="http://www.w3.org/1999/xhtml" style="  color:white;
   font-weight: bold; font-family: 'M PLUS Rounded 1c'; vertical-align: middle">{{spaceTitle}}</p>
 </foreignObject>

 <foreignObject x="25" y="65%" width="450" height="500" font-size="65" >
 <p xmlns="http://www.w3.org/1999/xhtml" style="  color:white;
   font-weight: bold; text-shadow: 5px 5px 1px #999999;font-family: 'M PLUS Rounded 1c';">{{spacePoint}}P</p>
 </foreignObject>

 <foreignObject x="40" y="150" width="200" height="200">
   <my-player1></my-player1>
 </foreignObject>

 <foreignObject x="260" y="150" width="200" height="200">
   <my-player2></my-player2>
 </foreignObject>

 <foreignObject x="40" y="330" width="200" height="200">
   <my-player3></my-player3>
 </foreignObject>

 <foreignObject x="260" y="330" width="200" height="200">
   <my-player4></my-player4>
 </foreignObject>

</svg>

  </div>
</template>

<script>
import Player1 from '@/components/Game/Player1'
import Player2 from '@/components/Game/Player2'
import Player3 from '@/components/Game/Player3'
import Player4 from '@/components/Game/Player4'
export default {
  name: 'Space',
  components: {
    myPlayer1: Player1,
    myPlayer2: Player2,
    myPlayer3: Player3,
    myPlayer4: Player4
  },
  props: {
    spaceRgb: String,
    spaceDate: String,
    spaceTitle: String,
    spacePoint: Number
  }
}
</script>

<style scoped>

</style>
