<template>
    <section class="mt-20 max-w-sm mx-auto">
        <div class="flex items-center gap-4">
            <div class="w-1.5 h-10 bg-[#03DAC6] rounded-xs"></div>
            <h1 class="text-[2.5rem] text-white font-semibold">Login</h1>
        </div>

        <p class="text-[#A1A1AA] text-sm mt-3">Enter your credentials below to login</p>

        <form class="mt-12 space-y-5" @submit.prevent="handleLogin">
            <div>
                <label class="block text-sm font-medium text-white mb-2.5">E-mail</label>
                <input type="email" v-model="email" placeholder="E-mail" required
                    class="w-full px-4 py-2 text-sm bg-transparent border border-[#27272A] rounded-[6px] focus:outline-none focus:border-white text-white" />
            </div>
            <div>
                <label class="block text-sm font-medium text-white mb-2.5">Password</label>
                <input type="password" v-model="password" placeholder="Password" required
                    class="w-full px-4 py-2 text-sm bg-transparent border border-[#27272A] rounded-[6px] focus:outline-none focus:border-white text-white" />
            </div>
            <button type="submit"
                class="mt-6 w-full bg-[#BB86FC] text-[#1E1E1E] text-sm font-bold py-2 rounded-[6px] cursor-pointer transition-all duration-300 ease-out hover:bg-[#AC70F7]">
                Login
            </button>
        </form>
        <p class="mt-5 text-[#A1A1AA] text-sm text-center">
            Don’t have an account?
            <router-link to="/register" class="text-white font-medium hover:underline">Create Account</router-link>
        </p>

        <ErrorModal :isOpen="showError" :message="errorMessage" @close="showError = false" />
    </section>
</template>

<script setup>
import { ref } from "vue";
import api from "@/services/api";
import ErrorModal from "@/components/modals/ErrorModal.vue";
import Cookie from "js-cookie";

const email = ref("");
const password = ref("");
const loading = ref(false);
const showError = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
    loading.value = true;
    showError.value = false;
    errorMessage.value = "";

    try {
        const { data } = await api.post("/login", {
            email: email.value,
            password: password.value,
        });

        Cookie.set("_my_token", data.data.token);
        window.location.href = "/home";
    } catch (err) {
        errorMessage.value = "Invalid credentials. Give it another shot!";
        showError.value = true;
    } finally {
        loading.value = false;
    }
};
</script>
