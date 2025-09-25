<template>
    <router-link v-if="route.name != 'Profile'" to="/me"
        class="flex items-center gap-4 no-underline hover:underline hover:text-white transition-all">
        <h3 class="text-white font-semibold">{{ userStore.user?.full_name || "Loading..." }}</h3>
        <img :src="userStore.user?.profile_picture
            ? userStore.user?.profile_picture
            : defaultProfilePicture" :alt="userStore.user?.username || 'User'"
            class="w-14 h-14 rounded-full object-cover" />
    </router-link>

    <div v-else class="flex items-center gap-4">
        <img :src="userStore.user?.profile_picture
            ? userStore.user?.profile_picture
            : defaultProfilePicture" :alt="userStore.user?.username || 'User'"
            class="w-28 h-28 rounded-full object-cover" />
        <div>
            <h3 class="text-white font-semibold text-xl">{{ userStore.user?.full_name || "Loading..." }}</h3>
            <span class="text-[#A1A1AA]">{{ userStore.user?.username || "Loading..." }}</span>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import defaultProfilePicture from "@/assets/default-profile-picture.webp";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
</script>