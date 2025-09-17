<template>
    <transition name="fade">
        <div class="fixed inset-0 bg-[#020202]/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div
                class="bg-[#09090B] rounded-lg border border-[#27272A] border-opacity-25 w-full max-w-lg px-9 py-8 relative">
                <div class="flex items-center justify-between">
                    <h3 class="text-white text-xl font-semibold">Create Collection</h3>
                    <button @click="$emit('close')"
                        class="absolute top-8 right-9 text-[#A1A1AA] hover:text-[#A1A1AA] cursor-pointer">
                        ✕
                    </button>
                </div>
                <span class="my-8 block bg-[#292929] h-[1px] rounded"></span>
                <form class="space-y-5" @submit.prevent="createCollection">
                    <div>
                        <label class="block text-sm font-medium text-white mb-2.5">Name</label>
                        <input type="text" v-model="name" placeholder="Name" required
                            class="w-full px-4 py-2 text-sm bg-transparent border border-[#27272A] rounded-[6px] focus:outline-none focus:border-white text-white" />
                        <p v-if="errors.name" class="text-[#FF4181] text-sm mt-1">{{ errors.name }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-white mb-2.5">Description</label>
                        <input type="text" v-model="description" placeholder="Description" required
                            class="w-full px-4 py-2 text-sm bg-transparent border border-[#27272A] rounded-[6px] focus:outline-none focus:border-white text-white" />
                        <p v-if="errors.description" class="text-[#FF4181] text-sm mt-1">
                            {{ errors.description }}
                        </p>
                    </div>
                    <button type="submit"
                        class="mt-6 w-full bg-[#BB86FC] text-[#1E1E1E] text-sm font-bold py-2 rounded-[6px] cursor-pointer transition-all duration-300 ease-out hover:bg-[#AC70F7]">
                        {{ loading ? "Creating..." : "Create Collection" }}
                    </button>
                </form>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from "vue";
import api from "@/services/api";
import { useCollectionStore } from "@/stores/collection";

const name = ref("");
const description = ref("");
const loading = ref(false);
const errors = ref({});

const emit = defineEmits(["close"]);
const collectionStore = useCollectionStore();

async function createCollection() {
    loading.value = true;
    errors.value = {};

    try {
        const { data } = await api.post("/collections", {
            name: name.value,
            description: description.value,
        });

        collectionStore.addCollection(data.data);
        emit("close");
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            const apiErrors = error.response.data.errors;
            errors.value = Object.fromEntries(
                Object.entries(apiErrors).map(([key, val]) => [key, val[0]])
            );
        } else {
            console.error("Failed to create collection", error);
        }
    } finally {
        loading.value = false;
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
