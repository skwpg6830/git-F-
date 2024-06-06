<template lang="pug">
VContainer
  VRow(justify="center")
    VCol(cols="12")
      h1 首頁
    VCol(cols="12")
      p {{ userStore.number }}
      p {{ userStore.square }}
      p {{ number }}
      p {{ square }}
      VBtn(@click="userStore.plus") +
      VBtn(@click="userStore.minus") -
      VBtn(@click="plus") +
      VBtn(@click="minus") -
      VBtn(@click="number++") +
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

// 解構 store 的 state 或 getters 會失去響應性
// const { number, square } = userStore

// 使用 storeToRefs 在解構時維持響應性
const { number, square } = storeToRefs(userStore)

// function 固定不變，所以不需要 storeToRefs
const { plus, minus } = userStore
</script>
