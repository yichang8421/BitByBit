<template>
    <div>
        <div class="tags">
            <ul class="current">
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
            </ul>
            <div class="new">
                <button>新增标签</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Tags"
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
                background: #d9d9d9;
                $h: 24px;
                height: $h;
                /* 设置居中 */
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 4px;

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