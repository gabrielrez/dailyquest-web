<template>
  <aside class="w-64 text-white flex flex-col shadow-lg">
    <router-link to="/home" class="max-w-32">
      <img :src="logo" alt="DailyQuest" />
    </router-link>

    <span class="block my-10 bg-[#292929] w-full h-[1px] rounded"></span>

    <nav class="flex-1 space-y-10">
      <button
        v-for="item in menuItems"
        :key="item.label"
        @click="select(item)"
        class="w-full text-lg flex items-center gap-3 py-2 rounded-lg transition cursor-pointer"
        :class="[selected === item.label ? 'text-white' : 'opacity-50 hover:opacity-100']"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { Home, User, Settings, LogOut } from "lucide-vue-next";
import logo from "../../assets/DailyQuest.svg";
import api from "@/services/api";

const selected = ref("Home");

const menuItems = [
  { label: "Home", icon: Home },
  { label: "My Profile", icon: User },
  { label: "Settings", icon: Settings },
  { label: "Logout", icon: LogOut },
];

async function select(item) {
  selected.value = item.label;
  if (item.label === "Logout") {
    try {
      const { data } = await api.post("/logout");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
}
</script>
