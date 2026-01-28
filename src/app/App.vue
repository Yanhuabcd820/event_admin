<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="app-container">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
