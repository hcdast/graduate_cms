<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">

            <!-- <el-select clearable style="width: 200px" class="filter-item" v-model="searchList.currentStatus" placeholder="订单状态">
                <el-option v-for="item in orderStatus" :key="item.key" :label="item.key" :value="item.val">
                </el-option>
            </el-select> -->

            <el-select clearable style="width: 200px" v-model="searchList.academeId" class="filter-item"  placeholder="全部学院" >
                <el-option v-for="item in academys" :key="item.key" :label="item.key" :value="item.val">
                </el-option>
            </el-select>

            <el-input @keyup.enter.native="getAcademeAdmins" style="width: 200px;" class="filter-item" placeholder="搜索管理员名称" v-model="searchList.academeAdminName">
            </el-input>

            <el-button style="width:100px" class="filter-item" type="primary" icon="search"
                       @click="getAcademeAdmins">搜索
            </el-button>

            <el-button class="filter-item" type="primary"  icon="plus" @click="handleCreate()" >新增学院管理员</el-button>

        </div>

        <el-dialog title="新增学院管理员" v-model="addFormVisible" size="tiny">
            <el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px" label-position="top">
                <el-form-item label="管理员工号" label-width="100px" prop="account">
                    <el-input v-model="addForm.account"></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="100px" prop="realName">
                    <el-input v-model="addForm.realName"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" label-width="100px" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="100px" prop="phone">
                    <el-input v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="所属单位" label-width="100px" prop="academeId" required>
                    <el-select v-model="addForm.academeId" placeholder="请选择学院">
                        <el-option v-for="item in academys" :key="item.key" :label="item.key" :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作人" label-width="100px">
                    <el-input v-model="addForm.createdMen" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('addForm')">确认新增</el-button>
            </div>

        </el-dialog>

        <el-table  :data="academy" element-loading-text="正在努力加载中......" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号" width="80px">
                <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="登录账号" min-width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.account}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="姓名" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.realName}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="手机号" min-width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="最后登录时间" width="230">

                <template slot-scope="scope">
                    <span>{{scope.row.gmtModified | timeFilter}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="类型" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.authority | authorityFilter}}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="所属单位" width="120">
                <template slot-scope="scope">
                    <span>{{academyFilter(scope.row.academeId)}}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="状态" width="90">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isDeleted | statusTypeFilter">{{scope.row.isDeleted | statusFilter}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isDeleted == 1 " size="small" type="success" @click="handleDeblocking(scope.$index,scope.row)">启用
                    </el-button>
                    <el-button v-if="scope.row.isDeleted == 0 " size="small" type="danger" @click="handleBlocking(scope.$index,scope.row)">停用
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchList.page"
                            :page-size="searchList.size" layout="total,prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 前往初始化弹框 -->
        <el-dialog
            title="初始化通知"
            :visible.sync="initializeVisible"
            size="tiny"
            :show-close="false"
            :close-on-click-modal="false">
            <span>院系及班级信息尚未初始化，无法进行管理</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleInitialize">前往初始化信息</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { getAcademeAdmin, getAcademeName, createdAdmin, updateAdmin } from '../../newapi/community'
    import { timestamp2normal } from '../../utils/index'
    import { getAcademys } from '../../filters/contentfilters'
    import { isvalidPhone } from '../../utils/validate'

    //定义一个全局的变量，谁用谁知道
    var validPhone =(rule, value,callback)=>{
        if (!value){
            callback(new Error('请输入电话号码'))
        }else  if (!isvalidPhone(value)){
            callback(new Error('请输入正确的11位手机号码'))
        }else {
            callback()
        }
    }
    export default {
        name:'academy',
        data() {
            return {
                listLoading: true,
                total: null,
                editFormVisible: false,
                addFormVisible : false,
                initializeVisible: false,
                academyName:'',
                academys:[],
                academy:[],
                addForm : {
                    aid : '',
                    account:'',
                    password : '',
                    realName : '',
                    academeId:'',
                    phone : '',
                    createdMen:'',
                    authority: 2,
                },
                rules:{
                    account: [
                        {required: true, message: '请输入管理员公号', trigger: 'blur'},
                        { min: 1, message: '长度至少1个字符', trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 1, message: '长度至少1个字符', trigger: 'blur'}
                    ],
                    realName: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        { min:2, max:6, message: '长度在2到6个字符之间', trigger: 'blur'}
                    ],
                    academeId: [
                        {required: true, message: '请选择所属单位'},
                    ],
                    phone: [
                        {required: true, message: '请输入正确格式的11位手机号', validator: validPhone},//这里需要用到全局变量
                    ],
                },
                searchList: {
                    aid: '',
                    id:'',
                    account:'',
                    realName: '',
                    academeId:'',
                    phone: '',
                    size : 10,
                    page : 1,
                    isDeleted : '',
                    academeAdminName:''
                },
                param : {
                    aid : '',
                },
                deblockForm: {
                    id:'',
                    isDeleted:''
                },
            }
        },

        filters: {
            statusFilter(status){
                return status == 0 ? '正常' : status == 1 ? '已停用' : '未知'
            },
            statusTypeFilter(status){
                return status == 0 ? 'success' : status == 1 ? 'danger' : 'danger'
            },
            timeFilter(timestamp){
                return timestamp2normal(timestamp)
            },
            authorityFilter(status){
                return status == 1 ? '教务管理员' : status == 2 ? '学院管理员' : status == 3 ? '班级管理员' : '未知'
            },
        },
        methods: {
            handleCreate(){
                this.initform ();// //每次都初始化
                this.addFormVisible = true
                this.addForm.createdMen = this.realName
            },
            initform(){
                this.addForm = {
                    account:'',
                    password : '',
                    realName : '',
                    academeId:'',
                    phone : '',
                    createdMen:'',
                    authority: '2',
                }
            },
            handleSubmit(formName){
                console.log(this.addForm)
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        this.addFormVisible = false;
                        return new Promise( resolve => {
                            createdAdmin(this.addForm).then( (res) => {
                                if(res.status!= 200){
                                    this.$message.error('请求失败，网络原因请重试！');
                                }else {
                                    if(!res.data||res.data.code !=0){
                                        this.$message({
                                            message: res.data.message,
                                            type: 'error'
                                        });
                                    }else{
                                        this.$message({
                                            message: res.data.message,
                                            type: 'success'
                                        });
                                        this.getAcademeAdmins();
                                    }
                                }
                            })
                            resolve()
                        })
                    } else {
                        this.$notify ( {
                                    title : '失败',
                                    message : `表单验证失败请检查`,
                                    type : 'error'
                                } );
                    }
                })

            },
            handleInitialize(){
                this.initializeVisible = false;
                this.$router.push('/initialize/initialize');
            },
            // 获取表格数据
            getAcademeAdmins(){
                this.searchList.aid = this.aid;
                this.listLoading = true;
                if(this.init == 1){
                    this.initializeVisible = false;
                    return new Promise(resolve=> {
                    getAcademeAdmin(this.searchList).then((res)=> {
                        if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                                this.academy = res.data.data;
                                if(this.searchList.page==1){
                                    this.total = parseInt(res.data.message);
                                }
                                this.listLoading = false;
                            }
                        }
                    })
                    resolve();
                })
                }else {
                    this.initializeVisible = true;
                }

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
            handleSizeChange(){
                this.getAcademeAdmins()
            },
            handleCurrentChange(){
                this.getAcademeAdmins()
            },
            // 启用
            handleDeblocking(index,row){
                this.deblockForm.id = row.id;
                this.deblockForm.isDeleted = 0;
                return new Promise( resolve => {
                    updateAdmin(this.deblockForm).then( (res) => {
                        if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                               this.$message({
                                   message:res.data.message,
                                   type:'success'
                               })
                               this.getAcademeAdmins()
                            }
                        }
                    })
                    resolve()
                })
            },
            // 停用
            handleBlocking(index,row){
                // this.deblockForm.aid = this.aid;
                this.deblockForm.id = row.id;
                this.deblockForm.isDeleted = 1;
                return new Promise( resolve => {
                    updateAdmin(this.deblockForm).then( (res) => {
                        if(res.status!= 200){
                            this.$message.error('请求失败，网络原因请重试！');
                        }else {
                            if(!res.data||res.data.code !=0){
                                this.$message.error('请求失败，服务器内部错误请重试或者联系开发者！');
                            }else{
                               this.$message({
                                   message:res.data.message,
                                   type:'success'
                               })
                               this.getAcademeAdmins()
                            }
                        }
                    })
                    resolve()
                })

            }
        },
        created() {
            new Promise(resolve => {
                getAcademys(academys => {
                    resolve(academys)
                })
            }).then((academys)=>{
                this.academys = academys
                this.getAcademeAdmins()
            })

        },
        computed: {
            ...mapGetters([
                'aid',
                'init',
                'realName'
            ]),

        },
    }
</script>
<style scoped>

</style>


