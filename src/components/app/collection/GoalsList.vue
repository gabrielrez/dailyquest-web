<template>
    <div class="mt-12 w-full flex flex-col gap-5" v-if="localGoals.length">
        <GoalItem v-for="goal in localGoals" :key="goal.id" :collection="collection" :goal="goal"
            @goalDeleted="removeGoal" />
    </div>
    <div v-else class="mt-12 text-[#A1A1AA]">Loading...</div>
</template>

<script setup>
import { ref, watch } from "vue";
import GoalItem from "@/components/app/collection/GoalItem.vue";

const props = defineProps({
    collection: {
        required: true,
    },
});

const localGoals = ref(props.collection?.goals ? [...props.collection.goals] : []);

watch(
    () => props.collection?.goals,
    (newGoals) => {
        localGoals.value = newGoals ? [...newGoals] : [];
    }
);

const removeGoal = (goalId) => {
    localGoals.value = localGoals.value.filter((g) => g.id !== goalId);
};
</script>
