<template>
    <div>
        <label class="formItem">
            <span class="name">{{fielName}}</span>
            <template v-if="type === 'date'">
                <input :type="type || 'text'"
                       :value="formatDate(value)"
                       @input="onValueChanged($event.target.value)"
                       :placeholder="placeholder">
            </template>
            <template v-else>
                <input :type="type || 'text'"
                       :value="value"
                       @input="onValueChanged($event.target.value)"
                       :placeholder="placeholder">
            </template>
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop, Watch} from "vue-property-decorator";
    import dayjs from "dayjs";

    @Component
    export default class FormItem extends Vue {
        @Prop({required: true}) fielName!: string;
        @Prop(String) placeholder?: string;
        @Prop({default: ""}) readonly value!: string;
        @Prop(String) type?: string;

        onValueChanged(value: string) {
            this.$emit("update:value", value);
        }

        formatDate(isoString: string) {
            return dayjs(isoString).format("YYYY-MM-DD");
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