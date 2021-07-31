var localStorageKeyName = "recordList";
var recordListModel = {
    data: [],
    fetch: function () {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.data;
    },
    save: function () {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    clone: function (data) {
        return JSON.parse(JSON.stringify(data));
    }
};
// tslint:disable-next-line:no-default-export
export default recordListModel;
//# sourceMappingURL=recordListModel.js.map