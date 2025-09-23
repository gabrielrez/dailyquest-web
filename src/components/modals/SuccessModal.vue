<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 bg-[#020202]/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div
                class="bg-[#09090B] rounded-lg border border-[#27272A] border-opacity-25 w-full max-w-lg px-9 py-8 relative">
                <button @click="close"
                    class="absolute top-8 right-9 text-[#A1A1AA] hover:text-[#A1A1AA] cursor-pointer">
                    ✕
                </button>

                <h2 class="flex items-center gap-2 text-white text-xl font-semibold">
                    {{ title }}
                    <Send class="w-6 h-6 text-white" />
                </h2>
                <span class="my-8 block bg-[#292929] h-[1px] rounded"></span>
                <p class="mt-5 text-[1rem] text-[#A1A1AA] mb-4" style="white-space: pre-line">
                    {{ message }}
                </p>

                <div class="mt-10 flex justify-end">
                    <button @click="close"
                        class="bg-white text-[#09090B] px-12 py-2 rounded-[6px] hover:bg-[#E1E1E2] transition duration-150 cursor-pointer">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { Send } from "lucide-vue-next";

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: "Success!",
    },
    message: {
        type: String,
        default: "Operation completed successfully.",
    },
});

const emit = defineEmits(["close"]);

function close() {
    emit("close");
}
</script>


<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
