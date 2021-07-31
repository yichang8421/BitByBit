<template>
    <Layout>
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
            <Button class="createTag"
                    @click="createTag">
<!-- Button使用单独封装的click事件，也可以使用.native修饰符使用原生click事件  -->
                新建标签
            </Button>
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

        createTag() {
            const name = window.prompt("请输入自定义标签");
            if (name) {
                const message = tagListModel.create(name);
                if (message === "duplicated") {
                    window.alert("此标签名已添加");
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
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