<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 bg-[#020202]/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div
                class="bg-[#091414] rounded-lg border border-[#03DAC6]/25 border-opacity-25 w-full max-w-lg px-9 py-8 relative">
                <button @click="close"
                    class="absolute top-8 right-9 text-[#A1A1AA] hover:text-[#A3B3B4] cursor-pointer">
                    ✕
                </button>

                <h3 class="flex items-center gap-2 text-[#E6F1F2] text-xl font-semibold">
                    {{ title }}
                    <Send class="w-6 h-6 text-[#E6F1F2]" />
                </h3>
                <span class="my-6 block bg-[#0F2526] h-[1px] rounded"></span>
                <p class="mt-5 text-[1rem] text-[#A3B3B4] mb-4" style="white-space: pre-line">
                    {{ message }}
                </p>

                <div class="mt-10 flex justify-end">
                    <button @click="close"
                        class="bg-[#1A2A2B] text-[#E6F1F2] px-12 py-2 rounded-[6px] hover:bg-[#162C2D] transition duration-150 cursor-pointer">
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
