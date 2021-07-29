<template>
    <Layout>
        <ol class="tags">
            <li v-for="tag in tags" :key="tag">
                <span>{{tag}}</span>
                <Icon name="right"/>
            </li>
        </ol>
        <div class="createTag-wrapper">
            <button class="createTag"
                    @click="createTag">
                新建标签
            </button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Button from "@/components/Button.vue";
    import tagListModel from "@/models/tagListModel";

    tagListModel.fetch();

    @Component({
        components: {Button}
    })
    export default class Labels extends Vue {
        tags = tagListModel.data;

        createTag(){
            console.log("nihao");
            const name = window.prompt('请输入自定义标签');
            if (name){
                tagListModel.create(name);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        background: white;
        font-size: 16px;
        padding-left: 16px;

        > li {
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
            margin-top: 128-16px;
        }
    }
</style>