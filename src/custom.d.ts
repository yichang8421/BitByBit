type RecordItem = {
    type: string,
    notes: string,
    tags: string[],
    amount: number,
    createdAt?: Date
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