<template>
  <main class="max-w-[93.75rem] mx-auto p-12">
    <section class="flex gap-20">
      <SideBarMenu />
      <div class="w-full">
        <Header />
        <CollectionsList />
      </div>
    </section>
  </main>
</template>

<script>
import SideBarMenu from "@/components/app/SideBarMenu.vue";
import Header from "@/components/app/Header.vue";
import CollectionsList from "@/components/app/CollectionsList.vue";

export default {
  components: {
    SideBarMenu,
    Header,
    CollectionsList,
  },
};
</script>
