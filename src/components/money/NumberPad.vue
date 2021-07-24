<template>
    <div class="numberPad">
        <div class="output">{{output || '&nbsp;'}}</div>
        <div class="button">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="add">+</button>
            <button @click="remove">删除</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="minus">-</button>
            <button @click="clear">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="multiply">×</button>
            <button @click="ok" class="ok">OK</button>
            <button @click="percent">%</button>
            <button @click="inputContent">0</button>
            <button @click="inputContent">.</button>
            <button @click="division">÷</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";

    @Component
    export default class NumberPad extends Vue {
        output = "0";

        inputContent(event: MouseEvent) {
            const button = (event.target as HTMLButtonElement);
            const input = button.textContent!;

            if (this.output.length === 16) {
                return;
            }

            if (input != ".") {
                if (this.output === "0") {
                    this.output = input;
                } else {
                    this.output += input;
                }
            }

            if (input === "." && this.output.indexOf(".") === -1) {
                this.output += input;
            }
        }

        clear() {
            this.output = "0";
        }

        remove() {
            this.output = this.output.slice(0, -1) || "0";
        }

        ok() {
            return;
        }

        add() {
            return;
        }

        minus() {
            return;
        }

        multiply() {
            return;
        }

        division() {
            return;
        }

        percent() {
            return;
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .numberPad {
        > .output {
            @extend %clearFix;
            @extend %innerShadow;

            font-size: 36px;
            font-family: Consolas monospace;
            padding: 18px 16px;
            text-align: right;
        }

        > .button {
            @extend %clearFix;

            > button {
                width: 20%;
                height: 64px;
                float: left;
                background: transparent;
                border: none;

                &.ok {
                    height: 64px*2;
                    float: right;
                }

                $bg: #f2f2f2;

                &:nth-child(1) {
                    background: $bg;
                }

                &:nth-child(2), &:nth-child(6) {
                    background: darken($bg, 4%);
                }

                &:nth-child(3), &:nth-child(7), &:nth-child(11) {
                    background: darken($bg, 4%*2);
                }

                &:nth-child(4), &:nth-child(8), &:nth-child(12), &:nth-child(16) {
                    background: darken($bg, 4%*3);
                }

                &:nth-child(5), &:nth-child(9), &:nth-child(13), &:nth-child(17) {
                    background: darken($bg, 4%*4);
                }

                &:nth-child(10), &:nth-child(14), &:nth-child(18) {
                    background: darken($bg, 4%*5);
                }

                &:nth-child(15) {
                    background: darken($bg, 4%*7);
                }

                &:nth-child(19) {
                    background: darken($bg, 4%*6);
                }
            }
        }
    }
</style>