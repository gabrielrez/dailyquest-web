<template>
    <div class="flex items-center gap-4 cursor-pointer group">
        <div class="flex items-center -space-x-4">
            <div v-if="hiddenCount > 0"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-[#27272A]/15 text-xs text-white font-medium"
                :style="{ zIndex: 0 }">
                +{{ hiddenCount }}
            </div>

            <img v-for="(user, index) in displayedUsers" :key="user.id" :src="user.profile_picture
                ? `${storageUrl}/${user.profile_picture}`
                : defaultProfilePicture" :alt="user.name"
                class="w-10 h-10 rounded-full hover:-translate-y-1 transition duration-300 ease-out"
                :style="{ zIndex: index + 1, opacity: calculateOpacity(index), marginTop: index * -2 + 'px' }" />
        </div>
        <p class="text-[#A1A1AA] text-sm group-hover:underline">
            See all collaborators
        </p>
    </div>
</template>

<script setup>
import { computed } from "vue";
import defaultProfilePicture from "@/assets/default-profile-picture.webp";

const props = defineProps({
    users: {
        type: Array,
        required: true
    }
});

const storageUrl = import.meta.env.VITE_STORAGE_URL

const displayedUsers = computed(() => {
    return [...props.users].slice(-3);
});

const hiddenCount = computed(() => {
    return props.users.length > 3 ? props.users.length - 3 : 0;
});

function calculateOpacity(index) {
    const total = displayedUsers.value.length;
    if (total === 1) return 1;
    return 0.25 + (0.75 * index) / (total - 1);
}
</script>
