<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.academeId"
                       placeholder="所属学院">
                <el-option v-for="item in academys" :key="item.key" :label="item.key" :value="item.val">
                </el-option>
            </el-select>
            <el-button  class="filter-item" type="primary"  icon="search" @click="getAcademyMessage">搜索</el-button>
        </div>

        <el-table :data="academyMessage" v-loading="listLoading" element-loading-text="正在努力加载中......" border fit
                  highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号" width="80px">
                <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="毕业年级" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.year}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="院系" min-width="250">
                <template slot-scope="scope">
                    <span>{{academyFilter(scope.row.academeId)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="专业" min-width="250">
                <template slot-scope="scope">
                    <span>{{majorFilter(scope.row.id)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间" width="230">

                <template slot-scope="scope">
                    <span>{{scope.row.gmtCreate | timeFilter}}</span>
                </template>
            </el-table-column>


            <!-- <el-table-column align="center" label="行政班" min-width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.type | roleTypeFilter}}</span>
                </template>
            </el-table-column> -->

            <el-table-column class-name="status-col" label="状态" width="90">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isDeleted | statusTypeFilter">{{scope.row.isDeleted | statusFilter}}</el-tag>
                </template>
            </el-table-column>
        </el-table>


        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="searchList.page"
                           :page-size="searchList.size" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { getAcademyMessage, getOperationList } from '../../newapi/initizlize'
    import { timestamp2normal } from '../../utils/index'
    import { getAcademys, getMajors, getClasses } from '../../filters/contentfilters'
    export default {
        data() {
            return {
                academyMessage:[],
                listLoading : true,
                total : null,
                selectTable : {},
                academys:[],
                majors:[],
                searchList : {
                    aid : null,
                    academeId : '',
                    size : 10,//获取条数
                    page : 1//显示页面
                },
                tableData:[],
                nowYear:{
                    year:''
                },
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
                    1 : '已删除',
                    0 : '正常'
                }
                return statusMap[ status ]
            },
            timeFilter( timestamp ){
                return timestamp2normal ( timestamp )
            },
        },
        methods : {
            handleDelete ( index, row ) {
                this.tableData.splice ( index, 1 );
                this.$message ( {
                    message : "操作成功！",
                    type : 'success'
                } );
            },
            getAcademyMessage(){
                this.searchList.aid = this.aid;
                this.listLoading = true;
                return new Promise(resolve=> {
                    getAcademyMessage(this.searchList).then((res)=> {
                        if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                                this.academyMessage = res.data.data;
                                for(var i = 0;i<this.academyMessage.length;i++){
                                    this.academyMessage[i].year = this.nowYear.year
                                }
                                if(this.searchList.page==1){
                                    this.total = parseInt(res.data.message);
                                }
                                this.loading = false;
                                this.listLoading = false;
                            }
                        }
                    })
                })
            },
            // 获取年份
            getOperationLists(){
                return new Promise(resolve => {
                    getOperationList(this.searchList).then((res) => {
                        if(res.status!= 200){
                                this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                                this.tableData = res.data.data;
                                // 获取一个当前初始化的年
                                // console.log(this.tableData.length)
                                this.nowYear.year = this.tableData[this.tableData.length - 1].graduateYear
                            }
                        }
                    })
                    resolve();
                })
            },
            handleSizeChange(){
                this.getAcademyMessage();
            },
            handleCurrentChange(){
                this.getAcademyMessage();
            },
            // 通过方法将id转为名称
            academyFilter(academeId){
                for(var i=0;i<this.academys.length;i++){
                    if(this.academys[i].val === academeId){
                        return this.academys[i].key
                    }
                }
                return
            },
            majorFilter(majorId){
                for(var i=0;i<this.majors.length;i++){
                    if(this.majors[i].val === majorId){
                        return this.majors[i].key
                    }
                }
                return
            },
        },
        created() {
            function setAcademys () {
                return new Promise((resolve,reject) => {
                    getAcademys(academys => {
                        resolve(academys)
                    })
                })
            };
            function setMajors () {
                return new Promise((resolve,reject) => {
                    getMajors(majors => {
                        resolve(majors)
                    })
                })
            };
            setAcademys().then(academys => {
                this.academys = academys;
                return setMajors();
            }).then(majors => {
                this.majors = majors;
                this.getOperationLists();
                this.getAcademyMessage();
            })
        },
        computed : {
            ...mapGetters ( [
                'aid',
                'init'
            ] ),
        },
    }
</script>
<style scoped>
</style>
