
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#6E8B3D","navigationBar":{"backgroundColor":"#A2CD5A","titleColor":"#ffffff"}},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"uni-online-education","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.3.13","entryPagePath":"pages/tab-index/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#8a8a8a","selectedColor":"#A2CD5A","borderStyle":"#6E8B3D","blurEffect":"none","fontSize":"12px","iconWidth":"24px","spacing":"3px","height":"48px","backgroundColor":"#FFFFFF","list":[{"text":"首页","pagePath":"pages/tab-index/index","iconPath":"/static/tab/index.png","selectedIconPath":"/static/tab/index-active.png"},{"text":"分类","pagePath":"pages/tab-category/category","iconPath":"/static/tab/category.png","selectedIconPath":"/static/tab/category-active.png"},{"text":"阅读","pagePath":"pages/tab-article/article","iconPath":"/static/tab/article.png","selectedIconPath":"/static/tab/article-active.png"},{"text":"问答","pagePath":"pages/tab-question/question","iconPath":"/static/tab/question.png","selectedIconPath":"/static/tab/question-active.png"},{"text":"我的","pagePath":"pages/tab-my/my","iconPath":"/static/tab/my.png","selectedIconPath":"/static/tab/my-active.png"}],"selectedIndex":0,"shown":true},"locales":{}};
  const __uniRoutes = [{"path":"pages/tab-index/index","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"scrollIndicator":"none","navigationBar":{"type":"transparent","buttons":[{"fontSrc":"/static/icon/iconfont.ttf","text":"","fontSize":"26px","float":"right","background":"rgba(0,0,0,0)","color":"#ffffff"}],"searchInput":{"autoFocus":false,"align":"center","color":"#000","backgroundColor":"rgba(255,255,255,0.5)","borderRadius":"30rpx","placeholder":"请输入搜索内容","placeholderColor":"rgba(255,255,255,0.8)","disabled":true},"coverage":"132px"}}},{"path":"pages/tab-category/category","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"scrollIndicator":"none","bounce":"none","navigationBar":{"titleText":"分类","buttons":[{"fontSrc":"/static/icon/iconfont.ttf","text":"","fontSize":"24px","float":"right","background":"rgba(0,0,0,0)"}]}}},{"path":"pages/tab-article/article","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"bounce":false,"scrollIndicator":"none","navigationBar":{"titleText":"阅读","searchInput":{"autoFocus":false,"align":"center","color":"#000","backgroundColor":"rgba(255,255,255,0.5)","borderRadius":"30rpx","placeholder":"请输入搜索内容","placeholderColor":"rgba(255,255,255,0.8)","disabled":true}}}},{"path":"pages/tab-question/question","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":3,"bounce":false,"scrollIndicator":"none","navigationBar":{"titleText":"问答","searchInput":{"autoFocus":false,"align":"center","color":"#000","backgroundColor":"rgba(255,255,255,0.5)","borderRadius":"30rpx","placeholder":"请输入搜索内容","placeholderColor":"rgba(255,255,255,0.8)","disabled":true}}}},{"path":"pages/tab-my/my","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":4,"navigationBar":{"titleText":"我的"}}},{"path":"pages/public/public","meta":{"navigationBar":{"titleText":"扫描结果"}}},{"path":"pages/search/search","meta":{"scrollIndicator":"none","navigationBar":{"titleText":"搜索","searchInput":{"autoFocus":false,"align":"center","color":"#000","backgroundColor":"rgba(255,255,255,0.5)","borderRadius":"30rpx","placeholder":"请输入搜索内容","placeholderColor":"rgba(255,255,255,0.8)","disabled":false},"buttons":[{"float":"right","text":"搜索","fontSize":"16px","color":"#fff"}]}}},{"path":"pages/course/course-details","meta":{"onReachBottomDistance":0,"scrollIndicator":"none","bounce":"none","navigationBar":{"type":"transparent","titleText":"课程详情","buttons":[{"type":"share","fontSize":"28px","float":"right","background":"rgba(0,0,0,0)","color":"#ffffff","text":""}],"coverage":"132px"}}},{"path":"pages/course/course-play","meta":{"backgroundColor":"#FFFFFF","titleNView":false,"subNVues":[{"id":"topVideo","path":"pages/course/subNVue/topVideo","style":{"position":"dock","dock":"top","width":"100%","height":"269px"}}],"navigationBar":{"titleText":"视频播放","style":"custom"}}},{"path":"pages/order/confirm-buy","meta":{"bounce":false,"navigationBar":{"titleText":"商品支付"}}},{"path":"pages/order/my-balance","meta":{"bounce":false,"navigationBar":{"titleText":"余额充值"}}},{"path":"pages/order/order-list","meta":{"bounce":false,"navigationBar":{"titleText":"我的订单"}}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  