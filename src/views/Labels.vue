<template>
    <Layout>
        <ol class="tags">
            <li>
                <span>衣</span>
                <Icon name="right"/>
            </li>
            <li>
                <span>食</span>
                <Icon name="right"/>
            </li>
            <li>
                <span>住</span>
                <Icon name="right"/>
            </li>
            <li>
                <span>行</span>
                <Icon name="right"/>
            </li>
        </ol>
        <div class="createTag-wrapper">
            <Button class="createTag">
                新建标签
            </Button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Button from "@/components/Button.vue";

    @Component({
        components: {Button}
    })
    export default class Labels extends Vue {

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