<template>
    <Layout>
        <div class="navBar">
            <Icon name="left" class="leftIcon" @click="goBack"/>
            <span class="title">编辑标签</span>
            <span class="rightSpan"/>
        </div>
        <div class="form-wrapper">
            <FormItem :value="currentTag.name"
                      @update:value="updateTag"
                      fiel-name="标签名"
                      placeholder="请输入标签名"/>
        </div>
        <div class="button-wrapper">
            <Button @click="removeTag(); goBack()">删除标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import FormItem from "@/components/FormItem.vue";
    import Button from "@/components/Button.vue";
    // import store from "@/store/index2";

    @Component({
        components: {Button, FormItem},
    })
    export default class EditLabel extends Vue {
        get currentTag() {
            return this.$store.state["currentTag"];
        }

        created() {
            this.$store.commit("fetchTags");
            const id = this.$route.params.id;
            this.$store.commit("setCurrentTag", id);
            if (!(this.currentTag)) {
                this.$router.replace("/404");
            }
        }

        updateTag(name: string) {
            if (this.currentTag) {
                this.$store.commit("updateTag", {
                    id: this.currentTag.id,
                    name
                });
            }
        }

        removeTag() {
            if (this.currentTag) {
                this.$store.commit('removeTag', this.currentTag.id);
            }
        }

        goBack() {
            this.$router.back();
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
        align-items: center;
        justify-content: space-between;

        > .title {
        }

        > .leftIcon {
            width: 16px;
            height: 16px;
        }

        > .rightSpan {
            width: 16px;
            height: 16px;
        }
    }

    .form-wrapper {
        background: white;
        margin-top: 8px;
    }

    .button-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
</style>