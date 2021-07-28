type RecordItem = {
    type: string,
    notes: string,
    tags: string[],
    amount: number,
    createdAt?: Date
}

const localStorageKeyName = "recordList";
const model = {
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");

    },
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }
};

export {model};