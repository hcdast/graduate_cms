<template>
    <div class="login-container">
        <div class="content">
            <div class="login-form">
                <el-form class="card-box" autoComplete="on" :model="loginForm" :rules="loginRules"
                         ref="loginForm"
                         label-position="left" style="text-align:center;">
                    <div style="text-align:center;margin-bottom:40px;">
                        <img src="../../assets/logo.svg" alt="logo" style="width:76px;height:76px;">
                    </div>
                    <h3 class="title">安徽大学毕业生信息收集系统</h3>

                    <el-form-item prop="username">
                    <!--<span class="svg-container svg-container_login">
                        <icon-svg icon-class="user"/>
                    </span>-->
                        <el-input name="username" type="text" v-model="loginForm.account" autoComplete="on"
                                  placeholder="工号"/>
                    </el-form-item>

                    <el-form-item prop="password">
                    <!--<span class="svg-container">
                        <icon-svg icon-class="password"/>
                    </span>-->
                        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin"
                                  v-model="loginForm.password" autoComplete="on" placeholder="密码"/>
                        <span class='show-pwd' @click='showPwd'>
                        <icon-svg icon-class="eye"/>
                    </span>
                    </el-form-item>

                    <el-button type="primary" style="width:80%;margin-bottom:30px;margin-top:40px;" :loading="loading"
                               @click.native.prevent="handleLogin">登录
                    </el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import { isvalidUsername } from '@/utils/validate'
    import loginimg from '../../assets/login.png'
    export default {
        name : 'login',
        data() {
            return {
                loginForm : {
                    account : '',
                    password : ''
                },
                loginRules : {
                    account : [ { required : true,  message: '请输入工号', trigger : 'blur' } ],
                    password : [ { required : true,  message: '请输入密码',  trigger : 'blur' } ]
                },
                pwdType : 'password',
                loading : false,
                showDialog : false,
                loginimg : loginimg
            }
        },
        methods : {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate ( valid => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch ( 'CheckUserLogin', this.loginForm ).then ( (response) => {
                            // console.log(response);
                            if(response.status!=200){
                                this.$message.error ( '请求失败，网络原因请重试！' );
                            }else {
                                if(response.data.data&&response.data.code==0){
                                    this.$router.push ( { path : '/' } )
                                }else{
                                    this.$message.error ( '用户名或密码错误！' );
                                }

                            }
                            this.loading = false
                        } ).catch ( () => {
                            this.loading = false
                        } )
                    } else {
                        // console.log ( 'error submit!!' )
                        return false
                    }
                } )
            },
        },
        created() {
        },
        destroyed() {
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    $white: #FFFFFF;
    $dark_blue: #0A56C4;
    $font_grey: #595959;
    html,body{
        height: 100%;
        width: 100%;
    }
    .login-container {
        @include relative;
        background-color: $bg;
        box-sizing: border-box;
        height: 100vh;
        padding-top: 180px;
        .content {
            width: 100%;
            height: auto;
        }

        // .logo-container {
        //     width: 64%;
        //     height: 584px;
        //     float: left;
        //     box-sizing: border-box;
        //     img {
        //         display: block;
        //         height: 100%;
        //         margin: 0 auto;
        //     }
        // }
        .login-form {
            width: 40%;
            margin: 0 auto;
            // float: right;
            box-sizing: border-box;
            .card-box{
                width: 70%;
                // float: left;
                margin: 0 auto;
                height: 584px;
                background-color: $white;
                padding: 58px;
                border-radius: 6px;
            }
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $font_grey;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 96%;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
            &_login {
                font-size: 20px;
            }
        }
        .title {
            font-size: 22px;
            color: $dark_gray;
            margin: 0px auto 80px auto;
            text-align: center;
            font-weight: bold;
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
            margin-top: 18px;
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
        }
        .el-button {
            background-color: $dark_blue;
            width: 80px;
            height: 48px;
            border-radius: 24px;
        }
    }
</style>
