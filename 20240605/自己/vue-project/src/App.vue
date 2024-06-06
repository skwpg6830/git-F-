<template lang="pug">
TopImage
#left
    LeftMenu
#right
</template>

<script setup>
import TopImage from './components/Toplmage.vue'
import LeftMenu from './components/LeftMenu.vue'
</script>

<style scoped lang="sass">
#left
    width: 215px
    height: 683px
    float: left
#right
    width: 770px
    height: 683px
    float: right
</style>
