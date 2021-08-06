type RecordItem = {
    type: string,
    notes: string,
    tags: Tag[],
    amount: number,
    createdAt?: string
}

type Data = {
    isDecimalAdded:boolean,
    isOperatorAdded:boolean,
    isStarted:b
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
