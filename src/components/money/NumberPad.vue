<template>
    <div class="numberPad">
        <div class="output">{{output || '&nbsp;'}}</div>
        <div class="button">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="inputContent">+</button>
            <button @click="remove">删除</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="inputContent">-</button>
            <button @click="clear">AC</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="inputContent">×</button>
            <button @click="ok" class="ok">保存</button>
            <button @click="percent">%</button>
            <button @click="inputContent">0</button>
            <button @click="inputContent">.</button>
            <button @click="inputContent">÷</button>
            <button @click="calculate">=</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class NumberPad extends Vue {
        @Prop(Number) readonly value!: number;
        output = this.value.toString();

        // eslint-disable-next-line no-undef
        calcultorData: Data = {
            isDecimalAdded: false,
            isOperatorAdded: false,
            isStarted: false
        };

        isOperator(character: string) {
            return ["+", "-", "×", "÷"].indexOf(character) > -1;
        }

        inputContent(event: MouseEvent) {
            const button = (event.target as HTMLButtonElement);
            const input = button.textContent!;

            // if (this.output.length === 16) {
            //     return;
            // }

            if (this.output === "0" && !this.isOperator(input)) {
                if (input === ".") {
                    this.output += input;
                    this.calcultorData.isDecimalAdded = true;
                } else {
                    this.output = input;
                }

                this.calcultorData.isStarted = true;
                return;
            }

            if (!this.isOperator(input)) {
                if (input === "." && this.calcultorData.isDecimalAdded) {return;}

                if (input === ".") {
                    this.calcultorData.isDecimalAdded = true;
                    this.calcultorData.isOperatorAdded = true;
                } else {
                    this.calcultorData.isOperatorAdded = false;
                }

                this.output += input;
            }

            // 输入运算符号时
            if (this.isOperator(input) && !this.calcultorData.isOperatorAdded) {
                this.output += input;
                this.calcultorData.isDecimalAdded = false;
                this.calcultorData.isOperatorAdded = true;
            }


            // if (input != ".") {
            //     if (this.output === "0") {
            //         this.output = input;
            //     } else {
            //         this.output += input;
            //     }
            // }
            //
            // if (input === "." && this.output.indexOf(".") === -1) {
            //     this.output += input;
            // }
        }

        clear() {
            this.output = "0";
            this.calcultorData.isDecimalAdded = false;
            this.calcultorData.isOperatorAdded = false;
            this.calcultorData.isStarted = false;
        }

        remove() {
            this.output = this.output.slice(0, -1) || "0";
        }

        ok() {
            this.calculate();
            //修改record.amount
            const number = parseFloat(this.output);
            this.$emit("update:value", number);
            //提交record
            this.$emit("submit", number);
            this.output = "0";
        }

        calculate() {
            let result = this.output
                .replace(new RegExp("×", "g"), "*")
                .replace(new RegExp("÷", "g"), "/");

            this.output = parseFloat(eval(result).toFixed((9))).toString();
            this.calcultorData.isOperatorAdded = false;
            this.calcultorData.isDecimalAdded = false;
        }

        percent() {
            this.output = (parseFloat(this.output) / 100).toString();
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
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            background: white;
        }

        > .button {
            @extend %clearFix;

            > button {
                width: 20%;
                height: 64px;
                float: left;
                background: transparent;
                border: none;
                border-radius: 5px;
                display: block;

                //&.ok {
                //    height: 64px*2;
                //    float: right;
                //}

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

                &:nth-child(15), &:nth-child(19) {
                    background: darken($bg, 4%*6);
                }

                &:nth-child(20) {
                    background: darken($bg, 4%*7);
                }

                &:active {
                    box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1) inset,
                    4px 4px 10px -8px rgba(0, 0, 0, 0.3) inset;
                }
            }
        }
    }
</style>