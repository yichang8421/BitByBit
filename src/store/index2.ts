import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

const store = {
    // record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => recordListModel.create(record),

    // tag store
    tagList: tagListModel.fetch(),
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    createTag: (name: string) => {
        const message = tagListModel.create(name);
        if (message === "duplicated") {
            window.alert("此标签名已添加");
        }
    },
    removeTag: (id: string) => tagListModel.remove(id),
    updateTag: (id: string, name: string) => tagListModel.update(id, name),
};

// tslint:disable-next-line:no-default-export
export default store;