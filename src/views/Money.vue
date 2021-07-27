<template>
    <Layout class-prefix="layout">
        <NumberPad/>
        <Tags :data-source="tags"/>
        <Notes/>
        <Types :value.sync="record.type"/>
    </Layout>
</template>

<script lang="ts">
    import NumberPad from "@/components/money/NumberPad.vue";
    import Tags from "@/components/money/Tags.vue";
    import Notes from "@/components/money/Notes.vue";
    import Types from "@/components/money/Types.vue";
    import Vue from "vue";
    import {Component} from "vue-property-decorator";

    type Record = {
        type: string,
        notes: string,
        tags: string[],
        amount: number,
        createdAt?: Date
    }

    @Component({
        components: {Types, Notes, Tags, NumberPad}
    })

    export default class Money extends Vue {
        tags = ["衣", "食", "住", "行"];
        record:Record = {
            type:'-',
            notes:'',
            tags:[],
            amount:0
        }
    }
</script>

<style lang="scss">
    .layout-content {
        border: 1px solid red;
        display: flex;
        flex-direction: column-reverse;

    }
</style>