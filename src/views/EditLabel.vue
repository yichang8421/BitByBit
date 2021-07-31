<template>
    <Layout>
        <div class="navBar">
            <Icon name="left" class="leftIcon"/>
            <span class="title">编辑标签</span>
        </div>
        <FormItem fiel-name="标签名"
               placeholder="请输入标签名"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import tagListModel from "@/models/tagListModel";
    import FormItem from "@/components/money/FormItem.vue";
    @Component({
        components: {FormItem}
    })
    export default class EditLabel extends Vue {
        created() {
            const id = this.$route.params.id;
            tagListModel.fetch();
            const tags = tagListModel.data;
            const tag = tags.filter(t => t.id === id)[0];
            if (tag) {
                console.log(tag);
            } else {
                this.$router.replace("/404");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navBar {
        text-align: center;
        font-size: 16px;
        padding: 12px 16px;
        background: white;
        display: flex;
        align-content: center;
        justify-content: space-between;

        > .leftIcon {
            width: 16px;
            height: 16px;
        }
    }
</style>