<template>
    <Layout>
        <Tabs class-prefix="recordTypeList" :data-source="recordTypeList" :value.sync="recordType"/>
        <div class="chart-wrapper" ref="chartWrapper">
            <Chart class="chart" :options="chartOptions"/>
        </div>
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
    import Chart from "@/components/Chart.vue";
    import _ from "lodash";
    import day from "dayjs";

    @Component({
        components: {Tabs, Chart}
    })
    export default class Statistics extends Vue {
        created() {
            this.$store.commit("fetchRecords");
        }

        mounted() {
            const div = (this.$refs.chartWrapper as HTMLDivElement);
            div.scrollLeft = div.scrollWidth;
        }

        // interval = "day";
        recordType = "-";
        // intervalList = intervalList;
        recordTypeList = recordTypeList;

        get recordList() {
            // eslint-disable-next-line no-undef
            return (this.$store.state as RootState).recordList;
        }


        get keyValueList() {
            const today = new Date();
            const array = [];

            for (let i = 0; i <= 29; i++) {
                const dateString = day(today).subtract(i, "day").format("YYYY-MM-DD");

                const found = _.find(this.groupedList, {title: dateString});
                array.push({
                    key: dateString,
                    value: found ? found.total : 0
                });
            }

            array.sort((a, b) => {
                if (a.key > b.key) {
                    return 1;
                } else if (a.key === b.key) {
                    return 0;
                } else {
                    return -1;
                }
            });

            return array;
        }

        get chartOptions() {

            const keys = this.keyValueList.map(item => item.key);
            const values = this.keyValueList.map(item => item.value);

            return {
                grid: {
                    left: 0,
                    // top: 0,
                    right: 0,
                    // bottom: 0
                },
                xAxis: {
                    type: "category",
                    data: keys,
                    axisTick: {
                        show: true,
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#666"
                        }
                    },
                    axisLabel: {
                        formatter: function (value: string) {
                            return value.substr(5);
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    show: false
                },
                series: [{
                    symbol: "circle",
                    symbolSize: 12,
                    itemStyle: {
                        borderWidth: 1,
                        color: "#a0d468",
                        borderColor: "orange"
                    },
                    data: values,
                    type: "line"
                }],
                tooltip: {
                    show: true,
                    triggerOn: "click",
                    formatter: "{c}",
                    position: "top"
                }
            };
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
    @import "~@/assets/style/helper.scss";

    ::v-deep {
        .recordTypeList-tabs-item {
            background: white;

            &.selected {
                background: $selected;

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

    .chart {
        width: 400%;

        &-wrapper {
            overflow: auto;
            @media (max-width: 800px) {
                &::-webkit-scrollbar {
                    display: none;
                }
            }
        }
    }
</style>