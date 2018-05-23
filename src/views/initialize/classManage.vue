<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span v-if="this.role == 2">
                <el-select disabled clearable style="width: 200px" class="filter-item" v-model="searchList.academeId" placeholder="全部学院">
                    <el-option v-for="item in academys" :key="item.key" :label="item.key" :value="item.val">
                    </el-option>
                </el-select>
            </span>
            <span v-else>
                <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.academeId" placeholder="全部学院">
                    <el-option v-for="item in academys" :key="item.key" :label="item.key" :value="item.val">
                    </el-option>
                </el-select>
            </span>

            <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.majorId" placeholder="全部专业">
                <el-option v-for="item in majors" :key="item.key" :label="item.key" :value="item.val" v-if="searchList.academeId == item.acaid">
                </el-option>
            </el-select>

            <el-button  class="filter-item" type="primary"  icon="search" @click="getClassMeaasges">搜索</el-button>

        </div>
        <el-table  :data="classMeaasge" v-loading="listLoading" element-loading-text="正在努力加载中......" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号" width="80px">
                <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="毕业年级" min-width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.year}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="院系" width="180">
                <template slot-scope="scope">
                    <span>{{academyFilter(scope.row.academeId)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="专业" width="180">
                <template slot-scope="scope">
                    <span>{{majorFilter(scope.row.majorId)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="行政班" min-width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.className}}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="状态" width="90">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isDeleted | statusTypeFilter">{{scope.row.isDeleted | statusFilter}}</el-tag>
                </template>
            </el-table-column>

        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchList.page"
                            :page-size="searchList.size" layout="total,prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { getClassMessage, getOperationList } from '../../newapi/initizlize'
    import { timestamp2normal } from '../../utils/index'
    import { getAcademys, getMajors, getClasses} from '../../filters/contentfilters'
    export default {
        name:'user',
        data() {
            return {
                classMeaasge:[],
                listLoading: true,
                total: null,
                majors:[],
                academys:[],
                classes:[],
                searchList: {
                    aid: null,
                    majorId : null,
                    academeId: null,
                    page: 1,
                    size: 10,
                },
                tableData:[],
                nowYear:{
                    year:''
                },
                role:''
            }
        },

        filters: {
            statusFilter(status){
                return status == 0 ? '正常' : status == 1 ? '已删除' : '错误'
            },
            statusTypeFilter(status){
                return status == 0 ? 'success' : status == 1 ? 'danger' : 'danger'
            },
            timeFilter(timestamp){
                return timestamp2normal(timestamp)
            }
        },
        methods: {
            getClassMeaasges(){
                this.searchList.aid = this.aid;
                this.listLoading = true;
                if(this.role == 2){
                    this.searchList.academeId = this.academeIdOfStore;
                }
                return new Promise(resolve=> {
                   getClassMessage(this.searchList).then((res)=> {
                        if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                                this.classMeaasge = res.data.data;
                                // // console.log(this.classMeaasge[0].)
                                this.classMeaasge.forEach(element => {
                                    element.year = this.nowYear.year
                                });
                                if(this.searchList.page==1){
                                    this.total = parseInt(res.data.message);
                                }
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
                                // // console.log(this.tableData.length)
                                this.nowYear.year = this.tableData[this.tableData.length - 1].graduateYear
                                // // console.log(this.nowYear.year)
                            }
                        }
                    })
                    resolve();
                })
            },
            handleSizeChange(){
                this.getClassMeaasges()
            },
            handleCurrentChange(){
                this.getClassMeaasges()
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
            this.role = this.roles[0];
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
            function setClasses () {
                return new Promise((resolve,reject) => {
                   getClasses(classes => {
                        resolve(classes)
                    })
                })
            };
            setAcademys().then(academys => {
                this.academys = academys;
                return setMajors();
            }).then(majors => {
                this.majors = majors;
                return setClasses();
            }).then(classes => {
                this.classes = classes;
                this.getOperationLists();
                this.getClassMeaasges();
            })
        },
        computed: {
            ...mapGetters([
                'aid',
                'init',
                'roles',
                'academeIdOfStore',
            ])
        },
    }
</script>
<style scoped>

</style>


