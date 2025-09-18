<template>
    <div class="w-full flex items-center justify-between">
        <CollaboratorsProfilePictures :users="allUsers || []" />
        <ProfilePicture />
    </div>
    <div class="mt-20 w-full flex items-center justify-between">
        <div class="w-full flex items-center gap-4">
            <div class="w-1.5 h-10 bg-[#03DAC6] rounded-xs"></div>
            <h1 class="text-white text-[2.5rem] font-bold">{{ collection?.name || 'Loading...' }}</h1>
        </div>
        <button @click="isOpen = true"
            class="w-full max-w-[184px] bg-[#BB86FC] text-[#1E1E1E] text-center text-sm font-bold px-8 py-2 rounded-[6px] cursor-pointer transition-all duration-300 ease-out hover:bg-[#AC70F7]">
            Create Goal
        </button>
    </div>
</template>

<script setup>
import ProfilePicture from "@/components/app/global/ProfilePicture.vue";
import CollaboratorsProfilePictures from "@/components/app/collection/CollaboratorsProfilePictures.vue";
import { computed } from "vue";

const props = defineProps({
    collection: {
        type: Object,
        required: false,
        default: () => null
    }
});

const allUsers = computed(() => {
    const users = Array.isArray(props.collection?.users) ? props.collection.users : [];
    const owner = props.collection?.owner ? [props.collection.owner] : [];
    return [...users, ...owner];
});
</script>
