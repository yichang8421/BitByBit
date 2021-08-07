<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount"
                   @submit="saveRecord"/>
        <div class="notes">
            <FormItem fiel-name="备注"
                      @update:value="onUpdateNotes"
                      :value.sync="record.notes"
                      placeholder="此处添加备注"/>
        </div>
        <Tags :data-source.sync="tags"
              @update:value="onUpdateTags"/>
        <Tabs :data-source="recrodTypeList"
              :value.sync="record.type"/>
    </Layout>
</template>

<script lang="ts">
    import NumberPad from "@/components/money/NumberPad.vue";
    import Tags from "@/components/money/Tags.vue";
    import FormItem from "@/components/FormItem.vue";
    import Vue from "vue";
    import {Component, Watch} from "vue-property-decorator";
    import recordTypeList from "@/constants/recordTypeList";
    import Tabs from "@/components/Tabs.vue";

    @Component({
        components: {Tabs, FormItem, Tags, NumberPad}
    })

    export default class Money extends Vue {
        // eslint-disable-next-line no-undef
        get tags() {
            return this.$store.state["tagList"];
        }

        get recordList() {
            return this.$store.state["recordList"];
        }

        recrodTypeList = recordTypeList;

        // eslint-disable-next-line no-undef
        record: RecordItem = {
            type: "-",
            notes: "",
            tags: [],
            amount: 0
        };

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        // eslint-disable-next-line no-undef
        onUpdateTags(value: Tag[]) {
            this.record.tags = value;
        }

        saveRecord() {
            if (!this.record.tags.length) {
                return window.alert("请选择至少一个标签");
            }
            this.$store.commit("createRecords", this.record);
            this.record.notes = "";
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep .layout-content {
        /*border: 1px solid red;*/
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        padding: 12px 0;
    }

</style>