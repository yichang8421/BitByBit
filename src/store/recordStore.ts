import clone from "@/lib/clone";

const localStorageKeyName = "recordList";


// tslint:disable-next-line:no-default-export
const recordStore = {
    recordList: [] as RecordItem[],

    fetchRecords() {
        // JSON.parse的目的是将null转为空字符输出。如果没有使用JSON.parse，那输出的值为null(4个字符)。
        // 运行代码前最好先清空localStorage。避免出现无法渲染情况
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[];
        return this.recordList;
    },

    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },

    createRecords(record: RecordItem) {
        const newRecord: RecordItem = clone(record);
        newRecord.createdAt = new Date().toISOString();
        this.recordList?.push(newRecord);
        recordStore.saveRecords();
    }
};

recordStore.fetchRecords();

// tslint:disable-next-line:no-default-export
export default recordStore;