<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-[#020202]/50 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <div
        class="bg-[#020202] rounded-lg border border-[#27272A] w-full max-w-lg px-9 py-8 relative"
      >
        <button
          @click="close"
          class="absolute top-8 right-9 text-[#A1A1AA] hover:text-[#A1A1AA] cursor-pointer"
        >
          ✕
        </button>

        <h2 class="text-4xl font-semibold text-white">
          {{ title }}
        </h2>
        <p class="mt-5 text-[1rem] text-[#A1A1AA] mb-4" style="white-space: pre-line;">
          {{ message }}
        </p>

        <div class="mt-10 flex justify-end">
          <button
            @click="close"
            class="bg-white text-[#09090B] px-12 py-2 rounded-[6px] hover:bg-[#E1E1E2] transition duration-150 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ErrorModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Oh snap!",
    },
    message: {
      type: String,
      default: "Something went wrong. Please try again.",
    },
  },
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
