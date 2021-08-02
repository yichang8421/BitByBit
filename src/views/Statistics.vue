<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
        <div>
            type:{{type}}
            <br>
            interval:{{interval}}
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Tabs from "@/components/statistics/Tabs.vue";

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        interval = "day";
        type = "-";
        intervalList = [
            {taxt: "按天", value: "day"},
            {taxt: "按周", value: "week"},
            {taxt: "按月", value: "month"}
        ];
        typeList = [
            {taxt: "支出", vlaue: "-"},
            {taxt: "收入", value: "+"}
        ];
    }
</script>

<style lang="scss" scoped>
    ::v-deep .type-tabs-item {
        background: white;

        &.selected {
            background: #c4c4c4;

            &::after {
                display: none;
            }
        }
    }
</style>