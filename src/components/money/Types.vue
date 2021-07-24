<template>
    <div>
        <ul class="types">
            <li :class="type==='-' ? 'selected' : '' "
                @click="selectType('-')">支出
            </li>
            <li :class="type==='+'&& 'selected'"
                @click="selectType('+')">收入
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class Types extends Vue {
        @Prop(Number) propA: number | undefined;
        //其中 Number 是运行时类型。告诉Vue：propA 的类型是 Number
        // number | underfined 是编译时类型。告诉 TS，propA的类型


        type = "-";  //  data减号表示支出，加号表示收入
        selectType(type: string) {    // type 只能是‘-’ 或 ‘+’
            if (type !== "-" && type !== "+") {
                throw new Error("type is unknow.");
            }
            this.type = type;
        }

        mounted() {
            if (this.propA) {
                console.log(this.propA.toString());
            }
        }
    }

    // export default {
    //     name: "Types",
    //     props:['outside'],
    //     data() {
    //         return {
    //             type: '-'  // 减号表示支出，加号表示收入
    //
    //         }
    //     },
    //     mounted(){
    //         console.log(this.outside);
    //     },
    //     methods: {
    //         selectType(type) {    // type 只能是‘-’ 或 ‘+’
    //             if (type !== '-' && type !== '+') {
    //                 throw new Error('type is unknow.')
    //             }
    //             this.type = type;
    //
    //         }
    //     }
    // }
</script>

<style lang="scss" scoped>
    .types {
        background: #c4c4c4;
        display: flex;
        text-align: center;
        font-size: 24px;
        border: 1px solid red;


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