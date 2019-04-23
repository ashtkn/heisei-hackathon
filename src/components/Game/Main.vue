<template>
  <b-container>
    <div>ゲームのメイン画面です</div>
    <roulette></roulette>
  </b-container>
</template>

<script>
import Roulette from '@/components/Game/Roulette'
export default {
  name: 'Game',
  components: {
    Roulette: Roulette
  }
}
</script>

<style scoped>

</style>
