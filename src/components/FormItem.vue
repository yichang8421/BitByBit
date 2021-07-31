<template>
    <div>
        <label class="formItem">
            <span class="name">{{fielName}}</span>
            <input type="text"
                   :value="value"
                   @input="onValueChanged($event.target.value)"
                   :placeholder="placeholder">
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop, Watch} from "vue-property-decorator";

    @Component
    export default class FormItem extends Vue {
        @Prop({required: true}) fielName!: string;
        @Prop(String) placeholder?: string;
        @Prop({default: ""}) readonly value!: string;

        onValueChanged(value: string) {
            this.$emit("update:value", value);
        }
    }
</script>

<style lang="scss" scoped>
    .formItem {
        display: block;
        font-size: 14px;
        padding-left: 16px;
        display: flex;
        align-items: center;

        > .name {
            padding-right: 16px;
        }

        input {
            /*padding: 16px 0;*/
            height: 40px;
            flex-grow: 1;
            background: transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>