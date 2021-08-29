<template>
    <Layout>
        <span class="labelPagTitle">标 签</span>
        <div class="tags">
            <router-link class="tag"
                         v-for="tag in tags"
                         :key="tag.id"
                         :to="`/labels/edit/${tag.id}`">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <MyPrompt
                    :newName="newName"
                    @update:newName="addNewName"
                    @submit:newName="createTag"
            />
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Button from "@/components/Button.vue";
    import {mixins} from "vue-class-component";
    import TagHelper from "@/mixins/tagHelper";

    @Component({
        components: {Button},
    })
    export default class Labels extends mixins(TagHelper) {
        newName = "";

        get tags() {
            return this.$store.state["tagList"];
        }

        beforeCreate() {
            this.$store.commit("fetchTags");
        }

        addNewName(value: string) {
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
    .labelPagTitle {
        font-size: 18px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 32px;
    }

    .tags {
        background: white;
        font-size: 16px;
        padding-left: 16px;

        > .tag {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e3e3e3;

            svg {
                width: 16px;
                height: 16px;
                color: #666;
                margin-right: 16px;
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
            text-align: center;
            padding: 16px;
            margin-top: 44-16px;
        }
    }
</style>