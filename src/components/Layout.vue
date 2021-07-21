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
        display: flex;
        flex-direction: column;
    }

    .content {
        overflow: auto;
        flex-grow: 1;
    }
</style>