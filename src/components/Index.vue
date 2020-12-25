<template>
    <div>
        <van-notice-bar
            left-icon="volume-o"
            text="啦啦啦，在代码阅读过程中,这是测试的代码，代码质量的唯一标准。"
        />
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
        </van-swipe>
        <div>
            <van-button type="primary">主要按钮</van-button>
            <van-button type="info">信息按钮</van-button>
        </div>
        <div>
            <van-button type="warning">警告按钮</van-button>
            <van-button type="danger">危险按钮</van-button>
        </div>
        <van-empty description="数据" />
        <div v-if="dataArr && dataArr.length > 0">
            <van-card
                v-for="(item, index) in dataArr"
                :key="index"
                num="1"
                desc="描述信息"
                :thumb="item.spuCoverPicUrl"
                @click="clickEvent(item)"
            >
                <template #title>
                    <div v-html="item.spuName"></div>
                </template>
                <template #price>
                    <div>{{'价格 ' + item.minPrice + ' 元'}}</div>
                </template>
            </van-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data () {
            return {
                 dataArr: []
            };
        },
        mounted () {
            this.getDate();
            if (this.getQueryVariable('token')) {
                this.$toast('token ' + this.getQueryVariable('token'));
                console.log('有token信息！', this.getQueryVariable('token'), window.sessionStorage.getItem('token'));
            } else {
                // window.sessionStorage.setItem("token", this.getQueryVariable('token'));
                window.location.href = 'http://390d74a4.nat123.fun/api/qy-wechat/auth/redirect-url-current?redirect_url_current=' + window.location.href;
            }
        },
        methods: {
            // 获取url参数
            getQueryVariable (variable) {
                var query = window.location.search.substring(1);
                var vars = query.split('&');
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=');
                    if (pair[0] === variable) { return decodeURIComponent(pair[1]); }
                }
                return '';
            },
            getDate () {
                this.$axios({
                    url: window.httpBase.sta + '/gcc/spu/fuzzySearch',
                    method: 'post',
                    data: {
                        "pageNo":1,
                        "pageSize":10,
                        "searchMsg":"商品",
                        "sorts":[
                            {
                                "sortColumn":"onlineTime",
                                "sort":"asc"
                            }
                        ]
                    }
                }).then((res) => {
                    if (res.retCode == '1') {
                        console.log(res);
                        this.dataArr = res.data.items;
                    }
                });
            },
            clickEvent (item) {
                console.log('点击', item);
                // wx.onMenuShareAppMessage({
                //     title: '这里是标题', // 分享标题
                //     desc: '这里是描述', // 分享描述
                //     link: '', // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
                //     imgUrl: '', // 分享图标
                //     success: function () {
                //         // 用户确认分享后执行的回调函数
                //     },
                //     cancel: function () {
                //         // 用户取消分享后执行的回调函数
                //     }
                // });
            }
        }
    };
</script>

<style lang="scss" >
    .my-swipe {
        height: 150px;
        margin-bottom: 15px;
        .van-swipe-item {
            color: #fff;
            font-size: 20px;
            line-height: 150px;
            text-align: center;
            background-color: #39a9ed;
        }
    }
</style>
