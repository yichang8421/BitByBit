<template>
    <div>
        <div class="mask" v-if="showModal" @click="showModal=false"></div>
        <button @click="showModal=true" class="add">添加</button>
        <div class="pop" v-if="showModal">
            <div class="prompt">
                <div>请输入新增标签名：</div>
                <div>
                    <input
                            type="text"
                            :newName="newName"
                            placeholder="此处输入标签名"
                            @input="addNewName($event.target.value)"
                    />
                </div>
                <div>
                    <button
                            @click="showModal=false;createTag();"
                            class="btn"
                    >提交
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class MyPrompt extends Vue {
        showModal = false;

        // @Prop({default: ""})
        // readonly newName!: string;
        newName = "";

        addNewName(value: string) {
            this.newName = value;
        }

        createTag() {
            if (this.newName) {
                this.$store.commit("createTag", this.newName);
            } else {
                window.alert("标签名不能为空");
            }
        }

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
        height: 100%;
        z-index: 2;
        overflow: hidden;

        > .prompt {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            > input {
                height: 40px;
                flex-grow: 1;
                /*background: transparent;*/
                border-radius: 5px;
                border: 1px solid #e5dfdf;
                padding-right: 16px;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .btn {
        background-color: #fff;
        opacity: 1;
        border-radius: 4px;
        border: 1px solid blue;
        padding: 4px 12px;
        margin-top: 1em;
        margin-left: 8px;
    }

    .add {
        font-weight: bold;
        color: #97a5ff;
        border: none;
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