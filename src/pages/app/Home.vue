<template>
    <main class="max-w-[93.75rem] mx-auto p-12">
        <section class="flex gap-20">
            <SideBarMenu />
            <div class="w-full ml-80">
                <Header />
                <CollectionsList />
            </div>
        </section>
    </main>
</template>

<script>
import SideBarMenu from "@/components/app/global/SideBarMenu.vue";
import Header from "@/components/app/home/Header.vue";
import CollectionsList from "@/components/app/home/CollectionsList.vue";

export default {
    components: {
        SideBarMenu,
        Header,
        CollectionsList,
    },
};
</script>
