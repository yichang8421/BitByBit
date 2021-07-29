const localStorageKeyName = "tagList";

type TagListModel = {
    data: string[],
    fetch: () => string[],
    save: () => void,
    create: (name: string) => string
}

const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name) {
        this.data.push(name);
        this.save();
        return name;
    }
};

// tslint:disable-next-line:no-default-export
export default tagListModel;