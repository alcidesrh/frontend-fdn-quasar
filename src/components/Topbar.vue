<template>
  <q-header class="toolbar">
    <q-toolbar>
      <div class="row w-full items-center">
        <div class="col">
          <breadcrumbs />
        </div>
        <div class="col justify-center flex"><clock /></div>
        <div class="col">.col</div>
      </div>
    </q-toolbar>
  </q-header>
  <div id="intersectionObservertarget" class="absolute" />
</template>
<script setup lang="ts">
const observer = new IntersectionObserver(
  (e) => {
    const el = document.querySelector(".toolbar");
    if (e[0].intersectionRatio < 1) el.classList.add("layout-topbar-sticky");
    else el.classList.remove("layout-topbar-sticky");
  },
  {
    threshold: 1,
  },
);

onMounted(async () => {
  const el = document.querySelector("#intersectionObservertarget");
  observer.observe(el);
});
onUnmounted(() => observer.disconnect());
</script>
