import Vue from "vue";
import Component from "vue-class-component";

const map: { [key: string]: string } = {
    "tag name duplicated": "此标签已存在"
};

@Component
export class TagHelper extends Vue {
    public createTag() {
        const name = window.prompt("请输入自定义标签");
        if (name) {
            this.$store.commit("createTag", name);
        } else {
            // window.alert("标签名不能为空");
        }
        if (this.$store.state.createTagError) {
            window.alert(map[this.$store.state.createTagError.message] || "未知错误");
        }
    }
}

// tslint:disable-next-line:no-default-export
export default TagHelper;