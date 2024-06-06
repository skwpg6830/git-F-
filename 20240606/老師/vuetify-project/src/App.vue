<template lang="pug">
//- v-app
VApp
  VAppBar
    VContainer.d-flex.align-center
      VAppBarTitle 測試
      VBtn(prepend-icon="mdi-home" color="primary" to="/") 首頁
      VBtn(prepend-icon="mdi-account" color="success" to="/about") 測試
  VMain
    RouterView
</template>
