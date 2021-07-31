<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount"
                   @submit="saveRecord"/>
        <Tags :data-source.sync="tags"
              @update:value="onUpdateTags"
        />
        <Notes @update:value="onUpdateNotes"/>
        <Types :value.sync="record.type"/>
    </Layout>
</template>

<script lang="ts">
    import NumberPad from "@/components/money/NumberPad.vue";
    import Tags from "@/components/money/Tags.vue";
    import Notes from "@/components/money/Notes.vue";
    import Types from "@/components/money/Types.vue";
    import Vue from "vue";
    import {Component, Watch} from "vue-property-decorator";
    import recordListModel from "@/models/recordListModel";
    import tagListModel from "@/models/tagListModel";

    // eslint-disable-next-line no-undef
    const recordList = recordListModel.fetch();
    const tagList = tagListModel.fetch().map(item => item.name);

    @Component({
        components: {Types, Notes, Tags, NumberPad}
    })

    export default class Money extends Vue {
        tags = tagList;
        // eslint-disable-next-line no-undef
        record: RecordItem = {
            type: "-",
            notes: "",
            tags: [],
            amount: 0
        };
        // eslint-disable-next-line no-undef
        recordList: RecordItem[] = recordList;

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        saveRecord() {
            // eslint-disable-next-line no-undef
            const newRecord: RecordItem = recordListModel.clone(this.record);
            newRecord.createdAt = new Date();
            this.recordList.push(newRecord);
        }

        @Watch("recordList")
        onRecordListChange() {
            recordListModel.save(this.recordList);
        }
    }
</script>

<style lang="scss">
    .layout-content {
        /*border: 1px solid red;*/
        display: flex;
        flex-direction: column-reverse;

    }
</style>