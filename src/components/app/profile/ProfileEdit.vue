<template>
    <div class="w-full max-w-[420px] border border-[#27272A] rounded-[6px] px-6 py-5">
        <h3 class="text-white text-xl font-semibold">Edit Profile</h3>
        <p class="mt-2 text-[#A1A1AA] text-sm">This is how others will see you.</p>
        <span class="my-8 block bg-[#292929] h-[1px] rounded"></span>
        <form class="space-y-5" @submit.prevent="editProfile">
            <div>
                <label class="block text-sm font-medium text-white mb-2.5">Full Name</label>
                <input type="text" v-model="full_name" placeholder="Full Name" required
                    class="w-full px-4 py-2 text-sm bg-transparent border border-[#27272A] rounded-[6px] focus:outline-none focus:border-white text-[#A1A1AA]" />
                <p v-if="errors.full_name" class="text-[#FF4181] text-sm mt-1">
                    {{ errors.full_name }}
                </p>
                <span class="block text-[#A1A1AA] text-sm font-light opacity-60 mt-1.5">This is your public display
                    name.</span>
            </div>
            <div>
                <label class="block text-sm font-medium text-white mb-2.5">Username</label>
                <input type="text" v-model="username" placeholder="Username" required
                    class="w-full px-4 py-2 text-sm bg-transparent border border-[#27272A] rounded-[6px] focus:outline-none focus:border-white text-[#A1A1AA]" />
                <p v-if="errors.username" class="text-[#FF4181] text-sm mt-1">
                    {{ errors.username }}
                </p>
                <span class="block text-[#A1A1AA] text-sm font-light opacity-60 mt-1.5">This is your identifier
                    username.</span>
            </div>
            <div class="mt-16 flex gap-5 justify-end items-center">
                <button type="button" @click="resetForm"
                    class="border border-[#27272A] rounded-[6px] px-8 py-2 text-sm font-semibold text-white cursor-pointer">
                    Cancel
                </button>

                <button type="submit" :disabled="loading"
                    class="bg-[#03DAC6] hover:bg-[#00AE9E] transition-all duration-300 ease-out text-sm w-full max-w-[184px] px-8 py-2 rounded-[6px] font-semibold text-[#09090B] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ loading ? "Saving..." : "Save" }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/user";

const full_name = ref("");
const username = ref("");
const loading = ref(false);
const errors = ref({});

const userStore = useUserStore();

watch(
    () => userStore.user,
    (newUser) => {
        if (newUser) {
            full_name.value = newUser.full_name || "";
            username.value = newUser.username || "";
        }
    },
    { immediate: true }
);

async function editProfile() {
    loading.value = true;
    errors.value = {};

    try {
        const { data } = await api.patch("/users", {
            full_name: full_name.value,
            username: username.value,
        });
        userStore.user.full_name = data.data.full_name;
        userStore.user.username = data.data.username;
    } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
            const apiErrors = err.response.data.errors;
            errors.value = Object.fromEntries(
                Object.entries(apiErrors).map(([key, val]) => [key, val[0]])
            );
        } else {
            console.error("Failed to create goal", err);
        }
    } finally {
        loading.value = false;
    }
}

function resetForm() {
    if (userStore.user) {
        full_name.value = userStore.user.full_name;
        username.value = userStore.user.username;
        errors.value = {};
    }
}
</script>