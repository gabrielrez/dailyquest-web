import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";

export const useGoalsStore = defineStore("goals", () => {
    const goals = ref([]);

    function setGoals(newGoals) {
        goals.value = [...newGoals];
    }

    function addGoal(goal) {
        goals.value.push(goal);
    }

    function removeGoal(goalId) {
        goals.value = goals.value.filter(g => g.id !== goalId);
    }

    async function fetchGoals(collectionId) {
        try {
            const { data } = await api.get(`/collections/${collectionId}`);
            setGoals(data.data.goals || []);
        } catch (error) {
            console.error("Failed to fetch goals", error);
        }
    }

    return {
        goals,
        setGoals,
        addGoal,
        removeGoal,
        fetchGoals,
    };
});
