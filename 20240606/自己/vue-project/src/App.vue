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
  height: 683px
  float: left
  margin-left: 12px
  background: #0ff
#right
  width: 800px
  height: 683px
  float: right
  margin-right: 12px
</style>

<script setup>
import TopImage from '@/components/TopImage.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import RightMarquee from '@/components/RightMarquee.vue'
import { RouterView } from 'vue-router'
</script>
