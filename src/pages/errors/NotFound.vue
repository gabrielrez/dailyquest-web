<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen bg-[#09090B] text-white px-4">
        <div class="text-center">
            <h1
                class="text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#BB86FC] to-[#03DAC6]">
                404
            </h1>

            <p class="text-xl md:text-2xl mt-4">Oops! The page you are looking for does not exist.</p>
            <p class="text-[#A1A1AA] mt-4">But you can go back to the home page.</p>

            <router-link to="/home"
                class="mt-10 inline-block text-[#09090B] bg-[#03DAC6] font-semibold px-8 py-4 rounded-[6px] cursor-pointer transition-all duration-300 ease-out hover:bg-gradient-to-l hover:from-[#03DAC6] hover:to-[#BB86FC] hover:shadow-lg hover:shadow-[#BB86FC]/25 hover:brightness-110">
                Back to Home
            </router-link>
        </div>
    </div>
</template>

<script setup>
</script>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 1s ease forwards;
}
</style>
