<template>
    <Layout class-prefix="layout">
        <NumberPad/>
        <Tags/>
        <Notes/>
        <Types :prop-a="1235"/>
    </Layout>
</template>

<script lang="ts">
    import NumberPad from "@/components/money/NumberPad.vue";
    import Tags from "@/components/money/Tags.vue";
    import Notes from "@/components/money/Notes.vue";
    import Types from "@/components/money/Types.vue";
    export default {
        name: "Money",
        components: {Types, Notes, Tags, NumberPad},
    };
</script>

<style lang="scss">
    .layout-content {
        border: 1px solid red;
        display: flex;
        flex-direction: column-reverse;

    }
</style>