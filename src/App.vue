<template>
    <div>
        <router-view />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import Cookie from "js-cookie";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(() => {
    const token = Cookie.get("_my_token");

    if (token && !userStore.user) {
        userStore.fetchUser();
    }
});
</script>
