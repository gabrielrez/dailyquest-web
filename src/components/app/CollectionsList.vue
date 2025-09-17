<template>
  <div class="mt-12 w-full grid grid-cols-2 gap-10">
    <CollectionItem
      v-for="collection in collections"
      :key="collection.id"
      :collection="collection"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import CollectionItem from "@/components/app/CollectionItem.vue";

const collections = ref([]);

onMounted(async () => {
  try {
    const { data } = await api.get("/collections");
    collections.value = data.data;
  } catch (error) {
    console.error("Failed to fetch collections", error);
  }
});
</script>
