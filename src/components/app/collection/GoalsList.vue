<template>
    <div class="mt-12 w-full">
        <draggable v-if="goals.length" v-model="goals" item-key="id" handle=".drag-handle" class="flex flex-col gap-5"
            @end="onDragEnd">
            <template #item="{ element }">
                <GoalItem :key="element.id" :collection="collection" :goal="element" />
            </template>
        </draggable>

        <div v-else class="mt-12 text-[#A1A1AA]">No goals yet!</div>
    </div>
</template>

<script setup>
import api from "@/services/api";
import { storeToRefs } from "pinia";
import { useGoalsStore } from "@/stores/goals";
import GoalItem from "@/components/app/collection/GoalItem.vue";
import draggable from "vuedraggable";

const props = defineProps({
    collection: {
        required: true,
    },
});

const goalsStore = useGoalsStore();
const { goals } = storeToRefs(goalsStore);

const onDragEnd = async () => {
    if (!goals.value.length) return;

    const goals_data = goals.value.map((goal, index) => ({
        id: goal.id,
        order: index + 1
    }));

    try {
        await api.patch(`/collections/${props.collection.id}/goals/reorder`, {
            goals_data
        });
    } catch (error) {
        console.error("Failed to reorder goals", error);
    }
};
</script>
