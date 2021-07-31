import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";
var store = {
    // record store
    recordList: recordListModel.fetch(),
    createRecord: function (record) { return recordListModel.create(record); },
    // tag store
    tagList: tagListModel.fetch(),
    findTag: function (id) {
        return this.tagList.filter(function (t) { return t.id === id; })[0];
    },
    createTag: function (name) {
        var message = tagListModel.create(name);
        if (message === "duplicated") {
            window.alert("此标签名已添加");
        }
    },
    removeTag: function (id) { return tagListModel.remove(id); },
    updateTag: function (id, name) { return tagListModel.update(id, name); },
};
// tslint:disable-next-line:no-default-export
export default store;
//# sourceMappingURL=index2.js.map