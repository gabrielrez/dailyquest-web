<template>
  <div class="w-full flex items-center justify-between">
    <p class="text-[#A1A1AA] text-sm">
      Complete all goals in a collection to complete the collection!
    </p>
    <h3 class="text-white font-medium">{{ userStore.user?.username || "Loading..." }}</h3>
  </div>
  <div class="mt-20 w-full flex items-center justify-between">
    <div class="w-full flex items-center gap-4">
      <div class="w-1.5 h-10 bg-[#03DAC6] rounded-xs"></div>
      <h1 class="text-white text-[2.5rem] font-bold">My Collections</h1>
    </div>
    <button
      class="w-full max-w-[184px] bg-[#BB86FC] text-[#1E1E1E] text-center text-sm font-bold px-8 py-2 rounded-[6px] cursor-pointer transition-all duration-300 ease-out hover:bg-[#AC70F7]"
    >
      Create Collection
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
