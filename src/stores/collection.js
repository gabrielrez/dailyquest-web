import { defineStore } from "pinia";
import api from "@/services/api";

export const useCollectionStore = defineStore("collection", {
    state: () => ({
        collections: [],
    }),
    actions: {
        async fetchCollections() {
            const { data } = await api.get("/collections");
            this.collections = data.data;
        },
        addCollection(collection) {
            this.collections.push(collection);
        },
    },
});