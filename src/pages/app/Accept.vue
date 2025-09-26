<template>
    <div class="min-h-screen flex items-center justify-center bg-[#09090B]">
        <div class="w-full max-w-2xl">
            <div class="px-9 py-8 bg-[#09090B] rounded-[6px] border border-[#27272A] overflow-hidden">
                <div class="flex items-center gap-3">
                    <div
                        class="w-14 h-14 rounded-[6px] bg-gradient-to-br from-[#00AE9E] to-[#BB86FC] flex items-center justify-center text-white text-xl font-bold">
                        <Users />
                    </div>
                    <div>
                        <h3 class="text-white text-xl font-semibold">{{ collectionName }}</h3>
                        <p class="mt-1 text-[#A1A1AA] text-sm">Invited by <span class="font-medium">{{
                            inviterName }}</span></p>
                    </div>
                </div>

                <span class="my-8 block bg-[#292929] h-[1px] rounded"></span>

                <div>
                    <p class="text-white">Congrats! 🎉</p>
                    <p class="mt-2 text-[#A1A1AA]">You have been invited to join the collection <span
                            class="font-medium text-white">{{ collectionName }}</span>.
                    </p>
                </div>

                <div class="mt-12 flex items-center gap-3 justify-end">
                    <button @click="onDeclineClick"
                        class="border border-[#27272A] rounded-[6px] px-8 py-2 text-sm font-semibold text-white cursor-pointer">
                        Ignore
                    </button>

                    <button @click="onAcceptClick" :disabled="loading"
                        class="flex justify-center items-center gap-1 bg-[#03DAC6] hover:bg-[#00AE9E] transition-all duration-300 ease-out hover:bg-gradient-to-l hover:from-[#03DAC6] hover:to-[#BB86FC] hover:shadow-lg hover:shadow-[#BB86FC]/25 hover:brightness-110 text-sm w-full max-w-[184px] px-8 py-2 rounded-[6px] font-semibold text-[#09090B] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        Accept
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Users } from "lucide-vue-next";

const props = defineProps({
    inviterName: { type: String, default: 'User Name' },
    collectionName: { type: String, default: 'Collection Name' },
    message: { type: String, default: '' },
});

const loading = ref(false);

function onAcceptClick() {
    //
}

function onDeclineClick() {
    //
}
</script>
