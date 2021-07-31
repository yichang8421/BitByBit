var localStorageKeyName = "tagList";
var tagListModel = {
    data: [],
    fetch: function () {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.data;
    },
    save: function () {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create: function (name) {
        var names = this.data.map(function (item) { return item.name; });
        if (names.indexOf(name) >= 0) {
            return "duplicated";
        }
        this.data.push({ id: name, name: name });
        this.save();
        return "success";
    }
};
// tslint:disable-next-line:no-default-export
export default tagListModel;
//# sourceMappingURL=tagListModel.js.map