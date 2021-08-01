import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined
    } as RootState,
    mutations: {
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
        },

        saveRecords(state) {
            window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
        },

        createRecords(state, record: RecordItem) {
            const newRecord: RecordItem = clone(record);
            newRecord.createdAt = new Date();
            state.recordList?.push(newRecord);
            store.commit("saveRecords");
        },

        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]");
        },

        setCurrentTag(state, id:string){
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },

        saveTags(state) {
            window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
        },

        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert("此标签名已添加");
            }
            const id = createId().toString();
            state.tagList.push({id, name: name});
            store.commit("saveTags");
        },

        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < this.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            state.tagList.splice(index, 1);
            store.commit("saveTags");
            return true;
        },

        updateTag(state, {id, name}) {
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    return "duplicated";
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit("saveTags");
                    return "success";
                }
            } else {
                return "not_found";
            }
        }
    },
});

// tslint:disable-next-line:no-default-export
export default store;
