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
import { watch } from "vue";
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

const STORAGE_KEY = (collectionId) => `goals_order_${collectionId}`;

watch(
    () => props.collection,
    (collection) => {
        if (!collection?.id) return;

        const saved = localStorage.getItem(STORAGE_KEY(collection.id));
        if (saved) {
            const savedOrder = JSON.parse(saved);
            const ordered = savedOrder
                .map((id) => goals.value.find((g) => g.id === id))
                .filter(Boolean);
            const missing = goals.value.filter(
                (g) => !savedOrder.includes(g.id)
            );
            goals.value = [...ordered, ...missing];
        }
    },
    { immediate: true }
);

const onDragEnd = () => {
    const orderedIds = goals.value.map((g) => g.id);
    localStorage.setItem(
        STORAGE_KEY(props.collection.id),
        JSON.stringify(orderedIds)
    );
};
</script>
