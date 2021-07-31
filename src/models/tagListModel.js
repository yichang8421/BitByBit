import createId from "@/lib/createId";
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
        var id = createId().toString();
        this.data.push({ id: id, name: name });
        this.save();
        return "success";
    },
    update: function (id, name) {
        var idList = this.data.map(function (item) { return item.id; });
        if (idList.indexOf(id) >= 0) {
            var names = this.data.map(function (item) { return item.name; });
            if (names.indexOf(name) >= 0) {
                return "duplicated";
            }
            else {
                var tag = this.data.filter(function (item) { return item.id === id; })[0];
                tag.name = name;
                this.save();
                return "success";
            }
        }
        else {
            return "not_found";
        }
    },
    remove: function (id) {
        var index = -1;
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        this.data.splice(index, 1);
        this.save();
        return true;
    }
};
// tslint:disable-next-line:no-default-export
export default tagListModel;
//# sourceMappingURL=tagListModel.js.map