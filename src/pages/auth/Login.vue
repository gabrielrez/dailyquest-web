<template>
    <div class="max-w-7xl mx-auto mt-8">
        <LpHeader />
        <LoginForm />
    </div>
</template>

<script>
import LpHeader from "../../components/landingpage/LpHeader.vue";
import LoginForm from "../../components/auth/LoginForm.vue";

export default {
    components: {
        LpHeader,
        LoginForm,
    },
};
</script>
