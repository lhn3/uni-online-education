"use strict";
var common_vendor = require("../../common/vendor.js");
var request_articleApi = require("../../request/article-api.js");
require("../../request/request.js");
require("../../utils/showMessage.js");
const uniTag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _sfc_main = {
  components: {
    "uni-tag": uniTag
  },
  setup() {
    let { proxy } = common_vendor.getCurrentInstance();
    let providerList = common_vendor.ref([
      { id: "weixin", name: "\u5FAE\u4FE1\u597D\u53CB", sort: 0, icon: "/static/share/weixin.png" },
      { id: "weixin", name: "\u670B\u53CB\u5708", type: "WXSenceTimeline", sort: 1, icon: "/static/share/pengyouquan.png" },
      { id: "sinaweibo", name: "\u65B0\u6D6A\u5FAE\u535A", sort: 2, icon: "/static/share/weibo.png" },
      { id: "qq", name: "QQ\u597D\u53CB", sort: 3, icon: "/static/share/qq.png" },
      { id: "copy", name: "\u590D\u5236\u94FE\u63A5", sort: 4, icon: "/static/share/link.png" }
    ]);
    let id = common_vendor.ref(null);
    let myShare = common_vendor.ref(null);
    let type = ["primary", "success", "warning", "error"];
    let articleDetail = common_vendor.ref({});
    let commentList = common_vendor.ref([]);
    let content = common_vendor.ref("");
    common_vendor.onMounted(async () => {
      articleDetail.value = await request_articleApi.getArticleDetail(id.value);
      common_vendor.index.setNavigationBarTitle({
        title: articleDetail.value.title
      });
      commentList.value = await request_articleApi.getArticleComment(id.value);
    });
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
      commentList.value.unshift(data);
      await request_articleApi.addArticleComment(data);
      content.value = "";
      proxy.$message.toast("\u53D1\u8868\u6210\u529F", "success");
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
      articleDetail,
      commentList,
      content,
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
  return {
    a: common_vendor.f($setup.articleDetail.labelList, (item, index, i0) => {
      return {
        a: "436fa643-0-" + i0,
        b: common_vendor.p({
          circle: true,
          inverted: true,
          text: item.name,
          type: $setup.type[index]
        }),
        c: item.id
      };
    }),
    b: common_vendor.t($setup.articleDetail.title),
    c: $setup.articleDetail.userImage,
    d: common_vendor.t($setup.articleDetail.nickName),
    e: common_vendor.t($setup.articleDetail.updateDate),
    f: common_vendor.t($setup.articleDetail.viewCount),
    g: $setup.articleDetail.htmlContent,
    h: common_vendor.f($setup.commentList, (item, k0, i0) => {
      return {
        a: item.userImage,
        b: common_vendor.t(item.nickName),
        c: common_vendor.t(item.createDate),
        d: common_vendor.t(item.content),
        e: item.id
      };
    }),
    i: $setup.content,
    j: common_vendor.o(($event) => $setup.content = $event.detail.value),
    k: common_vendor.o((...args) => $setup.submit && $setup.submit(...args)),
    l: common_vendor.o(() => {
    }),
    m: common_vendor.sr("myShare", "436fa643-1"),
    n: common_vendor.p({
      providerList: $setup.providerList,
      shareDate: {
        title: $setup.articleDetail.title,
        mainImage: $setup.articleDetail.imageUrl
      }
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
