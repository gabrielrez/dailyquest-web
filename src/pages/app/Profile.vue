<template>
    <main class="max-w-[93.75rem] mx-auto p-12">
        <section class="flex gap-20">
            <SideBarMenu />
            <div class="w-full ml-80">
                <Header />
                <ProfilePicture class="mt-20" />
                <div class="mt-12 flex items-start gap-10">
                    <ProfileEdit />
                    <ProfileActivity />
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import SideBarMenu from "@/components/app/global/SideBarMenu.vue";
import Header from "@/components/app/profile/Header.vue";
import ProfilePicture from "../../components/app/global/ProfilePicture.vue";
import ProfileEdit from "../../components/app/profile/ProfileEdit.vue";
import ProfileActivity from "../../components/app/profile/ProfileActivity.vue";
</script>
