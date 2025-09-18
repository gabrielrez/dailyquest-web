<template>
    <div :style="containerStyle"
        class="flex items-center justify-between gap-5 bg-[#09090B] border border-[#27272A] rounded-[6px] px-6 py-4 relative hover:translate-x-2 transition duration-300 ease-out">
        <div>
            <h3 :class="textClass" class="text-white text-xl font-semibold">{{ goal.name }}</h3>
            <p :class="textClass" class="mt-2 text-[#A1A1AA]">{{ goal.description }}</p>
        </div>
        <div class="flex items-center gap-5 relative">
            <div>
                <span class="text-[#A1A1AA] text-sm">Assigned to:</span>
                <select v-model="selectedAssigned" :style="assignedToSelectStyle"
                    class="px-3 py-1.5 bg-[#09090B] text-sm text-[#A1A1AA] font-bold focus:outline-none cursor-pointer">
                    <option value="">---</option>
                    <option v-for="user in allUsers" :key="user.id" :value="user.id">
                        {{ user.username }}
                    </option>
                </select>
            </div>
            <div>
                <select v-model="selectedStatus" :style="statusSelectStyle"
                    class="px-4 py-2.5 bg-[#09090B] text-sm text-white focus:outline-none border border-[#27272A] rounded-[6px] cursor-pointer">
                    <option value="to_do">🕒 To Do</option>
                    <option value="doing">▶️ Doing</option>
                    <option value="done">✅ Done</option>
                </select>
            </div>
            <div ref="dropdownRef" class="relative">
                <MoreHorizontalIcon @click="toggleDropdown" class="w-6 h-6 text-white cursor-pointer" />
                <div v-if="dropdownOpen"
                    class="absolute right-0 mt-2 w-32 bg-[#09090B] border border-[#27272A] rounded-lg shadow-lg z-50">
                    <ul class="py-1">
                        <li @click="deleteGoal"
                            class="px-4 py-2 text-sm text-[#FF4181] hover:bg-[#09090B] cursor-pointer rounded-t-lg">
                            Delete
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import api from "@/services/api";
import { MoreHorizontalIcon } from "lucide-vue-next";

const props = defineProps({
    collection: {
        type: Object,
        required: true,
    },
    goal: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['goalDeleted']);

const allUsers = computed(() => {
    const users = Array.isArray(props.collection.users) ? props.collection.users : [];
    const owner = props.collection.owner ? [props.collection.owner] : [];
    return [...users, ...owner];
});

const selectedAssigned = ref(props.goal.assigned_to ?? "");
const selectedStatus = ref(props.goal.status ?? "null");

const containerStyle = computed(() => {
    switch (selectedStatus.value) {
        case "doing":
            return { backgroundColor: "#15110C", border: "1px solid #4E3712" };
        case "done":
            return { backgroundColor: "#091414", border: "1px solid #084540" };
        default:
            return { backgroundColor: "#09090B", border: "1px solid #27272A" };
    }
});

const statusSelectStyle = computed(() => {
    switch (selectedStatus.value) {
        case "doing":
            return { backgroundColor: "#15110C", borderColor: "#4E3712" };
        case "done":
            return { backgroundColor: "#091414", borderColor: "#084540" };
        default:
            return { backgroundColor: "#09090B", borderColor: "#27272A" };
    }
});

const assignedToSelectStyle = computed(() => {
    switch (selectedStatus.value) {
        case "doing":
            return { backgroundColor: "#15110C" };
        case "done":
            return { backgroundColor: "#091414" };
        default:
            return { backgroundColor: "#09090B" };
    }
});

const textClass = computed(() => {
    return selectedStatus.value === "done" ? "text-white line-through" : "text-white";
});

const dropdownOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        dropdownOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});

const deleteGoal = async () => {
    try {
        await api.delete(`/collections/${props.collection.id}/goals/${props.goal.id}`);
        dropdownOpen.value = false;
        emit('goalDeleted', props.goal.id);
    } catch (error) {
        console.error('Failed to delete goal', error);
    }
};

watch(selectedAssigned, async (newValue, oldValue) => {
    if (newValue === oldValue) return;
    const username = newValue ? allUsers.value.find(u => u.id === newValue)?.username : null;
    try {
        await api.patch(`/collections/${props.collection.id}/goals/${props.goal.id}/assign`, { user_username: username });
        console.log('Assigned To successfully updated!');
    } catch (error) {
        console.error('Failed to update assigned to', error);
    }
});

watch(selectedStatus, async (newValue, oldValue) => {
    if (newValue === oldValue) return;
    try {
        await api.patch(`/collections/${props.collection.id}/goals/${props.goal.id}/status`, { status: newValue });
        console.log('Status successfully updated!');
    } catch (error) {
        console.error('Failed to update status', error);
    }
});
</script>
