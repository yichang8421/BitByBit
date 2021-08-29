<template>
    <Layout class="lay-wrapper">
        <Tabs
                class-prefix="moneyTypeList"
                :data-source="recrodTypeList"
                :value.sync="record.type"
        />
        <div class="parts-wrapper">
            <FormItem fiel-name="备注"
                      @update:value="onUpdateNotes"
                      :value.sync="record.notes"
                      placeholder="此处添加备注"/>
            <div class="notes">
                <FormItem fiel-name="日期"
                          :value.sync="record.createdAt"
                          type="date"
                          placeholder="此处添加日期"/>
            </div>
            <Tags :data-source.sync="tags"
                  @update:value="onUpdateTags"/>
        </div>
        <NumberPad :value.sync="record.amount"
                   @submit="saveRecord"
                   class="calculator"
                   ref='resetOutput'/>
    </Layout>
</template>

<script lang="ts">
    import NumberPad from "@/components/money/NumberPad.vue";
    import Tags from "@/components/money/Tags.vue";
    import FormItem from "@/components/FormItem.vue";
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
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
            amount: 0,
            createdAt: new Date().toISOString()
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
                window.alert("要至少选择一个标签作为记录哦~");
            } else {
                this.$store.commit("createRecords", this.record);
                this.record.notes = "";
                this.$refs.resetOutput.clear();
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .lay-wrapper {
        position: relative;

        .calculator {
            position: absolute;
            width: 100%;
            bottom: 66px;
        }

        .parts-wrapper {
            position: absolute;
            width: 100%;
            top: 64px;
            bottom: 382px;
            overflow: auto;
        }

        ::v-deep {
            .moneyTypeList-tabs-item {

                &.selected {
                    background: #ffe531;

                    &::after {
                        background: $selected;
                    }
                }
            }
        }
    }


</style>