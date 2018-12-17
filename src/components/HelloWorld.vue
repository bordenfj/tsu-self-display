<template>
  <div
  ref="container"
    class="marquee"
  >
    <div
      ref="text"
      class="text"
      :style="{ 'animation-duration': `${animationDuration}s` }"
    >{{text}}</div>
  </div>
</template>

<script lang="ts" src="./HelloWorld.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@keyframes slide {
  from { left: 100%; transform: translate(0, 0); }
  to { left: -100%; transform: translate(-100%, 0); }
}
@-webkit-keyframes slide {
  from { left: 100%; transform: translate(0, 0); }
  to { left: -100%; transform: translate(-100%, 0); }
}

@import url(http://fonts.googleapis.com/earlyaccess/jejugothic.css);

.marquee {
  color:red;
  background-color: black;
  width:100%;
  height:120px;
  line-height:120px;
  overflow:hidden;
  position:relative;
}

.text {
  position:absolute;
  top:0;
  white-space: nowrap;
  height:120px;
  font-weight: bold;
  font-size:30px;
  animation-name: slide;
  animation-duration: 30s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  -webkit-animation-name: slide;
  -webkit-animation-duration: 30s;
  -webkit-animation-timing-function:linear;
  -webkit-animation-iteration-count: infinite;
  font-family: 'Jeju Gothic', serif;
}

</style>
