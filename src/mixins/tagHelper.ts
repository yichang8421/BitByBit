import Vue from "vue";
import Component from "vue-class-component";

@Component
export class TagHelper extends Vue {
    public createTag() {
        const name = window.prompt("请输入自定义标签");
        if (name) {
            this.$store.commit("createTag", name);
        } else {
            // window.alert("标签名不能为空");
        }
    }
}

export default TagHelper;