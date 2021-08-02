import clone from "@/lib/clone";
var localStorageKeyName = "recordList";
// tslint:disable-next-line:no-default-export
var recordStore = {
    recordList: [],
    fetchRecords: function () {
        // JSON.parse的目的是将null转为空字符输出。如果没有使用JSON.parse，那输出的值为null(4个字符)。
        // 运行代码前最好先清空localStorage。避免出现无法渲染情况
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.recordList;
    },
    saveRecords: function () {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
    createRecords: function (record) {
        var _a;
        var newRecord = clone(record);
        newRecord.createdAt = new Date();
        (_a = this.recordList) === null || _a === void 0 ? void 0 : _a.push(newRecord);
        recordStore.saveRecords();
    }
};
recordStore.fetchRecords();
// tslint:disable-next-line:no-default-export
export default recordStore;
//# sourceMappingURL=recordStore.js.map