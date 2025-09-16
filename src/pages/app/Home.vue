<template>
  <main class="p-12">
    <section class="flex gap-20">
      <SideBarMenu />
      <div class="w-full">
        <Header />
      </div>
    </section>
  </main>
</template>

<script>
import SideBarMenu from "../../components/app/SideBarMenu.vue";
import Header from "../../components/app/Header.vue";

export default {
  components: {
    SideBarMenu,
    Header,
  },
};
</script>
