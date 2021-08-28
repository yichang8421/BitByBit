<template>
    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money"/>
            记账
        </router-link>

        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="label"/>
            标签
        </router-link>

        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics"/>
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">
    import Vue from "vue";

    export default class Nav extends Vue {

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    nav {
        @extend %outerShadow;
        display: flex;
        flex-direction: row;
        font-size: 12px;

        > .item {
            padding: 6px 0;
            width: 33.33%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .icon {
                width: 30px;
                height: 30px;
            }
        }

        > .item.selected {
            color: $color-highlight;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.15);
            background: $selected;
        }
    }

</style>