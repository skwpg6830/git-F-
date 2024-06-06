<template lang="pug">
RouterLink(to="/yangminshan") 陽明山
RouterLink(:to="{ name: 'home'}") 首頁
//- router-link
table
  template(v-for="(link, i) in links" :key="i")
    tr
      td
        RouterLink(:to="link.to")
          img(:src="link.img")
    tr
      td &nbsp;
</template>

<script setup>
const links = [
  { to: '/yangminshan', img: new URL('@/assets/park0302.jpg', import.meta.url).href },
  { to: '/sheipa', img: new URL('@/assets/park0303.jpg', import.meta.url).href },
  { to: '/', img: new URL('@/assets/park0304.jpg', import.meta.url).href },
  { to: '/', img: new URL('@/assets/park0305.jpg', import.meta.url).href }
]
</script>

<style lang="sass" scoped>
table
  width: 200px
  text-align: center
  img
    width: 120px
    height: 40px
    &:hover
      filter: hue-rotate(180deg)
</style>
