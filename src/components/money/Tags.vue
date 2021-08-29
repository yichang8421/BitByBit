<template>
    <div>
        <div class="tags">
            <ul class="current">
                <li v-for="tag in dataSource"
                    :key="tag.id"
                    :class="{selected: selectedTags.indexOf(tag) >=0}"
                    @click="toggle(tag)">{{tag.name}}
                </li>
            </ul>
        </div>
        <div class="createTag-wrapper">
            <MyPrompt
                    :newName="newName"
                    @update:newName="addNewName"
                    @submit:newName="createTag"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import {mixins} from "vue-class-component";

    @Component
    export default class Tags extends Vue {
        newName = "";
        @Prop(Array) readonly dataSource: string[] | undefined;
        selectedTags: string[] = [];

        get tagList() {
            return this.$store.state["tagList"];
        }

        created() {
            this.$store.commit("fetchTags");
        }

        toggle(tag: string) {
            const index = this.selectedTags.indexOf(tag);
            if (index >= 0) {
                this.selectedTags.splice(index, 1);
            } else {
                this.selectedTags.push(tag);
            }
            this.$emit("update:value", this.selectedTags);
        }

        addNewName(value: string){
            this.newName = value;
        }

        createTag() {
            if (this.newName) {
                this.$store.commit("createTag", this.newName);
                this.newName = "";
            } else {
                window.alert("标签名不能为空");
            }
        }
    }

</script>

<style lang="scss" scoped>
    .tags {
        font-size: 14px;
        padding: 16px;

        > .current {
            display: flex;
            flex-wrap: wrap;
            overflow: auto;

            > li {
                $bg: #d9d9d9;
                background: $bg;
                $h: 24px;
                height: $h;
                /* 设置居中 */
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 4px;

                &.selected {
                    background: #ffb700;
                    box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1) inset,
                    4px 4px 10px -8px rgba(0, 0, 0, 0.3) inset;
                }
            }


        }
    }
    .createTag {
        background: #767676;
        color: white;
        border-radius: 4px;
        border: none;
        height: 40px;
        padding: 0 16px;

        &-wrapper {
            width: 100%;
            text-align: center;
            padding: 16px;
            margin-top: 44-16px;
        }
    }
</style>