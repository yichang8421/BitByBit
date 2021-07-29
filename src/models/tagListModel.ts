const localStorageKeyName = "tagList";

type TagListModel = {
    data: string[],
    fetch: () => string[],
    save: () => void,
    create: (name: string) => "success" | "duplicated"
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
        if (this.data.indexOf(name) >= 0) {
            return 'duplicated';
        }
        this.data.push(name);
        this.save();
        return 'success';
    }
};

// tslint:disable-next-line:no-default-export
export default tagListModel;