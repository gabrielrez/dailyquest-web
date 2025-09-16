<template>
  <section class="mt-20 max-w-sm mx-auto">
    <div class="flex items-center gap-4">
      <div class="w-1.5 h-10 bg-[#03DAC6] rounded-xs"></div>
      <h1 class="text-[2.5rem] text-white font-semibold">Login</h1>
    </div>

    <p class="text-[#A1A1AA] text-sm mt-3">Enter your credentials below to login</p>

    <form class="mt-12 space-y-5">
      <div>
        <label class="block text-sm font-medium text-white mb-2.5">E-mail</label>
        <input
          type="text"
          placeholder="E-mail"
          class="w-full px-4 py-2 text-sm bg-transparent border border-[#27272A] rounded-[6px] focus:outline-none focus:border-white text-white"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-white mb-2.5">Password</label>
        <input
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 text-sm bg-transparent border border-[#27272A] rounded-[6px] focus:outline-none focus:border-white text-white"
        />
      </div>
      <button
        type="submit"
        class="mt-6 w-full bg-[#BB86FC] text-[#1E1E1E] text-sm font-bold py-2 rounded-[6px] cursor-pointer transition-all duration-300 ease-out hover:bg-[#AC70F7]"
      >
        Login
      </button>
    </form>
    <p class="mt-5 text-[#A1A1AA] text-sm text-center">Don’t have an account? <router-link to="/register" class="text-white font-medium hover:underline">Create Account</router-link></p>
  </section>
</template>
