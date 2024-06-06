<template lang="pug">
v-app
  VAppBar
    VContainer.d-flex.align-center
     VAppBarTitle 測試
     VBtn(prepend-icon="mdi-human-baby-changing-table" color="warning" to="/") 首頁
     VBtn(prepend-icon="mdi-robot-off-outline" color="error" to="/about") 測試
  VMain
    RouterView
</template>