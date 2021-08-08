<template>
    <div class="wrapper"></div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import echarts from 'echarts';

    @Component
    export default class Chart extends Vue {
        @Prop() options: any;
        mounted(){
            console.log(this.options);
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper{
        height: 400px;
    }
</style>