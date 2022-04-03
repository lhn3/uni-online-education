"use strict";
var courseData = [
  {
    id: 1,
    mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLAWb3qFGBhykjmcTvz9CWmwib2Qj7c3Vxjia4y5fgSoNdrMYIdH11Dl1OCraibA7u0mts/600",
    totalTime: "00:59:08",
    title: "SpringBoot\u9879\u76EE\u5B9E\u6218",
    nickName: "\u5C0F\u8C37\u8001\u5E08",
    isFree: 0,
    priceOriginal: 999,
    priceDiscount: 699.9,
    studyTotal: 899
  },
  {
    id: 2,
    mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLBdGM96Wcfsn2QlzFiafnHDemtCOy4m6U4yicNvXMg8YfVYzf4ZMxXMPZqq24AibBQt20/600",
    totalTime: "12:09:18",
    title: "Spring Security\u6559\u7A0BSSO\u5355\u70B9\u767B\u5F55OAuth2\u6743\u9650\u7BA1\u7406JWT\u5FAE\u670D\u52A1\u8BA4\u8BC1",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 1,
    priceOriginal: 999,
    priceDiscount: 699.9,
    studyTotal: 199
  },
  {
    id: 3,
    mainImage: "/static/images/banner1.jpg",
    totalTime: "12:09:18",
    title: "uni-app\u4ECE\u5165\u95E8\u5230\u9879\u76EE\u5B9E\u6218\u6559\u7A0B-\u68A6\u5B66\u8C37\u535A\u5BA2\u793E\u533AAPP\u79FB\u52A8\u7AEF\u5F00\u53D1",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 399,
    priceDiscount: 299.9,
    studyTotal: 3999
  },
  {
    id: 4,
    mainImage: "/static/images/banner2.jpg",
    totalTime: "00:59:08",
    title: "SpringBoot\u9879\u76EE\u5B9E\u6218\u6559\u7A0BSpringCloud OAuth2 Vue\u5206\u5E03\u5F0F\u5FAE\u670D\u52A1\u67B6\u6784",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 299,
    priceDiscount: 199.9,
    studyTotal: 699
  },
  {
    id: 5,
    mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLBdGM96Wcfsn2QlzFiafnHDemtCOy4m6U4yicNvXMg8YfVYzf4ZMxXMPZqq24AibBQt20/600",
    totalTime: "132:09:18",
    title: "Spring Security\u6559\u7A0BSSO\u5355\u70B9\u767B\u5F55OAuth2\u6743\u9650\u7BA1\u7406JWT\u5FAE\u670D\u52A1\u8BA4\u8BC1",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 399,
    priceDiscount: 299.9,
    studyTotal: 2888
  },
  {
    id: 6,
    mainImage: "/static/images/banner2.jpg",
    totalTime: "112:09:18",
    title: "uni-app\u4ECE\u5165\u95E8\u5230\u9879\u76EE\u5B9E\u6218\u6559\u7A0B-\u68A6\u5B66\u8C37\u535A\u5BA2\u793E\u533AAPP\u79FB\u52A8\u7AEF\u5F00\u53D1",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 1299,
    priceDiscount: 1199.9,
    studyTotal: 3999
  },
  {
    id: 7,
    mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLAWb3qFGBhykjmcTvz9CWmwib2Qj7c3Vxjia4y5fgSoNdrMYIdH11Dl1OCraibA7u0mts/600",
    totalTime: "00:59:08",
    title: "SpringBoot\u9879\u76EE\u5B9E\u6218\u6559\u7A0BSpringCloud OAuth2 Vue\u5206\u5E03\u5F0F\u5FAE\u670D\u52A1\u67B6\u6784",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 1,
    priceOriginal: 299,
    priceDiscount: 199.9,
    studyTotal: 999
  },
  {
    id: 8,
    mainImage: "/static/images/banner1.jpg",
    totalTime: "12:09:18",
    title: "Spring Security\u6559\u7A0BSSO\u5355\u70B9\u767B\u5F55OAuth2\u6743\u9650\u7BA1\u7406JWT\u5FAE\u670D\u52A1\u8BA4\u8BC1",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 799,
    priceDiscount: 599.9,
    studyTotal: 2888
  },
  {
    id: 9,
    mainImage: "/static/images/banner2.jpg",
    totalTime: "12:09:18",
    title: "uni-app\u4ECE\u5165\u95E8\u5230\u9879\u76EE\u5B9E\u6218\u6559\u7A0B-\u68A6\u5B66\u8C37\u535A\u5BA2\u793E\u533AAPP\u79FB\u52A8\u7AEF\u5F00\u53D1",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 299,
    priceDiscount: 199.9,
    studyTotal: 3999
  },
  {
    id: 10,
    mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLBdGM96Wcfsn2QlzFiafnHDemtCOy4m6U4yicNvXMg8YfVYzf4ZMxXMPZqq24AibBQt20/600",
    totalTime: "12:09:18",
    title: "Spring Security\u6559\u7A0BSSO\u5355\u70B9\u767B\u5F55OAuth2\u6743\u9650\u7BA1\u7406JWT\u5FAE\u670D\u52A1\u8BA4\u8BC1",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 199,
    priceDiscount: 99.9,
    studyTotal: 2888
  },
  {
    id: 11,
    mainImage: "/static/images/banner1.jpg",
    totalTime: "12:09:18",
    title: "uni-app\u4ECE\u5165\u95E8\u5230\u9879\u76EE\u5B9E\u6218\u6559\u7A0B-\u68A6\u5B66\u8C37\u535A\u5BA2\u793E\u533AAPP\u79FB\u52A8\u7AEF\u5F00\u53D1",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 699,
    priceDiscount: 599.9,
    studyTotal: 3999
  },
  {
    id: 12,
    mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLAWb3qFGBhykjmcTvz9CWmwib2Qj7c3Vxjia4y5fgSoNdrMYIdH11Dl1OCraibA7u0mts/600",
    totalTime: "00:59:08",
    title: "SpringBoot\u9879\u76EE\u5B9E\u6218\u6559\u7A0BSpringCloud OAuth2 Vue\u5206\u5E03\u5F0F\u5FAE\u670D\u52A1\u67B6\u6784",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 99,
    priceDiscount: 89.9,
    studyTotal: 999
  },
  {
    id: 13,
    mainImage: "http://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLBdGM96Wcfsn2QlzFiafnHDemtCOy4m6U4yicNvXMg8YfVYzf4ZMxXMPZqq24AibBQt20/600",
    totalTime: "12:09:18",
    title: "Spring Security\u6559\u7A0BSSO\u5355\u70B9\u767B\u5F55OAuth2\u6743\u9650\u7BA1\u7406JWT\u5FAE\u670D\u52A1\u8BA4\u8BC1",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 199,
    priceDiscount: 99.9,
    studyTotal: 2888
  },
  {
    id: 16,
    mainImage: "/static/images/banner3.jpg",
    totalTime: "12:09:18",
    title: "uni-app\u4ECE\u5165\u95E8\u5230\u9879\u76EE\u5B9E\u6218\u6559\u7A0B-\u68A6\u5B66\u8C37\u535A\u5BA2\u793E\u533AAPP\u79FB\u52A8\u7AEF\u5F00\u53D1",
    nickName: "\u68A6\u8001\u5E08",
    isFree: 0,
    priceOriginal: 199,
    priceDiscount: 119.9,
    studyTotal: 3999
  }
];
exports.courseData = courseData;
