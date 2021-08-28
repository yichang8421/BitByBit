<template>
    <div>
        <div class="mask" v-if="showModal" @click="showModal=false"></div>
        <button @click="showModal=true" class="btn">添加</button>
        <div class="pop" v-if="showModal">
            <button @click="showModal=false" class="btn">提交</button>

        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class MyPrompt extends Vue {
        showModal= false
    }
</script>

<style lang="scss" scoped>
    .mask {
        background-color: #000;
        opacity: 0.3;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1
    }
    .pop {
        background-color: #fff;

        position: fixed;
        top: 100px;
        left: 300px;
        width: calc(100% - 600px);
        height:calc(100% - 200px);
        z-index: 2
    }
    .btn {
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid blue;
        padding: 4px 12px;
    }
</style>