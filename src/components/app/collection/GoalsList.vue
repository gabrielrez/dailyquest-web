<template>
    <div class="mt-12 w-full flex flex-col gap-5" v-if="goals.length">
        <GoalItem v-for="goal in goals" :key="goal.id" :collection="collection" :goal="goal" />
    </div>
    <div v-else class="mt-12 text-[#A1A1AA]">No goals yet!</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGoalsStore } from "@/stores/goals";
import GoalItem from "@/components/app/collection/GoalItem.vue";

const props = defineProps({
    collection: {
        required: true,
    },
});

const goalsStore = useGoalsStore();
const { goals } = storeToRefs(goalsStore);
</script>
