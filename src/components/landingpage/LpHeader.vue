<template>
    <router-link to="/">
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