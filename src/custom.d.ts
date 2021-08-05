type RecordItem = {
    type: string,
    notes: string,
    tags: Tag[],
    amount: number,
    createdAt?: string
}

type TagListModel = {
    data: Tag[],
    fetch: () => Tag[],
    save: () => void,
    create: (name: string) => "success" | "duplicated",
    update: (id: string, name: string) => "success" | "not_found" | "duplicated",
    remove: (id: string) => boolean,
}

type Tag = {
    id: string,
    name: string
}

type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag
}

type DataSourceItem = { taxt: string, value: string }

type HashTableIValue = {
    title: string,
    items: RecordItem[]
}
