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
    remove: (id: string) => boolean
}

type Tag = {
    id: string,
    name: string
}

// tslint:disable-next-line:interface-name
interface Window {
    tagList: Tag[],
    createTag: (string: string) => void
}
