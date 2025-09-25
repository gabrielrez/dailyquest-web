<template>
    <transition name="fade">
        <div class="fixed inset-0 bg-[#020202]/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div
                class="bg-[#09090B] rounded-lg border border-[#27272A] border-opacity-25 w-full max-w-lg px-9 py-8 relative">
                <div class="flex items-center justify-between">
                    <h3 class="text-white text-xl font-semibold">Collaborators</h3>
                    <button @click="$emit('close')"
                        class="absolute top-8 right-9 text-[#A1A1AA] hover:text-[#A1A1AA] cursor-pointer">
                        ✕
                    </button>
                </div>
                <span class="my-8 block bg-[#292929] h-[1px] rounded"></span>
                <form class="space-y-5" @submit.prevent="inviteUser">
                    <div class="flex items-center gap-5">
                        <input type="email" v-model="user_email" placeholder="example@email.com" required
                            :disabled="!isOwner"
                            class="w-full px-4 py-2 text-sm bg-transparent border border-[#27272A] rounded-[6px] focus:outline-none focus:border-white text-white disabled:opacity-50 disabled:cursor-not-allowed" />
                        <button type="submit" :disabled="loading || !isOwner"
                            :class="{ 'hover:bg-[#E1E1E2]': isOwner && !loading }"
                            class="group flex justify-center items-center gap-1 w-full max-w-32 bg-white text-[#1E1E1E] text-sm font-semibold py-2 rounded-[6px] cursor-pointer transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ loading ? "Sending..." : "Invite" }}
                            <Send class="w-4 h-4 transition-transform duration-300 ease-out"
                                :class="{ 'group-hover:rotate-45': isOwner && !loading }" />
                        </button>
                    </div>
                    <p v-if="errorMessage" class="text-[#FF4181] text-sm">{{ errorMessage }}</p>
                </form>
                <div class="mt-8">
                    <ul class="space-y-6">
                        <li v-for="user in sortedUsers" :key="user.id" class="text-white text-sm">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <img :src="user.profile_picture
                                        ? `${storageUrl}/${user.profile_picture}`
                                        : defaultProfilePicture" :alt="user.name"
                                        class="w-10 h-10 rounded-full object-cover">
                                    <div>
                                        <div class="flex items-center gap-1">
                                            <h3 class="text-white text-sm font-medium">{{ user.full_name }}</h3>
                                            <Crown v-if="user.id === collection.owner_id"
                                                class="w-4 h-4 text-[#F9A825]" />
                                        </div>
                                        <span class="text-[#A1A1AA]">{{ user.username }}</span>
                                    </div>
                                </div>
                                <button @click="removeUser(user)" :class="[
                                    'flex items-center gap-2',
                                    (user.id === collection.owner_id || (currentUserId != collection.owner_id && currentUserId.value !== collection.owner_id))
                                        ? 'text-[#FF4181] opacity-25 cursor-not-allowed'
                                        : 'text-[#FF4181] text-sm hover:underline cursor-pointer'
                                ]"
                                    :disabled="user.id === collection.owner_id || (currentUserId != collection.owner_id && currentUserId.value !== collection.owner_id)">
                                    Remove
                                    <UserRoundX class="w-4 h-4" />
                                </button>
                            </div>
                        </li>
                        <li v-if="users.length === 0" class="text-gray-400 text-sm">No users invited yet.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>

    <SuccessModal :isOpen="successModalOpen" title="Invitation sent!"
        :message="`Invitation sent successfully to ${user_email}`" @close="successModalOpen = false" />
</template>

<script setup>
import { computed, ref } from "vue";
import { Send, Crown, UserRoundX } from "lucide-vue-next";
import defaultProfilePicture from "@/assets/default-profile-picture.webp";
import SuccessModal from "@/components/modals/SuccessModal.vue";
import { useUserStore } from "@/stores/user";
import api from "@/services/api";

const props = defineProps({
    users: {
        type: Array,
        required: false,
        default: () => [],
    },
    collection: {
        type: Object,
        required: false,
        default: () => null,
    }
});

const storageUrl = import.meta.env.VITE_STORAGE_URL

const userStore = useUserStore();
const currentUserId = computed(() => userStore.user?.id);

const successModalOpen = ref(false);
const errorMessage = ref("");
const user_email = ref("");
const loading = ref(false);

const isOwner = computed(() => {
    return currentUserId.value === props.collection?.owner_id;
});

const emit = defineEmits(["close"]);

const sortedUsers = computed(() => {
    if (!props.collection) return props.users;
    return [...props.users].sort((a, b) => {
        if (a.id === props.collection.owner_id) return -1;
        if (b.id === props.collection.owner_id) return 1;
        return 0;
    });
});

async function inviteUser() {
    loading.value = true;
    errorMessage.value = "";

    try {
        await api.post(`/collections/${props.collection.id}/users`, {
            user_email: user_email.value
        });
        successModalOpen.value = true;
    } catch (error) {
        if (error.response?.data?.message) {
            errorMessage.value = error.response.data.message;
        } else {
            errorMessage.value = "Unexpected error. Please try again.";
        }
    } finally {
        loading.value = false;
    }
}

async function removeUser(user) {
    if (user.id === props.collection.owner_id) return;
    try {
        await api.delete(`/collections/${props.collection.id}/users`, {
            data: { user_email: user.email }
        });
        emit("userRemoved", user.id);
    } catch (error) {
        console.error("Failed to remove user", error);
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
