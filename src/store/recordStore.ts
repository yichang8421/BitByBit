import clone from "@/lib/clone";

const localStorageKeyName = "recordList";


// tslint:disable-next-line:no-default-export
const recordStore = {
    recordList: [] as RecordItem[],

    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[];
        return this.recordList;
    },

    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },

    createRecords(record: RecordItem) {
        const newRecord: RecordItem = clone(record);
        newRecord.createdAt = new Date();
        this.recordList?.push(newRecord);
        recordStore.saveRecords();
    }
};

recordStore.fetchRecords();

// tslint:disable-next-line:no-default-export
export default recordStore;