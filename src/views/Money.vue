<template>
    <Layout class-prefix="layout">
        {{record}}
        <NumberPad :value.sync="record.amount"
                   @submit="saveRecord"/>
        <Tags :data-source.sync="tags"
              @update:value="onUpdateTags"/>
        <div class="notes">
            <FormItem fiel-name="备注"
                      @update:value="onUpdateNotes"
                      placeholder="此处添加备注"/>
        </div>
<!--        <Types :value.sync="record.type"/>-->
        <Tabs :data-source="recrodTypeList"
              :value.sync="record.type"/>
    </Layout>
</template>

<script lang="ts">
    import NumberPad from "@/components/money/NumberPad.vue";
    import Tags from "@/components/money/Tags.vue";
    import FormItem from "@/components/FormItem.vue";
    import Types from "@/components/money/Types.vue";
    import Vue from "vue";
    import {Component, Watch} from "vue-property-decorator";
    import recordTypeList from "@/constants/recordTypeList";
    import Tabs from "@/components/statistics/Tabs.vue";

    @Component({
        components: {Tabs, Types, FormItem, Tags, NumberPad}
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

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        saveRecord() {
            this.$store.commit("createRecords", this.record);
        }
    }
</script>

<style lang="scss">
    .layout-content {
        /*border: 1px solid red;*/
        display: flex;
        flex-direction: column-reverse;

    }

    .notes {
        padding: 12px 0;
    }
</style>