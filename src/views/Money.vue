<template>
    <Layout class-prefix="layout">
        <NumberPad/>
        <Tags :data-source="tags"/>
        <Notes/>
        <Types/>
    </Layout>
</template>

<script>
    import NumberPad from "@/components/money/NumberPad.vue";
    import Tags from "@/components/money/Tags.vue";
    import Notes from "@/components/money/Notes.vue";
    import Types from "@/components/money/Types.vue";

    export default {
        name: "Money",
        components: {Types, Notes, Tags, NumberPad},
        data() {
            return {
                tags: ['衣', '食', '住', '行']
            }
        }
    };
</script>

<style lang="scss">
    .layout-content {
        border: 1px solid red;
        display: flex;
        flex-direction: column-reverse;

    }
</style>