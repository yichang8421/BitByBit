import createId from "@/lib/createId";
var localStorageKeyName = "tagList";
// tslint:disable-next-line:no-default-export
var tagStore = {
    tagList: [],
    fetchTags: function () {
        tagStore.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.tagList;
    },
    findTag: function (id) {
        return this.tagList.filter(function (t) { return t.id === id; })[0];
    },
    saveTags: function () {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    },
    createTag: function (name) {
        var names = this.tagList.map(function (item) { return item.name; });
        if (names.indexOf(name) >= 0) {
            window.alert("此标签名已添加");
            return "duplicated";
        }
        var id = createId().toString();
        this.tagList.push({ id: id, name: name });
        this.saveTags();
        return "success";
    },
    removeTag: function (id) {
        var index = -1;
        for (var i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === id) {
                index = i;
                break;
            }
        }
        this.tagList.splice(index, 1);
        this.saveTags();
        return true;
    },
    updateTag: function (id, name) {
        var idList = this.tagList.map(function (item) { return item.id; });
        if (idList.indexOf(id) >= 0) {
            var names = this.tagList.map(function (item) { return item.name; });
            if (names.indexOf(name) >= 0) {
                return "duplicated";
            }
            else {
                var tag = this.tagList.filter(function (item) { return item.id === id; })[0];
                tag.name = name;
                this.saveTags();
                return "success";
            }
        }
        else {
            return "not_found";
        }
    }
};
tagStore.fetchTags();
// tslint:disable-next-line:no-default-export
export default tagStore;
//# sourceMappingURL=tagStore.js.map