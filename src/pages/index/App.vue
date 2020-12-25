<template>
    <div class="content">
         <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <router-view :key="key" class="app-main-content" />
            </keep-alive>
        </transition>
        <van-tabbar route>
            <van-tabbar-item to="/index" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
            <van-tabbar-item to="/friends" icon="friends-o">朋友</van-tabbar-item>
            <van-tabbar-item to="/setting" icon="setting-o">设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data () {
        return {
            // active: 'home'
        };
    },
    computed: {
        cachedViews() {
            return this.$routeArr;
        },
        key() {
            return this.$route.path;
        }
    }
};
</script>  
<style lang="scss" >
    .content {
        padding-bottom: 60px;
    }
    .van-tabbar {
        max-width: 750px;
        left: 50%;
        transform: translate(-50%);
    }
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
