<template>
    <Layout>
        <Tabs class-prefix="recordTypeList" :data-source="recordTypeList" :value.sync="recordType"/>
        <Tabs class-prefix="intervalList" :data-source="intervalList" :value.sync="interval"/>
        <div>
            recordType:{{recordType}}
            <br>
            interval:{{interval}}
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Tabs from "@/components/Tabs.vue";
    import intervalList from "@/constants/intervalList";
    import recordTypeList from "@/constants/recordTypeList";

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        interval = "day";
        recordType = "-";
        intervalList = intervalList;
        recordTypeList = recordTypeList;
    }
</script>

<style lang="scss" scoped>
    ::v-deep .recordTypeList-tabs-item {
        background: white;

        &.selected {
            background: #c4c4c4;

            &::after {
                display: none;
            }
        }
    }

    ::v-deep .intervalList-tabs-item {
        height: 48px;
    }
</style>