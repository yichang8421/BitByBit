let id:number = parseInt(window.localStorage.getItem("_idMax") || '0',10) || 0;

function createId() {
    id++;
    return id;
}

// tslint:disable-next-line:no-default-export
export default createId