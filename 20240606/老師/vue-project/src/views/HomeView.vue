<template lang="pug">
p {{ $route.name }}
p {{ $route.path }}
p {{ $route.fullPath }}
p {{ $route.meta.title }}
img(src="@/assets/national_park.jpg" @click="$router.push('/yangminshan')")
//- img(src="@/assets/national_park.jpg" @click="$router.push({ name: 'home' })")
</template>
