<template>
    <div class="mt-12 w-full grid grid-cols-2 gap-10">
        <CollectionItem v-for="collection in collectionStore.collections" :key="collection.id"
            :collection="collection" />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import CollectionItem from "@/components/app/home/CollectionItem.vue";
import { useCollectionStore } from "@/stores/collection";

const collectionStore = useCollectionStore();

onMounted(() => {
    collectionStore.fetchCollections();
});
</script>
