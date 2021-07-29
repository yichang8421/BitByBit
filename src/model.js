var localStorageKeyName = "recordList";
var model = {
    fetch: function () {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
    },
    save: function (data) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    },
    clone: function (data) {
        return JSON.parse(JSON.stringify(data));
    }
};
// tslint:disable-next-line:no-default-export
export default model;
//# sourceMappingURL=model.js.map