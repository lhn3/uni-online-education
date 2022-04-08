"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    providerList: {
      type: Array,
      default: () => []
    },
    shareDate: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    let { proxy } = common_vendor.getCurrentInstance();
    let isShow = common_vendor.ref(false);
    let state = common_vendor.reactive({
      title: "share",
      shareText: "\u5206\u4EAB\u7ED9\u4F60\u5C31\u7ED9\u8001\u5B50\u70B9\u5F00\u770B\uFF01",
      href: "https://www.baidu.com/",
      image: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2020-06-04%2F5ed8a4d5881c6.jpg&refer=http%3A%2F%2Fpic1.win4000.com",
      shareType: 0,
      providerList: []
    });
    common_vendor.watch(() => props.shareDate, (newValue) => {
      if (Object.keys(newValue).length > 0) {
        state.title = newValue.title;
        state.image = newValue.mainImage;
        state.href = proxy.$env.HOST_H5 + proxy.$utils.routePath();
      }
    });
    common_vendor.onMounted(() => {
    });
    const showHandler = () => {
      isShow.value = false;
    };
    const share = (e) => {
      proxy.$message.toast("\u5206\u4EAB\u5931\u8D25\uFF01", "error");
      isShow.value = false;
    };
    return {
      isShow,
      showHandler,
      share
    };
  },
  methods: {
    compress() {
      console.log("\u5F00\u59CB\u538B\u7F29");
      let img = this.image;
      return new Promise(async (res) => {
        if (img.startsWith("http")) {
          img = await this.fileDownload(img);
        }
        plus.io.resolveLocalFileSystemURL(img, (entry) => {
          entry.file((file) => {
            console.log("getFile:" + JSON.stringify(file));
            if (file.size > 20480) {
              plus.zip.compressImage({
                src: img,
                dst: img.replace(".jpg", "2222.jpg").replace(".JPG", "2222.JPG"),
                width: "10%",
                height: "10%",
                quality: 1,
                overwrite: true
              }, (event) => {
                let newImg = img.replace(".jpg", "2222.jpg").replace(".JPG", "2222.JPG");
                res(newImg);
              }, function(error) {
                common_vendor.index.showModal({
                  content: "\u5206\u4EAB\u56FE\u7247\u592A\u5927,\u9700\u8981\u8BF7\u91CD\u65B0\u9009\u62E9\u56FE\u7247!",
                  showCancel: false
                });
              });
            }
          });
        }, (e) => {
          console.log("Resolve file URL failed: " + e.message);
          common_vendor.index.showModal({
            content: "\u5206\u4EAB\u56FE\u7247\u592A\u5927,\u9700\u8981\u8BF7\u91CD\u65B0\u9009\u62E9\u56FE\u7247!",
            showCancel: false
          });
        });
      });
    },
    fileDownload(url) {
      return new Promise((resolve, reject) => {
        common_vendor.index.downloadFile({
          url,
          success: (res) => {
            resolve(res.tempFilePath);
          },
          fail: () => {
            this.$message.toast("\u56FE\u7247\u4E0B\u8F7D\u5931\u8D25\uFF01", "error");
          }
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.showHandler && $setup.showHandler(...args)),
    b: common_vendor.o(() => {
    }),
    c: common_vendor.f($props.providerList, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $setup.share(item)),
        d: index
      };
    }),
    d: common_vendor.o((...args) => $setup.showHandler && $setup.showHandler(...args)),
    e: $setup.isShow
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
