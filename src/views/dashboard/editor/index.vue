<template>
    <div class="dashboard-editor-container">
        <!-- <el-row class="btn-group">
            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn blue-btn" to="/community/office">教务管理员</router-link>
            </el-col>

            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn blue-btn" to="/community/academy">学院管理员</router-link>
            </el-col>

            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn blue-btn" to="/community/class">班级管理员</router-link>
            </el-col>

            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn blue-btn" to="/studentImformation/message">学籍信息维护</router-link>
            </el-col>

            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn blue-btn" to="/initialize/initialize">信息初始化</router-link>
            </el-col>

            <el-col :span="4" class='text-center'>
                <router-link class="pan-btn blue-btn" to="/initialize/academyManage">院系信息管理</router-link>
            </el-col>

        </el-row> -->
        <!-- <div style="margin-bottom:120px;width:100%;height:1px;background-color: rgba(0, 0, 0, 0.1)"></div> -->

        <el-row class="content" style="margin-bottom:80px;">
            <el-col>
                <div class="name">欢迎使用安徽大学毕业生信息收集系统</div>
                <img src="../../../assets/login.svg" alt="" class="schoolLogo" style="width:70%;">
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    // import pieChart from './pieChart'
    // import barChart from './barChart'
    // import lineChart from './lineChart'
    export default {
        name : 'dashboard-admin',
        // components : { pieChart, lineChart, barChart },
        data() {
            return {
                // statisticsData : {
                //     article_count : 1024,
                //     pageviews_count : 1024
                // }
            }
        },
        computed : {
            ...mapGetters ( [
                'aid',
                'schoolId'
            ] )
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dashboard-editor-container {
        margin: 30px;
        .btn-group {
            margin-bottom: 30px;
        }
        .content {
            text-align: center;
            .name {
                font-size: 40px;
                text-align: center;
                margin-bottom: 130px;
            }
        }
        .box-card-header {
            position: relative;
            height: 160px;
        }
        .panThumb {
            z-index: 100;
            height: 150px;
            width: 150px;
            position: absolute;
            left: 0px;
            right: 0px;
            margin: auto;
        }
        .display_name {
            font-size: 30px;
            display: block;
        }
        .info-item {
            display: inline-block;
            margin-top: 10px;
            font-size: 14px;
            &:last-of-type {
                margin-left: 15px;

            }
        }
    }
</style>
