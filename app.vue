<template>
  <div class="hh">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style>
.hh {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

body {
  box-sizing: border-box;

  & * {
    box-sizing: inherit;
  }
}
</style>