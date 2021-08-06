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
            <div class="new">
                <button @click="createTag">新增标签</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import {mixins} from "vue-class-component";
    import TagHelper from "@/mixins/tagHelper";
    // import store from "@/store";

    @Component
    export default class Tags extends mixins(TagHelper) {
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
    }

</script>

<style lang="scss" scoped>
    .tags {
        font-size: 14px;
        padding: 16px;
        background: white;

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
                    background: darken($bg, 15%);
                    box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1) inset,
                    4px 4px 10px -8px rgba(0, 0, 0, 0.3) inset;
                }
            }
        }

        > .new {
            padding-top: 16px;

            button {
                background: transparent;
                border: none;
                color: #999;
                border-bottom: 1px solid #999;
                padding: 0 3px;
            }
        }
    }
</style>