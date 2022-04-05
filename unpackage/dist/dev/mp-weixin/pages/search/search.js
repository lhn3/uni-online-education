"use strict";
var common_vendor = require("../../common/vendor.js");
var uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollMore = require("../../uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js");
const uniSearchBar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const keywords = () => "./cpns/keywords.js";
const courseList = () => "./cpns/course-list.js";
const articleList = () => "./cpns/article-list.js";
const questionList = () => "./cpns/question-list.js";
const _sfc_main = {
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollMore.MescrollMoreMixin],
  components: {
    "uni-search-bar": uniSearchBar,
    "keywords": keywords,
    "course-list": courseList,
    "article-list": articleList,
    "question-list": questionList
  },
  setup() {
    const { proxy } = common_vendor.getCurrentInstance();
    let params = common_vendor.ref({});
    let content = common_vendor.ref(null);
    let focuse = common_vendor.ref(false);
    let historyWord = common_vendor.ref(null);
    let showWords = common_vendor.ref(true);
    let tabId = common_vendor.ref(1);
    let tabs = common_vendor.ref([
      { id: 1, name: "\u8BFE\u7A0B" },
      { id: 2, name: "\u6587\u7AE0" },
      { id: 3, name: "\u95EE\u7B54" }
    ]);
    let mescrollItem1 = common_vendor.ref();
    let mescrollItem2 = common_vendor.ref();
    let mescrollItem3 = common_vendor.ref();
    const doSearch = () => {
      proxy.$utils.throttle(() => {
        if ((content.value == "" || content.value == null) && Object.keys(params.value).length == 0) {
          proxy.$message.toast("\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9");
        } else {
          console.log("\u641C\u7D22\u5185\u5BB9:" + content.value);
          historyWord.value = content.value;
          showWords.value = false;
          common_vendor.nextTick(() => {
            proxy.$refs[`mescrollItem${tabId.value}`].changeCategory();
          });
        }
      });
    };
    common_vendor.onNavigationBarButtonTap((e) => {
      doSearch();
    });
    common_vendor.onNavigationBarSearchInputChanged((e) => {
      content.value = e.text;
    });
    const inputChange = (e) => {
      console.log("\u76D1\u542C\u8F93\u5165\u6846\u6539\u53D8", e);
    };
    const changeContent = (value) => {
      content.value = value;
      doSearch();
    };
    let changeTab = (id) => {
      console.log("\u70B9\u51FB\u4E86\u6807\u7B7E\uFF1A" + id);
      tabId.value = id;
    };
    return {
      params,
      content,
      focuse,
      historyWord,
      showWords,
      tabs,
      tabId,
      mescrollItem1,
      mescrollItem2,
      mescrollItem3,
      doSearch,
      inputChange,
      changeContent,
      changeTab
    };
  },
  onLoad(option) {
    if (option.data) {
      let data = JSON.parse(option.data);
      this.focuse = false;
      this.params = data;
      this.doSearch();
    } else {
      this.focuse = true;
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _component_keywords = common_vendor.resolveComponent("keywords");
  const _easycom_tab_bar2 = common_vendor.resolveComponent("tab-bar");
  const _component_course_list = common_vendor.resolveComponent("course-list");
  const _component_article_list = common_vendor.resolveComponent("article-list");
  const _component_question_list = common_vendor.resolveComponent("question-list");
  (_easycom_uni_search_bar2 + _component_keywords + _easycom_tab_bar2 + _component_course_list + _component_article_list + _component_question_list)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.doSearch),
    b: common_vendor.o($setup.inputChange),
    c: common_vendor.o(($event) => $setup.content = $event),
    d: common_vendor.p({
      focus: $setup.focuse,
      radius: 100,
      placeholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
      modelValue: $setup.content
    }),
    e: common_vendor.o($setup.changeContent),
    f: $setup.showWords,
    g: common_vendor.p({
      historyWord: $setup.historyWord
    }),
    h: !$setup.showWords
  }, !$setup.showWords ? {
    i: common_vendor.o($setup.changeTab),
    j: common_vendor.p({
      tabs: $setup.tabs
    }),
    k: common_vendor.sr("mescrollItem1", "1c2fb258-3"),
    l: common_vendor.p({
      i: 1,
      index: $setup.tabId,
      params: $setup.params,
      content: $setup.content
    }),
    m: common_vendor.sr("mescrollItem2", "1c2fb258-4"),
    n: common_vendor.p({
      i: 2,
      index: $setup.tabId,
      params: $setup.params,
      content: $setup.content
    }),
    o: common_vendor.sr("mescrollItem3", "1c2fb258-5"),
    p: common_vendor.p({
      i: 3,
      index: $setup.tabId,
      params: $setup.params,
      content: $setup.content
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
