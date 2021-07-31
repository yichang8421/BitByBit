function clone(data: any) {
    return JSON.parse(JSON.stringify(data));
}

// tslint:disable-next-line:no-default-export
export default clone;