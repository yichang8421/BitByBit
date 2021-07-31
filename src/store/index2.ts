import recordStore from "@/store/recordStore";
import tagStore from "@/store/tagStore";

const store = {
    // record store
    ...recordStore,

    // tag store
    ...tagStore
};

// console.log(store);

// tslint:disable-next-line:no-default-export
export default store;