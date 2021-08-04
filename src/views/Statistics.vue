<template>
    <Layout>
        <Tabs class-prefix="recordTypeList" :data-source="recordTypeList" :value.sync="recordType"/>
        <Tabs class-prefix="intervalList" :data-source="intervalList" :value.sync="interval" height="48px"/>

        <ol>
            <li v-for="(group,index) in result" :key="index">
                <h3 class="title">{{group.title}}</h3>
                <ol>
                    <li class="record" v-for="item in group.items" :key="item.id">
                        <span>{{tagString(item.tags).id}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Tabs from "@/components/Tabs.vue";
    import intervalList from "@/constants/intervalList";
    import recordTypeList from "@/constants/recordTypeList";

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        beforeCreate() {
            this.$store.commit("fetchRecords");
        }

        get recordList() {
            // eslint-disable-next-line no-undef
            return (this.$store.state as RootState).recordList;
        }

        // eslint-disable-next-line getter-return
        get result() {
            const {recordList} = this;

            // eslint-disable-next-line no-undef
            const hashTable: { [key: string]: HashTableIValue } = {};

            for (let i = 0; i < recordList.length; i++) {
                const [date, time] = recordList[i].createdAt!.split("T");
                hashTable[date] = hashTable[date] || {title: date, items: []};
                hashTable[date].items.push(recordList[i]);

            }
            return hashTable;
        }

        // eslint-disable-next-line no-undef
        tagString(tags: Tag[]) {
            return tags.length === 0 ? "无" : tags!.join(",");
        }


        interval = "day";
        recordType = "-";
        intervalList = intervalList;
        recordTypeList = recordTypeList;
    }
</script>

<style lang="scss" scoped>
    ::v-deep {
        .recordTypeList-tabs-item {
            background: white;

            &.selected {
                background: #c4c4c4;

                &::after {
                    display: none;
                }
            }
        }

        .intervalList-tabs-item {
            /*height: 48px;*/
        }
    }

    %item {
        padding: 8px 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title {
        @extend %item;
    }

    .record {
        @extend %item;
        background: white;
    }

    .notes {
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }
</style>