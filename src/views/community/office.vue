<template>
    <div class="app-container calendar-list-container">

        <el-table  :data="supperAdmin" v-loading="listLoading" element-loading-text="正在努力加载中......" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="序号" width="70px">
                <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="登录账号" min-width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.account}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="姓名" min-width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.realName}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="手机号" width="160">
                <template slot-scope="scope">
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>


            <el-table-column align="center" label="最近登录时间" width="230">
                <template slot-scope="scope">
                    <span>{{scope.row.gmtModified | timeFilter}}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="类型" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.authority | authorityFilter }}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="所属单位" width="120">
                <template slot-scope="scope">
                    <span>教务处</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="状态" width="140">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isDeleted | statusTypeFilter">{{scope.row.isDeleted | statusFilter}}</el-tag>
                </template>
            </el-table-column>
        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchList.page"
                            :page-size="searchList.size" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { getSupperAdmin } from '../../newapi/community'
    import { timestamp2normal } from '../../utils/index'
    export default {
        data() {
            return {
                listLoading : true,
                total:null,
                addFormVisible : false,
                blockFormVisible : false,
                deblockVisible: false,
                supperAdmin:null,
                searchList : {
                    aid: '',
                    account:'',
                    realName: '',
                    phone: '',
                    size : 10,
                    page : 1,
                    isDeleted : '',
                },
                blockIndex: null,
                blockForm : {},
                deblockIndex: null,
                deblockForm: {},
            }
        },
        filters : {
            statusTypeFilter( status ) {
                const statusMap = {
                    0 : 'success',
                    1 : 'danger'
                }
                return statusMap[ status ]
            },
            statusFilter( status ) {
                const statusMap = {
                    0 : '正常',
                    1 : '封禁中'
                }
                return statusMap[ status ]
            },
            timeFilter(timestamp){
                return timestamp2normal(timestamp)
            },
            authorityFilter(status){
                return status == 1 ? '教务管理员' : status == 2 ? '学院管理员' : status == 3 ? '班级管理员' : '未知'
            }
        },
        methods : {
            getSupperAdmin(){
                this.loading = true;
                this.searchList.aid = this.aid;
                return new Promise( resolve => {
                    getSupperAdmin(this.searchList).then( (res) => {
                        if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                                let data = res.data.data;
                                this.supperAdmin = data;
                                this.listLoading = false;
                                this.loading = false;
                                this.total = data.length;
                            }
                        }
                    })
                    resolve()
                })

            },
            handleSizeChange(){
                this.getSupperAdmin();
            },
            handleCurrentChange(){
                this.getStudents ();
            },
            handleBlocking( index, row ){
                this.blockIndex = index;
                this.blockForm = row;
                this.blockFormVisible = true;
            },
        },
        created() {
            this.getSupperAdmin();
        },
        computed : {
            ...mapGetters ( [
                'aid',
            ] )
        },
    }
</script>
<style scoped>

</style>
