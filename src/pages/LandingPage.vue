<template>
  <div class="max-w-7xl mx-auto mt-8">
    <LpHeader />
    <main>
      <LpHero />
    </main>
  </div>
</template>

<script>
import LpHeader from "@/components/landingpage/LpHeader.vue";
import LpHero from "@/components/landingpage/LpHero.vue";

export default {
  components: {
    LpHeader,
    LpHero,
  },
};
</script>
