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
        <div class="relative">
            <img :src="userStore.user?.profile_picture
                ? userStore.user?.profile_picture
                : defaultProfilePicture" :alt="userStore.user?.username || 'User'"
                class="w-28 h-28 rounded-full object-cover" />

            <button
                class="absolute bottom-1 right-1 bg-[#27272A] p-2 rounded-full shadow-md hover:bg-[#333] transition cursor-pointer"
                @click="triggerFileInput">
                <Edit class="w-4 h-4 text-white" />
            </button>

            <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="uploadProfilePicture" />
        </div>

        <div>
            <h3 class="text-white font-semibold text-xl">{{ userStore.user?.full_name || "Loading..." }}</h3>
            <span class="text-[#A1A1AA]">{{ userStore.user?.username || "Loading..." }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import api from "@/services/api";
import defaultProfilePicture from "@/assets/default-profile-picture.webp";
import { useRoute } from "vue-router";
import { Edit } from "lucide-vue-next";

const userStore = useUserStore();
const route = useRoute();
const fileInput = ref(null);

const triggerFileInput = () => {
    fileInput.value.click();
};

const uploadProfilePicture = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
        const response = await api.post("/users/profile-picture", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        userStore.user.profile_picture = response.data.data.profile_picture;
    } catch (error) {
        console.error("Erro ao atualizar a foto de perfil:", error);
    }
};
</script>
