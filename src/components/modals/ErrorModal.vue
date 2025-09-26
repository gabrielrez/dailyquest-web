<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div
                class="bg-[#160C10] rounded-lg border border-[#FF4181]/25 border-opacity-40 w-full max-w-lg px-9 py-8 relative">

                <button @click="close" class="absolute top-8 right-9 text-[#D1BFC2] cursor-pointer">
                    ✕
                </button>

                <h2 class="flex items-center gap-2 text-[#F5E6E8] text-xl font-semibold">
                    {{ title }}
                    <AlertCircle class="w-6 h-6 text-[#FF4181]" />
                </h2>

                <span class="my-6 block bg-[#1F1418] h-[1px] rounded"></span>

                <p class="mt-5 text-[1rem] text-[#D1BFC2] mb-4" style="white-space: pre-line">
                    {{ message }}
                </p>

                <div class="mt-10 flex justify-end">
                    <button @click="close"
                        class="bg-[#2A1E22] text-[#F5E6E8] px-12 py-2 rounded-[6px] hover:bg-[#281c20] transition duration-150 cursor-pointer">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { AlertCircle } from "lucide-vue-next";

const props = defineProps({
    isOpen: Boolean,
    title: { type: String, default: "Oops, something went wrong!" },
    message: { type: String, default: "Something went wrong. Please try again." },
});

const emit = defineEmits(["close"]);
function close() {
    emit("close");
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
