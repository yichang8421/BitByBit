import clone from "@/lib/clone";
var localStorageKeyName = "recordList";
var recordListModel = {
    data: [],
    create: function (record) {
        var newRecord = clone(record);
        newRecord.createdAt = new Date();
        this.data.push(newRecord);
        this.save();
    },
    fetch: function () {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.data;
    },
    save: function () {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};
// tslint:disable-next-line:no-default-export
export default recordListModel;
//# sourceMappingURL=recordListModel.js.map