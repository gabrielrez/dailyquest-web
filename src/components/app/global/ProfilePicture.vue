<template>
    <router-link to="/me" class="flex items-center gap-4 no-underline hover:underline hover:text-white transition-all">
        <h3 class="text-white font-semibold">{{ userStore.user?.username || "Loading..." }}</h3>
        <img :src="userStore.user?.profile_picture" :alt="userStore.user?.username || 'User'"
            class="w-14 h-14 rounded-full object-cover" />
    </router-link>
</template>

<script setup>    
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>