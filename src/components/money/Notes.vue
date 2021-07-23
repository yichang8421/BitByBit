<template>
    <div>
        <label class="notes">
            <span class="name">备注</span>
            <input type="text" placeholder="此处添加文字">
        </label>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Notes"
    }
</script>

<style lang="scss" scoped>
    .notes {
        display: block;
        font-size: 14px;
        background: #f5f5f5;
        padding-left: 16px;
        display: flex;
        align-items: center;

        > .name {
            padding-right: 16px;
        }

        input {
            /*padding: 16px 0;*/
            height: 64px;
            flex-grow: 1;
            background: transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>