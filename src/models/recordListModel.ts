import clone from "@/lib/clone";

const localStorageKeyName = "recordList";

const recordListModel = {
    data: [] as RecordItem[],

    create(record: RecordItem) {
        const newRecord: RecordItem = clone(record);
        newRecord.createdAt = new Date();
        this.data.push(newRecord);
        this.save();
    },

    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.data;
    },

    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};

// tslint:disable-next-line:no-default-export
export default recordListModel;