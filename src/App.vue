<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(() => {
  const token = localStorage.getItem("token");

  if (token && !userStore.user) {
    userStore.fetchUser();
  }
});
</script>
