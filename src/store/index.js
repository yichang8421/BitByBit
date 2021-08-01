import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
Vue.use(Vuex);
var store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: []
    },
    mutations: {
        fetchRecords: function (state) {
            state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]");
        },
        saveRecords: function (state) {
            window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
        },
        createRecords: function (state, record) {
            var _a;
            var newRecord = clone(record);
            newRecord.createdAt = new Date();
            (_a = state.recordList) === null || _a === void 0 ? void 0 : _a.push(newRecord);
            store.commit("saveRecords");
        },
        fetchTags: function (state) {
            state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]");
        },
        findTag: function (stats, id) {
            return stats.tagList.filter(function (t) { return t.id === id; })[0];
        },
        saveTags: function (state) {
            window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
        },
        createTag: function (state, name) {
            var names = state.tagList.map(function (item) { return item.name; });
            if (names.indexOf(name) >= 0) {
                window.alert("此标签名已添加");
                return "duplicated";
            }
            var id = createId().toString();
            state.tagList.push({ id: id, name: name });
            store.commit("saveTags");
            return "success";
        },
        removeTag: function (state, id) {
            var index = -1;
            for (var i = 0; i < this.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            state.tagList.splice(index, 1);
            store.commit("saveTags");
            return true;
        },
        updateTag: function (state, _a) {
            var id = _a.id, name = _a.name;
            var idList = state.tagList.map(function (item) { return item.id; });
            if (idList.indexOf(id) >= 0) {
                var names = state.tagList.map(function (item) { return item.name; });
                if (names.indexOf(name) >= 0) {
                    return "duplicated";
                }
                else {
                    var tag = state.tagList.filter(function (item) { return item.id === id; })[0];
                    tag.name = name;
                    store.commit("saveTags");
                    return "success";
                }
            }
            else {
                return "not_found";
            }
        }
    },
});
// tslint:disable-next-line:no-default-export
export default store;
//# sourceMappingURL=index.js.map