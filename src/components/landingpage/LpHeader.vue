<template>
    <router-link to="/" class="inline-block">
        <img :src="logo" alt="DailyQuest" />
    </router-link>
</template>

<script>
import logo from '../../assets/DailyQuest.svg'

export default {
    data() {
        return { logo }
    }
}
</script>