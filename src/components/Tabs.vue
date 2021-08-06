<template>
    <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
        <li v-for="item in dataSource" :key="item.value"
            class="tabs-item"
            :class="liClass(item)"
            @click="select(item)"
            :style="{height:height}">
            {{item.taxt}}
        </li>
    </ul>
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
        @Prop({type: String, default: "64px"})
        height!: string;

        // eslint-disable-next-line no-undef
        liClass(item: DataSourceItem) {
            return {
                [this.classPrefix + "-tabs-item"]: this.classPrefix,
                selected: item.value === this.value
            };
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


        &-item {
            width: 50%;
            /*height: 64px;*/
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            border-radius: 0px 0px 10px 10px;

            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }

            &.selected {
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.15);
            }
        }
    }
</style>