"use strict";
const GlobalOption = {
  down: {
    offset: 80,
    native: false
  },
  up: {
    offset: 150,
    toTop: {
      src: "https://www.mescroll.com/img/mescroll-totop.png",
      offset: 1e3,
      right: 20,
      bottom: 120,
      width: 72
    },
    empty: {
      use: true,
      icon: "https://www.mescroll.com/img/mescroll-empty.png"
    }
  },
  i18n: {
    zh: {
      down: {
        textInOffset: "\u4E0B\u62C9\u5237\u65B0",
        textOutOffset: "\u91CA\u653E\u66F4\u65B0",
        textLoading: "\u52A0\u8F7D\u4E2D ...",
        textSuccess: "\u52A0\u8F7D\u6210\u529F",
        textErr: "\u52A0\u8F7D\u5931\u8D25"
      },
      up: {
        textLoading: "\u52A0\u8F7D\u4E2D ...",
        textNoMore: "-- END --",
        empty: {
          tip: "~ \u7A7A\u7A7A\u5982\u4E5F ~"
        }
      }
    },
    en: {
      down: {
        textInOffset: "drop down refresh",
        textOutOffset: "release updates",
        textLoading: "loading ...",
        textSuccess: "loaded successfully",
        textErr: "loading failed"
      },
      up: {
        textLoading: "loading ...",
        textNoMore: "-- END --",
        empty: {
          tip: "~ absolutely empty ~"
        }
      }
    }
  }
};
exports.GlobalOption = GlobalOption;
