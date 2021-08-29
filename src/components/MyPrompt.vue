<template>
    <div>
        <div class="mask" v-if="showModal" @click="showModal=false"></div>
        <button @click="showModal=true" class="add">添加</button>
        <div class="pop" v-if="showModal">
            <div class="prompt">
                <input type="text" name="name" placeholder="标签名"/>
                <button @click="showModal=false" class="btn">提交</button>
            </div>
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
    @import "~@/assets/style/helper.scss";

    .mask {
        background-color: #000;
        opacity: 0.3;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1
    }
    .pop {
        background-color: #fff;
        /*border: 1px solid red;*/
        opacity: 0.85;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height:100%;
        z-index: 2;
        overflow:hidden;
        > .prompt{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .btn {
        background-color: #fff;
        opacity: 1;
        border-radius: 4px;
        border: 1px solid blue;
        padding: 4px 12px;
        margin-top: 1em;
        margin-left: 16px;
    }
    .add {
        font-weight: bold;
        color: #97a5ff;
        border:none;
        background: #d9d9d9;
        border: none;
        height: 40px;
        padding: 0 16px;

        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 44-16px;
        }
    }
</style>