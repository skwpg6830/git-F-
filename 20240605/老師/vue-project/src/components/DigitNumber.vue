<template>
<svg version="1.1" class="number" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="318.1px" height="520.604px" viewBox="0 0 318.1 520.604" enable-background="new 0 0 318.1 520.604" xml:space="preserve">
  <rect class="number-A" :class="{ active: '02356789'.includes(data) }" x="0.996" fill="#E60012" stroke="#231815" stroke-miterlimit="10" width="316.108" height="15.437"/>
  <rect class="number-B" :class="{ active: '045689'.includes(data) }" x="0" y="26.497" fill="#E60012" stroke="#231815" stroke-miterlimit="10" width="20.134" height="220.805"/>
  <rect class="number-C" :class="{ active: '01234789'.includes(data) }" x="295.974" y="26.497" fill="#E60012" stroke="#231815" stroke-miterlimit="10" width="20.133" height="220.805"/>
  <rect class="number-D" :class="{ active: '2345689'.includes(data) }" y="255.047" fill="#E60012" stroke="#231815" stroke-miterlimit="10" width="316.107" height="15.437"/>
  <rect class="number-E" :class="{ active: '0268'.includes(data) }" x="0" y="278.504" fill="#E60012" stroke="#231815" stroke-miterlimit="10" width="20.134" height="220.805"/>
  <rect class="number-F" :class="{ active: '013456789'.includes(data) }" x="297.967" y="278.503" fill="#E60012" stroke="#231815" stroke-miterlimit="10" width="20.133" height="220.806"/>
  <rect class="number-G" :class="{ active: '0235689'.includes(data) }" x="0.996" y="505.168" fill="#E60012" stroke="#231815" stroke-miterlimit="10" width="316.108" height="15.437"/>
</svg>
</template>

<script setup>
defineProps(['data'])
</script>

<style scoped lang="sass">
.number
  margin: 10px
rect
  fill: transparent
  &.active
    fill: #E60012
</style>
