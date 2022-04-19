"use strict";
var common_vendor = require("../../common/vendor.js");
var request_questionApi = require("../../request/question-api.js");
require("../../request/request.js");
require("../../utils/showMessage.js");
const uniTag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _sfc_main = {
  components: {
    "uni-tag": uniTag
  },
  setup() {
    let { proxy } = common_vendor.getCurrentInstance();
    let id = common_vendor.ref(null);
    let providerList = common_vendor.ref([
      { id: "weixin", name: "\u5FAE\u4FE1\u597D\u53CB", sort: 0, icon: "/static/share/weixin.png" },
      { id: "weixin", name: "\u670B\u53CB\u5708", type: "WXSenceTimeline", sort: 1, icon: "/static/share/pengyouquan.png" },
      { id: "sinaweibo", name: "\u65B0\u6D6A\u5FAE\u535A", sort: 2, icon: "/static/share/weibo.png" },
      { id: "qq", name: "QQ\u597D\u53CB", sort: 3, icon: "/static/share/qq.png" },
      { id: "copy", name: "\u590D\u5236\u94FE\u63A5", sort: 4, icon: "/static/share/link.png" }
    ]);
    let myShare = common_vendor.ref(null);
    let type = ["primary", "success", "warning", "error"];
    let questionDetail = common_vendor.ref({});
    let answerList = common_vendor.ref([]);
    let showAnswer = common_vendor.ref(false);
    let isFocus = common_vendor.ref(0);
    let content = common_vendor.ref("");
    common_vendor.onMounted(async () => {
      questionDetail.value = await request_questionApi.getQuestionDetail(id.value);
      common_vendor.index.setNavigationBarTitle({
        title: questionDetail.value.title
      });
      isFocus.value = questionDetail.value.star;
      answerList.value = await request_questionApi.getQuestionAnswerList(id.value);
      isFocus.value = questionDetail.value.star;
    });
    const focusClick = async () => {
      await request_questionApi.focusQuestion(id.value);
      if (isFocus.value) {
        isFocus.value = 0;
        proxy.$message.toast("\u5DF2\u53D6\u6D88");
      } else {
        isFocus.value = 1;
        proxy.$message.toast("\u5DF2\u5173\u6CE8");
      }
    };
    const answerClick = () => {
      showAnswer.value = true;
    };
    const close = () => {
      showAnswer.value = false;
    };
    const submit = async () => {
      if (content.value.trim() == "") {
        proxy.$message.toast("\u8BC4\u8BBA\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A");
        return;
      }
      if (!proxy.$utils.isLogin())
        return;
      let data = {
        "id": 1,
        "parentId": "-1",
        "userId": 1,
        "nickName": "\u5C0F\u660E",
        "userImage": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F6477f4d1e658b314b5e7d5db2c92306e50c711ef.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto",
        "articleId": id.value,
        "content": content.value,
        "createDate": "2019-04-13 05:54:16"
      };
      await request_questionApi.addQuestionAnswer(data);
      content.value = "";
      proxy.$message.toast("\u56DE\u7B54\u6210\u529F", "success");
    };
    common_vendor.onNavigationBarButtonTap((e) => {
      if (e.type = "share") {
        myShare.value.isShow = !myShare.value.isShow;
      }
    });
    return {
      id,
      providerList,
      myShare,
      type,
      questionDetail,
      answerList,
      showAnswer,
      isFocus,
      content,
      focusClick,
      answerClick,
      close,
      submit
    };
  },
  onLoad(option) {
    if (option.id) {
      this.id = option.id;
    }
  }
};
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_my_share2 = common_vendor.resolveComponent("my-share");
  (_easycom_uni_tag2 + _easycom_my_share2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_my_share = () => "../../components/my-share/my-share.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_my_share)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($setup.questionDetail.labelList, (item, index, i0) => {
      return {
        a: index,
        b: "d435e7d6-0-" + i0,
        c: common_vendor.p({
          text: item.name,
          type: $setup.type[index],
          size: "small",
          circle: true,
          inverted: true
        })
      };
    }),
    b: common_vendor.t($setup.questionDetail.title),
    c: $setup.questionDetail.userImage,
    d: common_vendor.t($setup.questionDetail.nickName),
    e: common_vendor.t($setup.questionDetail.updateDate),
    f: $setup.questionDetail.mdContent,
    g: common_vendor.t($setup.answerList.length),
    h: common_vendor.f($setup.answerList, (item, k0, i0) => {
      return {
        a: item.userImage,
        b: common_vendor.t(item.nickName),
        c: common_vendor.t(item.createDate),
        d: item.mdContent,
        e: item.id
      };
    }),
    i: $setup.isFocus
  }, $setup.isFocus ? {
    j: common_vendor.o((...args) => $setup.focusClick && $setup.focusClick(...args))
  } : {
    k: common_vendor.o((...args) => $setup.focusClick && $setup.focusClick(...args))
  }, {
    l: common_vendor.o((...args) => $setup.answerClick && $setup.answerClick(...args)),
    m: $setup.showAnswer
  }, $setup.showAnswer ? {
    n: common_vendor.o((...args) => $setup.close && $setup.close(...args)),
    o: common_vendor.o((...args) => $setup.submit && $setup.submit(...args)),
    p: $setup.content,
    q: common_vendor.o(($event) => $setup.content = $event.detail.value),
    r: common_vendor.o(() => {
    })
  } : {}, {
    s: common_vendor.sr("myShare", "d435e7d6-1"),
    t: common_vendor.p({
      providerList: $setup.providerList,
      shareDate: {
        title: "title"
      }
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
