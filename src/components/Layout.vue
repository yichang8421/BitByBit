<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot/>
        </div>
        <Nav></Nav>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Layout"
    };
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        height: 100vh;
        border: 1px solid green;
        display: flex;
        flex-direction: column;
    }

    .content {
        border: solid blue 1px;
        overflow: auto;
        flex-grow: 1;
    }
</style>