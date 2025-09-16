<template>
  <div class="max-w-7xl mx-auto mt-8">
    <LpHeader />
    <RegisterForm />
  </div>
</template>

<script>
import LpHeader from "../../components/landingpage/LpHeader.vue";
import RegisterForm from "../../components/auth/RegisterForm.vue";

export default {
  components: {
    LpHeader,
    RegisterForm,
  },
};
</script>
