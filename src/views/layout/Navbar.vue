<template>
    <el-menu class="navbar" mode="horizontal">
        <div class="part1">
        <!-- 控件侧边栏的收缩 -->
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <levelbar></levelbar>


        <el-dropdown class="avatar-container" trigger="click">
            <span class="welcome">欢迎您！{{realName}} {{roles | rolesFilter}}</span>
            <el-dropdown class="down">
                <el-button class="button">
                    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link class='inlineBlock' to="/">
                        <el-dropdown-item class="item">
                            首页
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided class="item">
                        <span @click="logout" style="display:block;">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-dropdown>
        </div>
        <div class="part2">
        <tabs-view></tabs-view>
        </div>
    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Levelbar from './Levelbar'
    import TabsView from './TabsView'
    import Hamburger from 'components/Hamburger'
    import Screenfull from 'components/Screenfull'
    import ErrorLog from 'components/ErrLog'
    import errLogStore from 'store/errLog'
    export default {
        components : {
            Levelbar,
            TabsView,
            Hamburger,
        },
        data() {
            return {
                log : errLogStore.state.errLog
            }
        },
        filters: {
            rolesFilter(roles){
                return roles == 1 ? '教务管理员' : roles == 2 ? '学院管理员' : roles == 3 ? '班级管理员' : '未知'
            }
        },
        computed : {
            ...mapGetters ( [
                'sidebar',
                'account',
                'realName',
                'schoolId',
                'roles'
            ] )
        },
        methods : {
            toggleSideBar() {
                this.$store.dispatch ( 'ToggleSideBar' )
            },
            logout() {
                this.$store.dispatch ( 'LogOut' ).then ( () => {
                    location.reload ()// 为了重新实例化vue-router对象 避免bug
                } )
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    $blue:#0A56C4;
    @mixin colorBtn($color) {
    &:hover {
        color: $color;
        &:before,
        &:after {
        color: white;
        }
    }
    }

    .item{
        @include colorBtn($blue)
        }
    .navbar {
        // height: 50px;
        // line-height: 50px;
        border-radius: 0px !important;
        .welcome{
            font-size: 18px;
            margin-right: 32px;
            font-weight: bold;
        }
        .down{
            .button{
            border:1px solid #0A56C4;
            color: #0A56C4;
            }
        }
        .part1{
            border-bottom:1px solid rgba(0, 0, 0, 0.1);
            height: 50px;
            line-height:50px;
        }

        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
        .part2{
            height: 32px;
            line-height: 30px;
        }
    }
</style>



