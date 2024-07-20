<template>
  <div class="w-screen h-screen min-h-667 relative flex flex-col">


    <main class="flex-1 w-full overflow-y-scroll p-12 pb-50">
      <div class="space-y-7">
        <div
          v-for="uData of uList"
          :key="uData.path"
          class="main-url-list"
          @click="handleUrlItemClick(uData)"
        >
          <span class="text-17 text-black text-opacity-70 font-bold">{{ uData.path }}/</span>
          <span class="text-12 text-black text-opacity-50">des: {{ uData.name }}</span>

        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();

let uList = router
  .getRoutes()
  .filter((item) => item.path !== "/" && !item.path.startsWith("/_test"));

const activeItemIdx = ref(0);

watchEffect(() => {
  if (activeItemIdx.value === 0) {
    uList = router
      .getRoutes()
      .filter((item) => item.path !== "/" && !item.path.startsWith("/_test"));
  }
  if (activeItemIdx.value === 1) {
    uList = router.getRoutes().filter((item) => item.path.startsWith("/_test"));
  }
});

/**
 * @description 点击跳转
 * @param {Object} data 某一个路由.
 * @returns {void} nothing
 */
const handleUrlItemClick = (data: (typeof uList)[number]): void => {
  delay(300).then(() => {
    router.push(data.path);
  });
};
</script>
<style lang="scss">
@use "/styles/mixins" as *;

.main-url-list {
  @include ripple;

  display: flex;
  flex-flow: column nowrap;
  padding: 3px 10px;

  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
