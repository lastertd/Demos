<template>
  <div ref="divRef" class="h-1/3 w-1/3 border-black border rounded-xl">
    hello world!
  </div>
</template>

<script setup lang="ts">
import {useCardEffect} from "~/composables/useCardEffect";
definePageMeta({
  name:'卡片效果演示'
})

const divRef = ref();

useCardEffect(divRef, {
  rotate: 2,
  scale: 1,
});
</script>

