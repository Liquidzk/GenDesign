
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/mine/login/login","pages/home/index","pages/mine/area/search","pages/mine/area/access","pages/hbuemap/index","pages/healthy/index","pages/home/data/data","pages/mine/changepwd","pages/mine/login/register","pages/mine/login/agreement","pages/mine/login/forget","pages/mine/area/index","pages/home/myqrcode/qrcode","pages/home/yaoyan/yaoyan","pages/home/message/message","pages/mine/info","pages/mine/jubao","pages/mine/pass","pages/mine/tpass/psqrcode","pages/mine/tpass/phealthy","pages/home/healthynews/healthynews","pages/home/detail","pages/home/message/messagedetail","pages/home/news/news","pages/mine/index"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"湖经抗疫防控","navigationBarBackgroundColor":"#007AFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#7a7e83","selectedColor":"#0faeff","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/index","text":"首页","iconPath":"static/icons/bar/home.png","selectedIconPath":"static/icons/bar/homeHL.png"},{"pagePath":"pages/hbuemap/index","text":"场馆地图","iconPath":"static/icons/bar/map.png","selectedIconPath":"static/icons/bar/mapHL.png"},{"pagePath":"pages/healthy/index","text":"员工打卡","iconPath":"static/icons/bar/healthy.png","selectedIconPath":"static/icons/bar/healthyHL.png"},{"pagePath":"pages/mine/index","text":"我的","iconPath":"static/icons/bar/mine.png","selectedIconPath":"static/icons/bar/mineHL.png"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"kangyiqing","compilerVersion":"3.96","entryPagePath":"pages/mine/jubao","entryPageQuery":"","realEntryPagePath":"pages/mine/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/mine/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"名字暂定（原疫育码）"}},{"path":"/pages/mine/area/search","meta":{},"window":{"navigationBarTitleText":"用户查找"}},{"path":"/pages/mine/area/access","meta":{},"window":{"navigationBarTitleText":"行踪记录"}},{"path":"/pages/hbuemap/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"场馆地图"}},{"path":"/pages/healthy/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"员工打卡"}},{"path":"/pages/home/data/data","meta":{},"window":{"navigationBarTitleText":"足迹"}},{"path":"/pages/mine/changepwd","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/mine/login/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/mine/login/agreement","meta":{},"window":{"navigationBarTitleText":"协议"}},{"path":"/pages/mine/login/forget","meta":{},"window":{"navigationBarTitleText":"忘记密码"}},{"path":"/pages/mine/area/index","meta":{},"window":{"navigationBarTitleText":"区域管理"}},{"path":"/pages/home/myqrcode/qrcode","meta":{},"window":{"navigationBarTitleText":"二维码"}},{"path":"/pages/home/yaoyan/yaoyan","meta":{},"window":{"navigationBarTitleText":"谣言"}},{"path":"/pages/home/message/message","meta":{},"window":{"navigationBarTitleText":"通知"}},{"path":"/pages/mine/info","meta":{},"window":{"navigationBarTitleText":"个人信息"}},{"path":"/pages/mine/jubao","meta":{},"window":{"navigationBarTitleText":"人脸录入"}},{"path":"/pages/mine/pass","meta":{},"window":{"navigationBarTitleText":"申请临时通行证"}},{"path":"/pages/mine/tpass/psqrcode","meta":{},"window":{"navigationBarTitleText":"通行证二维码"}},{"path":"/pages/mine/tpass/phealthy","meta":{},"window":{"navigationBarTitleText":"填写健康信息"}},{"path":"/pages/home/healthynews/healthynews","meta":{},"window":{"navigationBarTitleText":"抗疫贴士","enablePullDownRefresh":true}},{"path":"/pages/home/detail","meta":{},"window":{"navigationBarTitleText":"详情","titleNView":{"type":"transparent"}}},{"path":"/pages/home/message/messagedetail","meta":{},"window":{"navigationBarTitleText":"通知详情","titleNView":{"type":"transparent"}}},{"path":"/pages/home/news/news","meta":{},"window":{"navigationBarTitleText":"新闻","enablePullDownRefresh":true}},{"path":"/pages/mine/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});