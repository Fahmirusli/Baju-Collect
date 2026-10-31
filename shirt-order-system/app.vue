<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <BaseToast />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Group Shirt Order` : 'Group Shirt Order'
  },
})
</script>

