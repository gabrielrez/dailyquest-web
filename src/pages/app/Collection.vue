<template>
    <main class="max-w-[93.75rem] mx-auto p-12">
        <section class="flex gap-20">
            <SideBarMenu />
            <div class="w-full ml-80">
                <Header :collection="collection" />
                <GoalsList :collection="collection" />
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api";
import SideBarMenu from "@/components/app/global/SideBarMenu.vue";
import Header from "@/components/app/collection/Header.vue";
import GoalsList from "@/components/app/collection/GoalsList.vue";
import { useGoalsStore } from "@/stores/goals";

const collection = ref(null);
const route = useRoute();
const goalsStore = useGoalsStore();

async function fetchCollection(id) {
    try {
        const { data } = await api.get(`/collections/${id}`);
        collection.value = data.data;
        goalsStore.setGoals(data.data.goals || []);
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    fetchCollection(route.params.id);
});

watch(
    () => route.params.id,
    (newId) => {
        fetchCollection(newId);
    }
);
</script>
