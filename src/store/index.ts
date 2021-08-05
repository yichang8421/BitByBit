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
            const newRecord = clone(record);
            newRecord.createdAt = new Date().toISOString();
            state.recordList?.push(newRecord);
            store.commit("saveRecords");
            window.alert("已保存");
        },

        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]");
            if (!state.tagList.length) {
                store.commit("createTag", "吃饭");
                store.commit("createTag", "房租");
            }
        },

        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },

        saveTags(state) {
            window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
        },

        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert("此标签名已添加");
            } else {
                const id = createId().toString();
                state.tagList.push({id, name: name});
                store.commit("saveTags");
            }
        },

        // ???
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            // console.log(index);
            state.tagList.splice(index, 1);
            store.commit("saveTags");
        },

        updateTag(state, payload: { id: string, name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert("标签名重复");
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit("saveTags");
                }
            }
            if (name === "") {
                store.commit("removeTag");
            }
        }
    },
});

// tslint:disable-next-line:no-default-export
export default store;
