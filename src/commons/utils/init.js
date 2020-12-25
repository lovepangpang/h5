// 混入的事件
const jsApiList = [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareQZone',
    'onMenuShareWeibo',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard'
];

export default {
    created() {
        // 企业微信 js-sdk
        // wx.config({
        //     beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     appId: 'wx3bf46cefa4702198', // 必填，企业微信的corpID
        //     // timestamp: Math.round(new Date().getTime() / 1000) + '', // 必填，生成签名的时间戳
        //     timestamp: '1608865970', // 必填，生成签名的时间戳
        //     nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
        //     signature: '320bfb556e61981ebecc59131fcf011ba08fd721',// 必填，签名，见 附录-JS-SDK使用权限签名算法
        //     jsApiList: jsApiList // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        // });

        // 页面初始化html字体大小设置
        this.filterRem();
        window.onresize = this.filterRem;

        // 各个请求前缀地址
        window.httpBase = {
            sta: 'http://192.168.124.247:8080'
        }
        if (process.env.NODE_ENV === 'development') {
            window.httpBase.sta = 'http://192.168.124.247:8080';
        } else if (process.env.NODE_ENV === 'production') {
        } else if (process.env.NODE_ENV === 'uat') {
            window.httpBase.sta = 'http://10.3.186.102/web/MktStaRestWECHAT';
        } else if (process.env.NODE_ENV === 'test') {
        }
    },
    methods: {
        filterRem () {
            let deviceWidth = document.documentElement.clientWidth;
            if (deviceWidth > 750) deviceWidth = 750;
            document.documentElement.style.fontSize = deviceWidth / 750 * 100 + 'px';
        }
    }
}