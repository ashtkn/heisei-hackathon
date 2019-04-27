<template>
  <div>
<svg class="Space"
 xmlns="http://www.w3.org/2000/svg"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 width="200px" height="200px" viewBox="0, 0, 600, 600">
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
<path id="rgb" fill-rule="evenodd"  v-bind:fill="spaceRgb"
 d="M57.000,6.000 L457.000,6.000 C484.614,6.000 507.000,28.386 507.000,56.000 L507.000,456.000 C507.000,483.614 484.614,506.000 457.000,506.000 L57.000,506.000 C29.386,506.000 7.000,483.614 7.000,456.000 L7.000,56.000 C7.000,28.386 29.386,6.000 57.000,6.000 Z"/>
</g>
<path fill="url(#PSgrad_0)"
 d="M57.000,6.000 L457.000,6.000 C484.614,6.000 507.000,28.386 507.000,56.000 L507.000,456.000 C507.000,483.614 484.614,506.000 457.000,506.000 L57.000,506.000 C29.386,506.000 7.000,483.614 7.000,456.000 L7.000,56.000 C7.000,28.386 29.386,6.000 57.000,6.000 Z"/>

 <!-- <text x="43%" y="20%" text-anchor="middle"
       font-family="Verdana" font-size="55" fill="white" >
 {{spaceTitle}}
 </text> -->


 <foreignObject x="25" y="5%" width="450" height="500" font-size="55" >
 <p xmlns="http://www.w3.org/1999/xhtml" style="  color:white;
   font-weight: bold; text-shadow: 5px 5px 1px #999999;">{{spaceDate}}</p>
 </foreignObject>

 <foreignObject x="25" y="33%" width="450" height="500" font-size="55" >
 <p xmlns="http://www.w3.org/1999/xhtml" style="  color:white;
   font-weight: bold; text-shadow: 5px 5px 1px #999999;">{{spaceTitle}}</p>
 </foreignObject>

 <foreignObject x="25" y="60%" width="450" height="500" font-size="80" >
 <p xmlns="http://www.w3.org/1999/xhtml" style="  color:white;
   font-weight: bold; text-shadow: 5px 5px 1px #999999;">{{spacePoint}}</p>
 </foreignObject>

</svg>
  </div>
</template>

<script>
export default {
  name: 'Space',
  props: ['spaceRgb','spaceDate','spaceTitle','spacePoint']
}
</script>

<style scoped>

</style>
