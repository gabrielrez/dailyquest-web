<template>
    <section>
        <div class="mt-16 flex items-center gap-10">
            <div>
                <h1 class="text-white text-[4rem] leading-[4.5rem] font-semibold">
                    Turn
                    <span class="relative inline-block">
                        teamwork
                        <span class="absolute left-0 bottom-0 w-full h-[6px] bg-[#03DAC6] rounded-full"></span>
                    </span>
                    <br />
                    into progress.
                </h1>

                <p class="mt-8 text-[#7B7B7B] text-2xl">
                    Organize your goals, share progress with others, and stay motivated every step
                    of the way.
                </p>
                <router-link to="/home"
                    class="mt-5 inline-block bg-[#03DAC6] font-semibold px-8 py-4 rounded-[12px] cursor-pointer transition-all duration-300 ease-out hover:bg-gradient-to-l hover:from-[#03DAC6] hover:to-[#BB86FC] hover:shadow-lg hover:shadow-[#BB86FC]/25 hover:brightness-110">
                    JOIN RIGHT NOW
                </router-link>
            </div>
            <img :src="hero" alt="Hero" class="w-1/2" />
        </div>
    </section>
</template>
<script>
import hero from "../../assets/lp-hero.png";

export default {
    data() {
        return { hero };
    },
};
</script>
