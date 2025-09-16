import { defineStore } from "pinia";
import api from "../services/api";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
    }),
    actions: {
        async fetchUser() {
            const { data } = await api.get("/users/me");
            this.user = data.data;
        },
    },
});