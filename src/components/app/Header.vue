<template>
  <div class="w-full flex items-center justify-between">
    <p class="text-[#A1A1AA] text-sm">
      Complete all goals in a collection to complete the collection!
    </p>
    <h3 class="text-white font-medium">{{ userStore.user?.username || "Loading..." }}</h3>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
