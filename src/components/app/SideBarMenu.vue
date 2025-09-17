<template>
    <aside class="w-64 text-white flex flex-col">
        <router-link to="/home" class="max-w-32">
            <img :src="logo" alt="DailyQuest" />
        </router-link>

        <span class="block my-10 bg-[#292929] w-full h-[1px] rounded"></span>

        <nav class="flex-1 space-y-10">
            <router-link v-for="item in menuItems" :key="item.label" :to="item.to"
                class="w-full text-lg flex items-center gap-3 py-2 rounded-lg transition"
                :class="[selected === item.label ? 'text-white' : 'opacity-50 hover:opacity-100']"
                @click.native="select(item)">
                <component :is="item.icon" class="w-5 h-5" />
                <span>{{ item.label }}</span>
            </router-link>
        </nav>
    </aside>
</template>

<script setup>
import { ref } from "vue";
import { Home, User, Settings, LogOut } from "lucide-vue-next";
import logo from "../../assets/DailyQuest.svg";
import api from "@/services/api";
import Cookie from "js-cookie";

const selected = ref("Home");

const menuItems = [
    { label: "Home", icon: Home, to: "/home" },
    { label: "My Profile", icon: User, to: "/me" },
    { label: "Settings", icon: Settings, to: "/settings" },
    { label: "Logout", icon: LogOut, to: "/login" },
];

async function select(item) {
    selected.value = item.label;

    if (item.label === "Logout") {
        try {
            await api.post("/logout");
        } catch (err) {
            console.log(err);
        } finally {
            Cookie.remove("_my_token");
            window.location.href = "/login";
        }
    }
}
</script>
