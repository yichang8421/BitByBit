type RecordItem = {
    type: string,
    notes: string,
    tags: string[],
    amount: number,
    createdAt?: Date
}

type Tag = {
    id: string,
    name: string
}
