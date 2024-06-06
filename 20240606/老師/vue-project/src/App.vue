<template lang="pug">
TopImage
#left
  LeftMenu
#right
  RightMarquee
  #page
    //- 也可以寫成 router-view
    RouterView
</template>

<style lang="sass">
#app
  width: 1024px
  height: 768px
  margin: auto
</style>

<style lang="sass" scoped>
#left
  width: 200px
  height: calc(768px - 20px - 65px)
  float: left
  background: darken(#0ff, 10%)
  margin-left: 12px
#right
  width: calc(1000px - 200px)
  height: calc(768px - 20px - 65px)
  float: left
  margin-right: 12px
</style>

<script setup>
import TopImage from '@/components/TopImage.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import RightMarquee from '@/components/RightMarquee.vue'
</script>
