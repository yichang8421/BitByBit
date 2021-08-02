<template>
    <div>
        <ul class="tabs">
            <li v-for="item in dataSource" :key="item.value"
                :class="liClass(item)"
                @click="select(item)">
                {{item.taxt}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class Tabs extends Vue {
        @Prop({required: true, type: Array})
            // eslint-disable-next-line no-undef
        dataSource!: DataSourceItem[];
        @Prop(String)
        readonly value!: string;
        @Prop(String)
        classPrefix?: string;

        // eslint-disable-next-line no-undef
        liClass(item: DataSourceItem) {
            return {
                [this.classPrefix + "-tabs-item"]: this.classPrefix,
                selected: item.value === this.value
            }
                ;
        }

        // eslint-disable-next-line no-undef
        select(item: DataSourceItem) {
            this.$emit("update:value", item.value);
        }
    }
</script>

<style lang="scss" scoped>
    .tabs {
        background: #c4c4c4;
        display: flex;
        text-align: center;
        font-size: 24px;
        /*border: 1px solid red;*/


        > li {
            width: 50%;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }
</style>