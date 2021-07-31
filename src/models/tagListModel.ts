const localStorageKeyName = "tagList";

type Tag = {
    id: string,
    name: string
}

type TagListModel = {
    data: Tag[],
    fetch: () => Tag[],
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
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return "duplicated";
        }
        this.data.push({id: name, name: name});
        this.save();
        return "success";
    }
};

// tslint:disable-next-line:no-default-export
export default tagListModel;