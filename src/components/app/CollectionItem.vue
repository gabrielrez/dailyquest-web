<template>
  <router-link
    :to="`/collection/${collection.id}`"
    :class="[
      'w-full rounded-[6px] px-6 py-5 hover:scale-95 transition duration-300 ease-out',
      collection.status === 'completed'
        ? 'bg-[#03DAC6]/5 border border-[#03DAC6]/25'
        : 'bg-[#09090B] border border-[#27272A]',
    ]"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-white font-semibold text-xl">{{ collection.name }}</h3>
      <span
        :class="[
          'flex items-center gap-2 text-sm text-white px-4 py-0.5 rounded-[4px]',
          collection.status === 'completed' ? 'bg-[#03DAC6]/25' : 'bg-[#27272A]',
        ]"
      >
        <template v-if="collection.owner_id == userStore.user.id">
          Owner
          <Crown class="w-3 h-3 text-yellow-400" aria-hidden="true" />
        </template>
        <template v-else>
          Collaborator
          <Users class="w-3 h-3 text-white" aria-hidden="true" />
        </template>
      </span>
    </div>
    <p class="mt-5 text-[#A1A1AA]">{{ collection.description }}</p>
    <span class="mt-10 inline-block text-white underline"> See Collection </span>
  </router-link>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { Crown, Users } from "lucide-vue-next";

const props = defineProps({
  collection: {
    type: Object,
    required: true,
  },
});

const userStore = useUserStore();
</script>
