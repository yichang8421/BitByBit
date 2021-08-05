<template>
    <Layout>
        <Tabs class-prefix="recordTypeList" :data-source="recordTypeList" :value.sync="recordType"/>
        <!--        <Tabs class-prefix="intervalList" :data-source="intervalList" :value.sync="interval" height="48px"/>-->

        <ol v-if="groupedList.length>0">
            <li v-for="(group,index) in groupedList" :key="index">
                <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
                <ol>
                    <li class="record" v-for="item in group.items" :key="item.id">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="noResult">
            目前没有收支记录
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Tabs from "@/components/Tabs.vue";
    // import intervalList from "@/constants/intervalList";
    import recordTypeList from "@/constants/recordTypeList";
    import dayjs from "dayjs";
    import clone from "@/lib/clone";

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        created() {
            this.$store.commit("fetchRecords");
        }

        // interval = "day";
        recordType = "-";
        // intervalList = intervalList;
        recordTypeList = recordTypeList;

        get recordList() {
            // eslint-disable-next-line no-undef
            return (this.$store.state as RootState).recordList;
        }

        // eslint-disable-next-line getter-return
        get groupedList() {
            const {recordList} = this;
            if (!recordList.length) return [];

            const newList = clone(recordList)
                .filter(r => r.type === this.recordType)
                .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

            if (!newList.length) return [] as Result;

            type Result = {
                title: string,
                total?: number,
                // eslint-disable-next-line no-undef
                items: RecordItem[]
            }[]

            const result: Result = [{title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"), items: [newList[0]]}];
            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];

                if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
                    last.items.push(current);
                } else {
                    result.push({title: dayjs(current.createdAt).format("YYYY-MM-DD"), items: [current]});
                }
            }

            result.map(group => {
                group.total = group.items.reduce((sum, item) => {
                    return sum + item.amount;
                }, 0);
            });

            return result;
        }

        // eslint-disable-next-line no-undef
        tagString(tags: Tag[]) {
            return tags.length === 0 ? "无" : tags.map(t => t.name).join("，");
        }

        beautify(string: string) {
            // const now = new Date();
            const now = dayjs();
            const day = dayjs(string);

            const oneDay = 86400 * 1000;
            if (day.isSame(now, "day")) {
                return "今天";
            } else if (day.isSame(now.valueOf() - oneDay, "day")) {
                return "昨天";
            } else if (day.isSame(now.subtract(2, "day"), "day")) {
                return "前天";
            } else if (day.isSame(now, "year")) {
                return day.format("M月D日");
            } else {
                return day.format("YYYY年M月D日");
            }
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep {
        .recordTypeList-tabs-item {
            background: #c4c4c4;

            &.selected {
                background: white;

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

    .noResult {
        padding: 32px;
        text-align: center;
    }
</style>